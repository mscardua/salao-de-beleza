'use client';

import { useState } from "react";
import { createAppointmentAction } from "../actions/appointment";
import Link from "next/link";

interface Service {
  id: string;
  name: string;
  price: number;
}

export default function AppointmentForm({ service }: { service: Service | null }) {
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState<{ success: boolean; text: string } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setResponseMessage(null);

    const formData = new FormData(event.currentTarget);
    const result = await createAppointmentAction(formData);

    setLoading(false);
    setResponseMessage({ success: result.success, text: result.message });

    if (result.success) {
      event.currentTarget.reset();
    }
  }

  return (
    <main className="min-h-screen bg-white text-slate-900 pb-12">
      <header className="flex justify-between items-center max-w-4xl mx-auto px-6 py-4 border-b border-slate-200 mb-8">
        <Link href="/" className="text-pink-600 font-bold hover:underline text-sm">
          ← Voltar para Início
        </Link>
        <h1 className="text-xl font-bold tracking-wider text-pink-600">Glow Hair</h1>
      </header>

      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-8">
          <h2 className="text-2xl font-bold text-pink-600 mb-2">Confirmar Agendamento</h2>
          <p className="text-slate-600 mb-6">
            Preencha os seus dados e escolha a data para finalizar o agendamento no Glow Hair.
          </p>

          {responseMessage && (
            <div className={`mb-6 p-4 rounded-lg text-sm text-center font-medium ${
              responseMessage.success 
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                : "bg-pink-50 text-pink-700 border border-pink-200"
            }`}>
              {responseMessage.text}
            </div>
          )}

          {service && (
            <div className="mb-6 p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Serviço Selecionado</span>
                <h3 className="font-bold text-pink-600">{service.name}</h3>
              </div>
              <span className="text-lg font-bold text-emerald-600">
                R$ {service.price.toFixed(2)}
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="hidden" name="serviceId" value={service?.id || ""} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nome do Cliente</label>
                <input
                  type="text"
                  name="clientName"
                  required
                  placeholder="O seu nome completo"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Número de Telefone</label>
                <input
                  type="tel"
                  name="clientPhone"
                  required
                  placeholder="(00) 00000-0000"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Data pretendida</label>
                <input
                  type="date"
                  name="date"
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-slate-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Horário</label>
                <input
                  type="time"
                  name="time"
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-slate-900"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-sm text-slate-500">Pagamento efetuado no salão</span>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 font-medium bg-pink-500 text-white rounded-lg hover:bg-pink-400 transition disabled:opacity-50"
              >
                {loading ? "A agendar..." : "Confirmar Agendamento"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}