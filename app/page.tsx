import Link from "next/link";
import Image from "next/image";
import { prisma } from "../lib/prisma";

export default async function Home() {
  const services = await prisma.service.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      {/* Cabeçalho com o nome do salão e botões de autenticação */}
      <header className="flex justify-between items-center max-w-5xl mx-auto mb-12 py-4 border-b border-slate-800">
        <h1 className="text-2xl font-bold tracking-wider text-amber-500">Glow Hair</h1>
        <div className="flex gap-4">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition"
          >
            Entrar
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 text-sm font-medium bg-amber-500 text-slate-950 rounded-lg hover:bg-amber-400 transition"
          >
            Criar Conta
          </Link>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold mb-6">Serviços Disponíveis</h2>

        {services.length === 0 ? (
          <p className="text-slate-400">Nenhum serviço registado de momento.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <Link
                key={service.id}
                href={"/services/" + service.id}
                className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between hover:border-amber-500/50 transition group"
              >
                {/* Imagem do Serviço no topo do card */}
                <div className="relative w-full h-48 bg-slate-800">
                  {service.imageUrl ? (
                    <Image
                      src={service.imageUrl}
                      alt={service.name}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-500 text-sm">
                      Sem imagem
                    </div>
                  )}
                </div>

                {/* Informações do serviço */}
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-amber-400">{service.name}</h3>
                    <p className="text-sm text-slate-400 mt-1">{service.description}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-semibold text-emerald-400">
                        R$ {service.price.toFixed(2)}
                      </span>
                      <span className="text-xs text-slate-500 block">
                        {service.duration} mins
                      </span>
                    </div>

                    <span className="px-4 py-2 text-sm font-medium bg-amber-500 text-slate-950 rounded-lg group-hover:bg-amber-400 transition">
                      Agendar
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}