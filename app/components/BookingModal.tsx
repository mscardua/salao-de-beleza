'use client'

import { useState } from 'react'

interface Service {
  id: string
  name: string
  price: number
  duration: number
}

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  selectedService: Service | null
  services: Service[]
}

export default function BookingModal({
  isOpen,
  onClose,
  selectedService,
  services,
}: BookingModalProps) {
  // Se não estiver aberto, não renderiza nada no ecrã
  if (!isOpen) return null

  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [serviceId, setServiceId] = useState(selectedService?.id || services[0]?.id || '')
  const [date, setDate] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientName, clientPhone, date, serviceId }),
      })
      if (res.ok) {
        alert('Agendamento realizado com sucesso!')
        onClose()
      } else {
        alert('Erro ao realizar agendamento.')
      }
    } catch (err) {
      console.error(err)
      alert('Erro de conexão.')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#111827] border border-[#D4AF37]/40 rounded-2xl p-6 w-full max-w-md shadow-2xl text-white relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#D4AF37] text-xl font-bold"
        >
          ✕
        </button>
        
        <h2 className="text-2xl font-serif font-bold text-[#D4AF37] mb-2">Agendar Atendimento</h2>
        <p className="text-gray-300 text-sm mb-6">Preencha os seus dados para confirmar o seu horário exclusivo.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Nome Completo</label>
            <input
              type="text"
              required
              placeholder="Ex: Maria Silva"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full bg-[#1F2937] border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Telemóvel / WhatsApp</label>
            <input
              type="text"
              required
              placeholder="Ex: 912 345 678"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              className="w-full bg-[#1F2937] border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Serviço Escolhido</label>
            <select
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              className="w-full bg-[#1F2937] border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
            >
              {services.map((s) => (
                <option key={s.id} value={s.id} className="bg-[#111827] text-white">
                  {s.name} - R$ {s.price.toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Data e Hora</label>
            <input
              type="datetime-local"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-[#1F2937] border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#B8860B] text-black font-semibold py-3 rounded-xl mt-4 hover:opacity-90 transition-all shadow-lg"
          >
            Confirmar Agendamento
          </button>
        </form>
      </div>
    </div>
  )
}