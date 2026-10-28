import Image from "next/image";
import Link from "next/link";
import { prisma } from "../../../lib/prisma";
import { notFound } from "next/navigation";
import BookingModal from "../../components/BookingModal";

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const serviceId = resolvedParams.id;

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
        {/* Foto Principal de Detalhe (compacta, h-72, sem cortes) */}
        <div className="relative w-full h-72 bg-slate-100 rounded-2xl overflow-hidden mb-8 shadow-sm">
          {service.imageDetail ? (
            <Image
              src={service.imageDetail}
              alt={service.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400 text-sm">
              Sem imagem de detalhe configurada
            </div>
          )}
        </div>

        {/* Informações Reais do Banco de Dados */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-pink-600 mb-2">{service.name}</h1>
          <p className="text-slate-600 text-lg mb-4">{service.description}</p>
          <span className="text-2xl font-semibold text-emerald-600">
            R$ {Number(service.price).toFixed(2)}
          </span>
        </div>

        {/* Botão e Janela Modal de Agendamento */}
        <div className="border-t border-slate-200 pt-6">
          <BookingModal serviceId={service.id} serviceName={service.name} />
        </div>
      </div>
    </main>
  );
}