import "dotenv/config";
import { defineConfig } from "@prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: "postgresql://neondb_owner:npg_bQstgFM3iD2r@ep-withered-king-b6x9itmv-pooler.c-2.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  },
});