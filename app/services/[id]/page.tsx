import Image from "next/image";
import Link from "next/link";
import { prisma } from "../../../lib/prisma";
import { notFound, redirect } from "next/navigation";

async function handleBooking(formData: FormData) {
  "use server";

  const serviceId = formData.get("serviceId") as string;
  const clientName = formData.get("clientName") as string;
  const clientPhone = formData.get("clientPhone") as string;
  const dateStr = formData.get("date") as string;
  const timeStr = formData.get("time") as string;

  if (!clientName || !clientPhone || !dateStr || !serviceId) {
    return;
  }

  // Cria o agendamento alinhado exatamente ao model Appointment
  await prisma.appointment.create({
    data: {
      serviceId,
      clientName,
      clientPhone,
      date: new Date(dateStr),
      time: timeStr || null,
      status: "Pendente",
    },
  });

  // Redireciona para a mesma página do serviço com o aviso de sucesso
  redirect(`/services/${serviceId}?sucesso=true`);
}

export default async function ServiceDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ sucesso?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;
  const serviceId = resolvedParams.id;
  const isSuccess = resolvedSearch.sucesso === "true"; // <- Variável de sucesso ativa

  const service = await prisma.service.findUnique({
    where: { id: serviceId },
  });

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-slate-900 pb-16">
      {/* Cabeçalho */}
      <header className="flex justify-between items-center max-w-5xl mx-auto px-6 py-4 border-b border-slate-200 mb-8">
        <Link href="/" className="text-2xl font-bold tracking-wider text-pink-600">
          Glow Hair
        </Link>
        <Link
          href="/"
          className="text-sm font-medium text-slate-600 hover:text-slate-950 transition"
        >
          ← Voltar para a Home
        </Link>
      </header>

      <div className="max-w-5xl mx-auto px-6">
        {/* Informações Principais */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-pink-600 mb-2">{service.name}</h1>
          <p className="text-slate-600 text-lg mb-4">{service.description}</p>
          <span className="text-2xl font-semibold text-emerald-600">
            R$ {service.price.toFixed(2)}
          </span>
        </div>

        {/* Galeria de Imagens (Suporta tanto o array images como imageDetail) */}
        {service.images && service.images.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {service.images.map((imgUrl, index) => (
              <div key={index} className="relative w-full h-80 bg-slate-100 rounded-2xl overflow-hidden shadow-sm">
                <Image
                  src={imgUrl}
                  alt={`${service.name} Imagem ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ) : service.imageDetail ? (
          <div className="relative w-full h-80 bg-slate-100 rounded-2xl overflow-hidden shadow-sm mb-12">
            <Image
              src={service.imageDetail}
              alt={service.name}
              fill
              className="object-cover"
            />
          </div>
        ) : null}

        {/* Formulário que salva no banco para o Painel/Dashboard */}
        <div className="border-t border-slate-200 pt-8 max-w-xl">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Agendar Este Serviço</h2>

          {/* AVISO DE SUCESSO */}
          {isSuccess && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-sm font-medium">
              ✨ Agendamento realizado com sucesso! O salão já recebeu o seu pedido.
            </div>
          )}

          <form action={handleBooking} className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <input type="hidden" name="serviceId" value={service.id} />

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Seu Nome</label>
              <input
                type="text"
                name="clientName"
                required
                placeholder="Ex: Maria Silva"
                className="w-full border border-slate-300 rounded-xl p-3 text-sm bg-white focus:outline-none focus:border-pink-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Seu Telefone / WhatsApp</label>
              <input
                type="text"
                name="clientPhone"
                required
                placeholder="Ex: (11) 99999-9999"
                className="w-full border border-slate-300 rounded-xl p-3 text-sm bg-white focus:outline-none focus:border-pink-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Data</label>
                <input
                  type="date"
                  name="date"
                  required
                  className="w-full border border-slate-300 rounded-xl p-3 text-sm bg-white focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Horário</label>
                <input
                  type="time"
                  name="time"
                  required
                  className="w-full border border-slate-300 rounded-xl p-3 text-sm bg-white focus:outline-none focus:border-pink-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-pink-500 text-white font-medium rounded-xl hover:bg-pink-400 transition shadow-sm cursor-pointer mt-2"
            >
              Confirmar e Salvar Agendamento
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}