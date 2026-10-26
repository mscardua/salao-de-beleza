'use client'

import { useState } from 'react'
import { createAppointment } from '@/app/actions/appointment'

interface Service {
  id: string
  name: string
  price: number
}

export default function AppointmentForm({ services }: { services: Service[] }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setMessage('')

    const formData = new FormData(event.currentTarget)
    const result = await createAppointment(formData)

    setLoading(false)
    if (result.success) {
      setMessage('Agendamento realizado com sucesso! ✨')
      event.currentTarget.reset()
    } else {
      setMessage(result.error || 'Ocorreu um erro.')
    }
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 max-w-md mx-auto">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Agende o seu horário</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Seu Nome</label>
          <input 
            type="text" 
            name="clientName" 
            required 
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
            placeholder="Ex: Maria Silva"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Telemóvel</label>
          <input 
            type="tel" 
            name="clientPhone" 
            required 
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
            placeholder="Ex: 912345678"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Serviço</label>
          <select 
            name="serviceId" 
            required 
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none bg-white"
          >
            <option value="">Selecione um serviço...</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name} - ${service.price.toFixed(2)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Data e Hora</label>
          <input 
            type="datetime-local" 
            name="date" 
            required 
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2.5 rounded-lg transition-colors"
        >
          {loading ? 'A agendar...' : 'Confirmar Agendamento'}
        </button>

        {message && (
          <p className="text-center text-sm mt-2 font-medium text-pink-600">{message}</p>
        )}
      </form>
    </div>
  )
}