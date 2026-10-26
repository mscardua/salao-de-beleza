import { prisma } from "../lib/prisma";
import ServiceList from "./components/ServiceList";

export default async function Home() {
  const services = await prisma.service.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <main className="min-h-screen bg-[#0B132B] py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-extrabold tracking-wide text-[#D4AF37] sm:text-5xl mb-3">
            ✨ Glow Hair
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto font-light">
            Elegância, modernidade e exclusividade. Escolha o seu serviço e agende o seu momento de cuidado.
          </p>
        </div>

        {/* Lista de Serviços com Modal Integrado */}
        <ServiceList services={services} />
      </div>
    </main>
  );
}