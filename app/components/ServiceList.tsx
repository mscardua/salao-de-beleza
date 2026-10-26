'use client'

import { useState } from 'react'
import Link from 'next/link'
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
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-[#111827] border border-[#D4AF37]/20 rounded-2xl shadow-xl p-6 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1 hover:border-[#D4AF37]/50"
          >
            <div>
              {/* Espaço de imagem para cada cartão */}
              <div className="w-full h-36 bg-[#1F2937] rounded-xl mb-4 flex items-center justify-center border border-[#D4AF37]/10">
                <span className="text-xs text-gray-400 italic">✨ {service.name}</span>
              </div>

              {/* Cada título agora leva à sua página própria */}
              <Link href={`/services/${service.id}`}>
                <h2 className="text-xl font-serif font-bold text-[#D4AF37] mb-2 hover:underline cursor-pointer">
                  {service.name}
                </h2>
              </Link>
              <p className="text-gray-300 text-sm mb-6 leading-relaxed line-clamp-2">
                {service.description}
              </p>
            </div>

            <div className="pt-4 border-t border-gray-800 flex items-center justify-between mt-auto">
              <div>
                <span className="text-lg font-bold text-white">
                  R$ {service.price.toFixed(2)}
                </span>
                <span className="text-xs text-gray-400 block">
                  ⏱️ {service.duration} min
                </span>
              </div>
              <button
                onClick={() => handleOpenModal(service)}
                className="bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#B8860B] text-black px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-all shadow-md"
              >
                Agendar
              </button>
            </div>
          </div>
        ))}
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedService={selectedService}
        services={services}
      />
    </>
  )
}