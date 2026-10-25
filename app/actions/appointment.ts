'use server'

import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";

export async function createAppointment(formData: FormData) {
  const clientName = formData.get("clientName") as string;
  const clientPhone = formData.get("clientPhone") as string;
  const dateStr = formData.get("date") as string;
  const serviceId = formData.get("serviceId") as string;

  if (!clientName || !clientPhone || !dateStr || !serviceId) {
    return { success: false, error: "Por favor, preencha todos os campos." };
  }

  try {
    await prisma.appointment.create({
      data: {
        clientName,
        clientPhone,
        date: new Date(dateStr),
        serviceId,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    return { success: false, error: "Erro ao registar o agendamento na base de dados." };
  }
}