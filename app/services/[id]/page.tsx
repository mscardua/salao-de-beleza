import { prisma } from '../../../lib/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { id } = await params

  const service = await prisma.service.findUnique({
    where: { id },
  })

  if (!service) return notFound()

  return (
    <main className="min-h-screen bg-[#0B132B] py-12 px-4 sm:px-6 lg:px-8 text-white font-sans">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-[#D4AF37] hover:underline text-sm mb-6 inline-block">
          ← Voltar para a página inicial
        </Link>

        <div className="bg-[#111827] border border-[#D4AF37]/40 rounded-2xl p-8 shadow-2xl">
          {/* Espaço reservado para imagem exclusiva do serviço */}
          <div className="w-full h-64 bg-[#1F2937] rounded-xl mb-6 overflow-hidden relative flex items-center justify-center border border-[#D4AF37]/25">
            <span className="text-gray-400 text-sm italic">✨ Imagem Exclusiva - {service.name}</span>
          </div>

          <h1 className="text-3xl font-serif font-bold text-[#D4AF37] mb-4">{service.name}</h1>
          <p className="text-gray-300 text-base mb-6 leading-relaxed">{service.description || 'Atendimento de alta qualidade e exclusividade.'}</p>

          <div className="flex items-center justify-between border-t border-gray-800 pt-6 mb-8">
            <div>
              <span className="text-2xl font-bold text-white">R$ {service.price.toFixed(2)}</span>
              <span className="text-xs text-gray-400 block mt-1">⏱️ Duração: {service.duration} minutos</span>
            </div>
          </div>

          <Link
            href="/"
            className="block text-center w-full bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#B8860B] text-black font-semibold py-3.5 rounded-xl hover:opacity-90 transition-all shadow-lg"
          >
            Voltar ao Início para Agendar
          </Link>
        </div>
      </div>
    </main>
  )
}