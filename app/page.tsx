export const dynamic = "force-dynamic";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "../lib/prisma";

export default async function Home() {
  const services = await prisma.service.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Cabeçalho com o nome do salão e botões de autenticação */}
      <header className="flex justify-between items-center max-w-5xl mx-auto px-6 py-4 border-b border-slate-200">
        <h1 className="text-2xl font-bold tracking-wider text-pink-600">Glow Hair</h1>
        <div className="flex gap-4">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-950 transition"
          >
            Entrar
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 text-sm font-medium bg-pink-500 text-white rounded-lg hover:bg-pink-400 transition"
          >
            Criar Conta
          </Link>
        </div>
      </header>

      {/* Banner Inteiro: Sem cortes, largura total, grudado no cabeçalho e tamanho vertical proporcional */}
      <div className="w-full bg-slate-100 border-b border-slate-200 mb-12">
        <Image
          src="/banner.jpeg"
          alt="Glow Hair Salão"
          width={1920}
          height={1080}
          className="w-full h-auto block"
          priority
        />
      </div>

      {/* Conteúdo Principal: Serviços */}
      <div className="max-w-5xl mx-auto px-6 pb-12">
        <h2 className="text-xl font-semibold mb-6 text-slate-900">Serviços Disponíveis</h2>

        {services.length === 0 ? (
          <p className="text-slate-500">Nenhum serviço registado de momento.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.id}
                href={"/services/" + service.id}
                className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden flex flex-col justify-between hover:border-pink-500/50 transition group"
              >
                {/* Imagem do Serviço no topo do card (Altura h-64) */}
                <div className="relative w-full h-64 bg-slate-100">
                  {service.imageHome ? (
                    <Image
                      src={service.imageHome}
                      alt={service.name}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                      Sem imagem
                    </div>
                  )}
                </div>

                {/* Informações do serviço */}
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-pink-600">{service.name}</h3>
                    <p className="text-sm text-slate-600 mt-1">{service.description}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-semibold text-emerald-600">
                        R$ {service.price.toFixed(2)}
                      </span>
                    </div>

                    <span className="px-4 py-2 text-sm font-medium bg-pink-500 text-white rounded-lg group-hover:bg-pink-400 transition">
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