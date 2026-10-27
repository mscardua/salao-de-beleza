import { prisma } from '../../lib/prisma' // Ajuste o caminho se necessário conforme sua estrutura

export default async function DashboardPage() {
  // Busca todos os agendamentos ordenados por data
  const appointments = await prisma.appointment.findMany({
    orderBy: { date: 'asc' },
  })

  return (
    <main className="min-h-screen bg-[#0B132B] py-12 px-4 sm:px-6 lg:px-8 text-white font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-serif font-bold text-[#D4AF37] mb-2">Painel do Profissional</h1>
        <p className="text-gray-300 mb-8">Lista de todos os horários e clientes agendados no Glow Hair.</p>

        <div className="bg-[#111827] border border-[#D4AF37]/30 rounded-2xl p-6 shadow-xl overflow-hidden">
          {appointments.length === 0 ? (
            <p className="text-gray-400 text-center py-8">Nenhum agendamento encontrado de momento.</p>
          ) : (
            <div className="divide-y divide-gray-800">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-[#D4AF37]">{appointment.clientName}</h3>
                    <p className="text-sm text-gray-300">📞 Telemóvel: {appointment.clientPhone}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm bg-[#1F2937] text-[#D4AF37] px-3 py-1 rounded-full border border-[#D4AF37]/20">
                      📅 {new Date(appointment.date).toLocaleString('pt-PT')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}