export const dynamic = "force-dynamic";
import { prisma } from "../../lib/prisma";
import Link from "next/link";
import { updateAppointmentStatusAction } from "../actions/appointment";

export default async function DashboardPage() {
  const appointments = await prisma.appointment.findMany({
    include: { service: true },
    orderBy: { date: 'asc' },
  });

  // Filtrar os agendamentos por status
  const pendentes = appointments.filter((app) => app.status === 'Pendente');
  const atendidos = appointments.filter((app) => app.status === 'Atendido');
  const cancelados = appointments.filter((app) => app.status === 'Cancelado');

  return (
    <main className="min-h-screen bg-white text-slate-900 pb-12">
      {/* Cabeçalho */}
      <header className="flex justify-between items-center max-w-5xl mx-auto px-6 py-6 border-b border-slate-200 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-wider text-pink-600">Glow Hair</h1>
          <p className="text-sm text-slate-500">Painel do Profissional</p>
        </div>
        <Link 
          href="/" 
          className="text-sm px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition"
        >
          Sair / Início
        </Link>
      </header>

      {/* Conteúdo Principal */}
      <div className="max-w-5xl mx-auto px-6 space-y-10">
        
        {/* SEÇÃO: PENDENTES */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              ⏳ Agendamentos Pendentes 
              <span className="text-xs bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full border border-amber-200">
                {pendentes.length}
              </span>
            </h2>
          </div>

          {pendentes.length === 0 ? (
            <p className="text-sm text-slate-400 italic bg-slate-50 p-4 rounded-xl border border-slate-100">Não há agendamentos pendentes.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {pendentes.map((app) => (
                <div key={app.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-pink-200 transition">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-lg text-slate-900">{app.clientName}</h3>
                      <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-amber-50 text-amber-700 border border-amber-200">
                        {app.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">📞 {app.clientPhone}</p>
                    <div className="pt-2 flex items-center gap-4 text-sm">
                      <span className="text-pink-600 font-semibold bg-pink-50 px-2.5 py-1 rounded-md">
                        ✂️ {app.service ? app.service.name : "Serviço Geral"}
                      </span>
                      <span className="text-emerald-600 font-bold">
                        R$ {(app.service ? app.service.price : 0).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end w-full md:w-auto gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <div className="text-left md:text-right">
                      <span className="block text-sm font-semibold text-slate-700">📅 {new Date(app.date).toLocaleDateString('pt-BR')}</span>
                      <span className="block text-sm font-bold text-slate-900">⏰ {app.time || "Horário não especificado"}</span>
                    </div>

                    {/* Botões visíveis apenas para pendentes (uma vez alterado, não pode mudar) */}
                    <div className="flex items-center gap-2 w-full md:w-auto">
                      <form action={async () => {
                        'use server';
                        await updateAppointmentStatusAction(app.id, 'Atendido');
                      }}>
                        <button type="submit" className="px-3 py-1.5 text-xs font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition">
                          Atendimento Ocorreu
                        </button>
                      </form>

                      <form action={async () => {
                        'use server';
                        await updateAppointmentStatusAction(app.id, 'Cancelado');
                      }}>
                        <button type="submit" className="px-3 py-1.5 text-xs font-medium bg-slate-100 text-slate-600 border border-slate-300 rounded-lg hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition">
                          Cancelar
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* SEÇÃO: ATENDIDOS (EFETUADOS) */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              ✅ Atendimentos Concluídos 
              <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200">
                {atendidos.length}
              </span>
            </h2>
          </div>

          {atendidos.length === 0 ? (
            <p className="text-sm text-slate-400 italic bg-slate-50 p-4 rounded-xl border border-slate-100">Nenhum atendimento concluído ainda.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {atendidos.map((app) => (
                <div key={app.id} className="bg-slate-50/60 border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 opacity-90">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-lg text-slate-800">{app.clientName}</h3>
                      <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {app.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">📞 {app.clientPhone}</p>
                    <div className="pt-2 flex items-center gap-4 text-sm">
                      <span className="text-slate-600 font-medium bg-slate-200/60 px-2.5 py-1 rounded-md">
                        ✂️ {app.service ? app.service.name : "Serviço Geral"}
                      </span>
                      <span className="text-emerald-700 font-bold">
                        R$ {(app.service ? app.service.price : 0).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="text-left md:text-right">
                    <span className="block text-sm font-semibold text-slate-600">📅 {new Date(app.date).toLocaleDateString('pt-BR')}</span>
                    <span className="block text-sm font-bold text-slate-700">⏰ {app.time || "Horário não especificado"}</span>
                    <span className="text-xs text-emerald-600 font-medium mt-1 block">Finalizado (Bloqueado)</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* SEÇÃO: CANCELADOS */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              ❌ Agendamentos Cancelados 
              <span className="text-xs bg-rose-50 text-rose-700 px-2.5 py-0.5 rounded-full border border-rose-200">
                {cancelados.length}
              </span>
            </h2>
          </div>

          {cancelados.length === 0 ? (
            <p className="text-sm text-slate-400 italic bg-slate-50 p-4 rounded-xl border border-slate-100">Nenhum agendamento cancelado.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {cancelados.map((app) => (
                <div key={app.id} className="bg-slate-50/60 border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 opacity-80">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-lg text-slate-800 line-through">{app.clientName}</h3>
                      <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-rose-50 text-rose-700 border border-rose-200">
                        {app.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500">📞 {app.clientPhone}</p>
                    <div className="pt-2 flex items-center gap-4 text-sm">
                      <span className="text-slate-500 font-medium bg-slate-200/60 px-2.5 py-1 rounded-md">
                        ✂️ {app.service ? app.service.name : "Serviço Geral"}
                      </span>
                    </div>
                  </div>

                  <div className="text-left md:text-right">
                    <span className="block text-sm font-semibold text-slate-500">📅 {new Date(app.date).toLocaleDateString('pt-BR')}</span>
                    <span className="block text-sm font-bold text-slate-600">⏰ {app.time || "Horário não especificado"}</span>
                    <span className="text-xs text-rose-600 font-medium mt-1 block">Cancelado (Bloqueado)</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}