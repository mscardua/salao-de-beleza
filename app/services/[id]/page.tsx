import Link from "next/link";
import Image from "next/image";
import { prisma } from "../../../lib/prisma";
import { notFound } from "next/navigation";

interface ServicePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { id } = await params;

  const service = await prisma.service.findUnique({
    where: { id },
  });

  if (!service) {
    notFound();
  }

  // Se preferir usar propriedades separadas no banco (ex: imageDetail e imageHome)
  // Pode usar: service.imageDetail || service.imageUrl
  const serviceImage = service.imageUrl;

  return (
    <main className="min-h-screen bg-white text-slate-900 pb-12">
      <header className="flex justify-between items-center max-w-4xl mx-auto px-6 py-4 border-b border-slate-200 mb-8">
        <Link href="/" className="text-pink-600 font-bold hover:underline text-sm">
          ← Voltar para Início
        </Link>
        <h1 className="text-xl font-bold tracking-wider text-pink-600">Glow Hair</h1>
      </header>

      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
          {serviceImage && (
            <div className="relative w-full h-72 md:h-96 bg-slate-100">
              <Image
                src={serviceImage}
                alt={service.name}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="p-8">
            <h2 className="text-2xl font-bold text-pink-600 mb-3">{service.name}</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-100">
              <div>
                <span className="text-2xl font-bold text-emerald-600 block">
                  R$ {service.price.toFixed(2)}
                </span>
                <span className="text-sm text-slate-400">
                  Duração estimada: {service.duration} minutos
                </span>
              </div>

              <Link
                href={"/booking?serviceId=" + service.id}
                className="px-6 py-3 text-center font-medium bg-pink-500 text-white rounded-lg hover:bg-pink-400 transition"
              >
                Agendar este Serviço
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}