'use server';

import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";

export async function createAppointmentAction(formData: FormData) {
  const clientName = formData.get("clientName") as string;
  const clientPhone = formData.get("clientPhone") as string;
  const date = formData.get("date") as string;
  const time = formData.get("time") as string;
  const serviceId = formData.get("serviceId") as string;

  if (!clientName || !clientPhone || !date || !time) {
    return { success: false, message: "Preencha todos os campos obrigatórios." };
  }

  try {
    await prisma.appointment.create({
      data: {
        clientName,
        clientPhone,
        date: new Date(date),
        time,
        serviceId: serviceId || null,
      },
    });
    return { success: true, message: "Agendamento realizado com sucesso!" };
  } catch (error) {
    return { success: false, message: "Erro ao realizar o agendamento. Tente novamente." };
  }
}

export async function updateAppointmentStatusAction(appointmentId: string, status: string) {
  try {
    await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status },
    });
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    return { success: false, message: "Erro ao atualizar o estado." };
  }
}