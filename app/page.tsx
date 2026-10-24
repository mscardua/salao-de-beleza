import { prisma } from "../lib/prisma";

export default async function Home() {
  // Busca os 9 serviços diretamente da base de dados Neon
  const services = await prisma.service.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            ✨ Salão de Beleza
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Escolha o serviço ideal para cuidar de si e agende o seu horário com facilidade.
          </p>
        </div>

        {/* Grelha de Serviços */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {service.name}
                </h2>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                <div>
                  <span className="text-xl font-bold text-pink-600">
                    R$ {service.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-400 block mt-0.5">
                    ⏱️ {service.duration} minutos
                  </span>
                </div>
                <button className="bg-pink-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-pink-700 transition-colors shadow-sm">
                  Agendar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}