# LUMBRE · Catálogo de iluminación de autor

Catálogo digital interactivo de **LUMBRE**, estudio ficticio de iluminación de autor (demo de portafolio). Piezas en latón, lino, vidrio soplado y cerámica, fabricadas en pequeños lotes.

> ⚠️ Proyecto demo: todos los datos, precios y disponibilidad son ficticios. El formulario de contacto no envía a ningún backend.

---

## Stack

| Herramienta   | Versión | Uso                                         |
| ------------- | ------- | ------------------------------------------- |
| React         | 18.3.1  | UI (StrictMode activo)                      |
| Vite          | 6.x     | Dev server + build                          |
| Tailwind CSS  | 4.x     | Estilos (tokens en `src/styles/tokens.css`) |
| lucide-react  | —       | Iconos                                      |
| Vitest        | 3.x     | Tests unitarios (36 tests)                  |
| ESLint        | 9.x     | Lint (flat config + jsx-a11y + react-hooks) |
| Prettier      | —       | Formateo                                    |

## Cómo ejecutar

```bash
npm install          # instalar dependencias
npm run dev          # dev server → http://localhost:5173 (o 5174 si está ocupado)
npm run build        # build de producción → dist/
npm run preview      # servir el build
npm run test         # tests en watch mode
npm run test:run     # tests una sola vez
npm run lint         # eslint .
npm run format       # prettier --write .
```

## Estructura del proyecto

````
lumbre_catalogo/
├── index.html                  # HTML raíz (meta OG, favicon, fuentes Fraunces + Inter)
├── public/
│   ├── favicon.svg             # Favicon: cuadrado verde oscuro + círculo dorado
│   ├── og-image.jpg            # Placeholder (0 bytes, por reemplazar)
│   └── robots.txt              # Placeholder
└── src/
    ├── main.jsx                # createRoot + StrictMode
    ├── App.jsx                 # ContactProvider → CatalogExperience
    ├── styles/                 # index, tokens, utilities, fonts (Tailwind 4)
    ├── data/                   # catalog.js, categories.js, business.js, sort-options.js
    ├── lib/                    # filters.js (+ filters.test.js), format, hash, normalize
    ├── hooks/                  # useCatalog, useHashRoute, useDialog, useMediaQuery, useScrollState
    ├── context/                # ContactContext.jsx (componente) + useContact.js (hook)
    └── components/
        ├── catalog/            # Hero, ControlBar, SearchBar, CategoryTabs, SortSelect,
        │                       #   CatalogGrid, CatalogCard, CardTags, ResultsBar, LoadMore, EmptyState
        ├── product/            # QuickViewDialog, Gallery, GalleryThumbs, SpecList, TagList, AvailabilityBadge
        ├── contact/            # ContactSection, ContactDialog, ContactForm, ContactContextChip
        ├── layout/             # Header, HeaderNav, Footer, Container, SkipLink
        └── ui/                 # Dialog, Button, IconButton, Chip, Field, Hairline, Eyebrow,
                                #   VisuallyHidden, Wordmark
````

## Funcionalidades

- **Búsqueda** con normalización (acentos y mayúsculas).
- **Filtros por categoría** (tabs + enlaces del footer vía `data-cat`).
- **Ordenación** (relevancia, precio asc/desc, novedades) — opciones en `src/data/sort-options.js`.
- **Paginación incremental** (Load more) sobre los resultados filtrados.
- **Quick view** por pieza con galería navegable por teclado (flechas) y specs/etiquetas.
- **Deep link**: `#/pieza/:slug` abre el quick view directamente (hash routing con `useHashRoute`).
- **Contacto**: formulario simulado con contexto de pieza (`ContactContextChip`), abrible desde el header, las cards o la sección de contacto.
- **Accesibilidad**: skip link, `<dialog>` nativo con foco gestionado, `motion-reduce`, roles y etiquetas ARIA, navegación por teclado en galerías.

## Arquitectura de los modales (patrón importante)

`src/components/ui/Dialog.jsx` es un wrapper de `<dialog>` nativo que expone un **ref imperativo**:

````jsx
const api = useRef(null)
<Dialog ref={api}>...</Dialog>

api.current.open()               // abre con showModal()
api.current.close()              // cierra
api.current.element              // el <dialog> real del DOM
````

Reglas de uso (fruto de un bug real, ver abajo):

1. **No** envolver la ref con `useDialog()` propio y pasarla a `<Dialog ref={...}>` a la vez — el `useImperativeHandle` del Dialog sobreescribe `ref.current`.
2. Para `addEventListener` o leer `dialog.open`, usar siempre `api.current.element`.
3. `useDialog()` (el hook) está pensado para `<dialog>` "a mano" (sin el wrapper), donde la ref va directa al elemento.

## Registro de depuración · pantalla blanca

Síntoma: la web renderizaba fondo pero **sin contenido** (pantalla blanca) porque React crasheaba durante el mount y desmontaba el árbol.

**Diagnóstico paso a paso:**

1. Se añadió un script temporal en `index.html` (listeners `error`/`unhandledrejection`) y se verificó en Chrome headless (`--headless=new --dump-dom`).
2. Error capturado: `Uncaught TypeError: dialog.addEventListener is not a function`.
3. Se reprodujo `<App />` completo en jsdom bajo `act()` con un test temporal (`src/_smoke-render.test.jsx`, luego eliminado) para confirmar el stack del error.
4. **Causa raíz** (en `src/components/contact/ContactDialog.jsx`):
   - `ContactDialog` creaba su propio `useDialog()` y pasaba esa misma ref a `<Dialog ref={dialogRef}>`.
   - `Dialog` es `forwardRef` + `useImperativeHandle` → sobreescribía `dialogRef.current` con el handle `{ open, close, element }` (no el `<dialog>` del DOM).
   - El efecto del mount ejecutaba `dialog.addEventListener(...)` sobre el handle → `TypeError` → React desmonta → pantalla blanca.
   - Además `dialog.open` en el handle es una *función* (truthy), por lo que la sincronización contexto→dialog tampoco funcionaría nunca.
5. **Fix**: `ContactDialog` ya no usa `useDialog()`; solo guarda un `useRef(null)`, abre/cierra vía `dialogRef.current.open()/close()` y escucha el evento `close` sobre `dialogRef.current.element`. Documentado en el patrón de arriba.

**Verificación final** (todo verde):

- `npm run lint` → 0 errores / 0 warnings.
- `npm run build` → OK (`dist/` generado).
- `npm run test:run` → 36/36 tests.
- Chrome headless contra el dev server: wordmark, Hero, 6 cards del catálogo, footer y sección de contacto presentes.

## Cambio de favicon

`public/favicon.svg` (referenciado en `index.html` con `<link rel="icon" type="image/svg+xml">`):

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" rx="7" fill="#22302A"/>
  <circle cx="16" cy="16" r="6" fill="#B4863C"/>
</svg>
```

Cuadrado verde bosque (`#22302A`, rx 7) con círculo dorado (`#B4863C`) al centro.

## Limitaciones conocidas

- `public/og-image.jpg` y `robots.txt` son placeholders de 0 bytes (por reemplazar).
- El formulario de contacto simula el envío (no hay backend).
- Imágenes del catálogo servidas desde fuentes externas definidas en `src/data/catalog.js`.
