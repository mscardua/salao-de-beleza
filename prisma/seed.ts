import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Limpa serviços existentes para evitar duplicados
  await prisma.service.deleteMany();

  await prisma.service.createMany({
    data: [
      {
        name: "Cortar cabelo",
        description: "Corte personalizado para realçar a beleza natural de cada cliente",
        price: 80.0,
        duration: 45,
      },
      {
        name: "Escovar cabelo",
        description: "Procedimento térmico para deixar os cabelos alisados e sedosos",
        price: 70.0,
        duration: 60,
      },
      {
        name: "Hidratar cabelo",
        description:
          "Uso de produtos de qualidade para o fortalecimento dos fios, recuperação do brilho e hidratação do couro cabeludo",
        price: 120.0,
        duration: 120,
      },
      {
        name: "Modelar cabelo",
        description: "Procedimento térmico para deixar os cabelos ondulados e brilhosos",
        price: 70.0,
        duration: 60,
      },
      {
        name: "Colorir cabelo",
        description:
          "Aplicação de coloração para renovar a cor dos cabelos, alcançar o tom desejado ou iluminar certas áreas.",
        price: 200.0,
        duration: 180,
      },
      {
        name: "Progressiva",
        description:
          "Procedimento de alinhamento capilar destinado a reduzir o volume e o frizz, conforme a técnica utilizada.",
        price: 300.0,
        duration: 180,
      },
      {
        name: "Manicure",
        description: "Cuidados com as unhas das mãos, incluindo limpeza, modelagem e esmaltação tradicional.",
        price: 40.0,
        duration: 45,
      },
      {
        name: "Pedicure",
        description: "Cuidados com as unhas dos pés, incluindo limpeza, modelagem e esmaltação tradicional.",
        price: 45.0,
        duration: 45,
      },
      {
        name: "Alongamento de unhas",
        description:
          "Técnica que proporciona unhas mais longas e com formato personalizado, conforme a preferência da cliente e decoração/esmaltação.",
        price: 100.0,
        duration: 90,
      },
    ],
  });

  console.log("Todos os 9 serviços foram cadastrados com sucesso no banco Neon!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });