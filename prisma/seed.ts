import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });

async function main() {
  // Limpa os serviços existentes
  await pool.query('DELETE FROM "Service";');

  // Insere os 9 serviços com imagens e durações diretamente via SQL
  const servicos = [
    ["Cortar cabelo", "Corte personalizado para realçar a beleza natural de cada cliente", 80, 45, "/services/corte-home.jpeg"],
    ["Escovar cabelo", "Procedimento térmico para deixar os cabelos alisados e sedosos", 70, 60, "/services/escovar-home.jpeg"],
    ["Hidratar cabelo", "Uso de produtos de qualidade para o fortalecimento dos fios, recuperação do brilho e hidratação do couro cabeludo", 120, 120, "/services/hidratar-home.jpeg"],
    ["Modelar cabelo", "Procedimento térmico para deixar os cabelos ondulados e brilhosos", 70, 60, "/services/modelar-home.jpeg"],
    ["Colorir cabelo", "Aplicação de coloração para renovar a cor dos cabelos, alcançar o tom desejado ou iluminar certas áreas.", 200, 180, "/services/colorir-home.jpeg"],
    ["Progressiva", "Procedimento de alinhamento capilar destinado a reduzir o volume e o frizz, conforme a técnica utilizada.", 300, 180, "/services/progressiva-home.jpeg"],
    ["Manicure", "Cuidados com as unhas das mãos, incluindo limpeza, modelagem e esmaltação tradicional.", 40, 45, "/services/manicure-home.jpeg"],
    ["Pedicure", "Cuidados com as unhas dos pés, incluindo limpeza, modelagem e esmaltação tradicional.", 45, 45, "/services/pedicure-home.jpeg"],
    ["Alongamento de unhas", "Técnica que proporciona unhas mais longas e com formato personalizado, conforme a preferência da cliente e decoração/esmaltação.", 100, 90, "/services/alongamento-home.jpeg"]
  ];

  for (const s of servicos) {
    await pool.query(
      `INSERT INTO "Service" (id, name, description, price, duration, "imageHome", "createdAt", "updatedAt") 
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, NOW(), NOW())`,
      s
    );
  }

  console.log("9 serviços com imagens e durações inseridos com sucesso via SQL!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await pool.end();
  });