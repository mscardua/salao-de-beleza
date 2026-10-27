'use server';

import { prisma } from "../../lib/prisma";

export async function signupAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { success: false, message: "Preencha todos os campos." };
  }

  try {
    await prisma.user.create({
      data: { name, email, password },
    });
    return { success: true, message: "Cadastro efetuado com sucesso!" };
  } catch (error) {
    return { success: false, message: "Erro ao criar conta. Este e-mail já pode estar registado." };
  }
}

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, message: "Preencha todos os campos." };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.password !== password) {
      return { success: false, message: "E-mail ou palavra-passe incorretos." };
    }

    return { success: true };
  } catch (error) {
    return { success: false, message: "Erro ao efetuar login." };
  }
}
export async function resetPasswordAction(formData: FormData) {
  const email = formData.get("email") as string;
  const newPassword = formData.get("newPassword") as string;

  if (!email || !newPassword) {
    return { success: false, message: "Preencha todos os campos." };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { success: false, message: "E-mail não encontrado na base de dados." };
    }

    await prisma.user.update({
      where: { email },
      data: { password: newPassword },
    });

    return { success: true, message: "Palavra-passe alterada com sucesso! Já pode entrar." };
  } catch (error) {
    return { success: false, message: "Erro ao redefinir a palavra-passe." };
  }
}