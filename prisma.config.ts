import "dotenv/config";
import { defineConfig } from "@prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: "postgresql://neondb_owner:npg_bQstgFM3iD2r@ep-wild-sunset-b6k6kqo7.c-2.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
  },
});