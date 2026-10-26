'use client'

import { useState } from 'react'
import BookingModal from './BookingModal'

interface Service {
  id: string
  name: string
  description: string | null
  price: number
  duration: number
}

export default function ServiceList({ services }: { services: Service[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  function handleOpenModal(service: Service) {
    setSelectedService(service)
    setIsModalOpen(true)
  }

  return (
    <>
      {/* Grelha de Serviços */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-[#111827] border border-[#D4AF37]/20 rounded-2xl shadow-xl p-6 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1 hover:border-[#D4AF37]/50"
          >
            <div>
              <h2 className="text-xl font-serif font-bold text-[#D4AF37] mb-2">
                {service.name}
              </h2>
              <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                {service.description}
              </p>
            </div>

            <div className="pt-4 border-t border-gray-800 flex items-center justify-between mt-auto">
              <div>
                <span className="text-xl font-bold text-white">
                  R$ {service.price.toFixed(2)}
                </span>
                <span className="text-xs text-gray-400 block mt-0.5">
                  ⏱️ {service.duration} minutos
                </span>
              </div>
              <button 
                onClick={() => handleOpenModal(service)}
                className="bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#B8860B] text-black px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-all shadow-md"
              >
                Agendar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Agendamento */}
      <BookingModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedService={selectedService}
        services={services}
      />
    </>
  )
}