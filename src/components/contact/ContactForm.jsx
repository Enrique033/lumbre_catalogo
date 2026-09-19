import { useState } from 'react'
import { Button } from '@/components/ui/Button.jsx'
import { Field } from '@/components/ui/Field.jsx'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const INITIAL = { name: '', email: '', message: '' }

/**
 * Formulario de contacto con validación en cliente y envío simulado.
 * Cuando se conecte a un servicio real (Formspree, Resend), sustituir
 * el bloque marcado más abajo por un fetch().
 */
export function ContactForm({ piece = '', onSuccess }) {
  const [values, setValues] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const update = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const validate = () => {
    const next = {}

    if (!values.name.trim()) {
      next.name = 'Introduce tu nombre.'
    }

    const email = values.email.trim()
    if (!email) {
      next.email = 'Introduce tu email.'
    } else if (!EMAIL_RE.test(email)) {
      next.email = 'El email no parece válido.'
    }

    if (!values.message.trim()) {
      next.message = 'Cuéntanos brevemente tu consulta.'
    }

    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    if (!validate()) return

    setStatus('sending')

    // -----------------------------------------------------------
    // ENVÍO SIMULADO
    // Para conectar un servicio real, reemplazar este bloque por:
    //   await fetch('https://formspree.io/f/TU_ID', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ ...values, piece }),
    //   })
    // -----------------------------------------------------------
    await new Promise((resolve) => setTimeout(resolve, 700))

    setStatus('success')
    setValues(INITIAL)

    if (typeof onSuccess === 'function') {
      onSuccess()
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {status === 'success' && (
        <div
          role="status"
          aria-live="polite"
          className="mb-3 px-3 py-2.5 rounded-btn text-[13px] border border-success/22 bg-success/9 text-success"
        >
          Mensaje enviado. Te responderemos en 24 h laborables.
        </div>
      )}

      <Field
        label="Nombre"
        error={errors.name}
        inputProps={{
          name: 'name',
          type: 'text',
          autoComplete: 'name',
          required: true,
          value: values.name,
          onChange: update('name'),
          placeholder: 'Cómo te llamas',
        }}
      />

      <Field
        label="Email"
        error={errors.email}
        inputProps={{
          name: 'email',
          type: 'email',
          autoComplete: 'email',
          required: true,
          value: values.email,
          onChange: update('email'),
          placeholder: 'tu@email.com',
        }}
      />

      <Field
        as="textarea"
        label="Mensaje"
        error={errors.message}
        inputProps={{
          name: 'message',
          required: true,
          value: values.message,
          onChange: update('message'),
          placeholder: piece
            ? `Me interesa ${piece}. Me gustaría saber más sobre plazos y acabados.`
            : 'Cuéntanos qué espacio quieres iluminar y te ayudamos.',
        }}
      />

      <div className="flex gap-2.5 mt-1.5">
        <Button type="submit" variant="primary" wide disabled={status === 'sending'}>
          {status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
        </Button>
      </div>
    </form>
  )
}
