'use client';

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "../actions/auth";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await loginAction(formData);

    if (result.success) {
      router.push("/dashboard");
      router.refresh();
    } else {
      setError(result.message || "Erro ao efetuar login.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white text-slate-900 flex flex-col justify-center items-center px-6">
      <div className="w-full max-w-md bg-white border border-slate-200 shadow-sm rounded-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-wider text-pink-600">Glow Hair</h1>
          <p className="text-sm text-slate-600 mt-2">Entre para ver os agendamentos</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg text-sm text-center font-medium bg-pink-50 text-pink-700 border border-pink-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
            <input
              type="email"
              name="email"
              required
              placeholder="seu@email.com"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-slate-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Palavra-passe</label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-slate-900"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-pink-500 text-white font-medium rounded-lg hover:bg-pink-400 transition mt-2 disabled:opacity-50"
          >
            {loading ? "A entrar..." : "Entrar"}
          </button>

          <div className="flex justify-between items-center text-sm mt-2">
            <Link href="/forgot-password" className="text-xs text-slate-500 hover:text-pink-600 transition">
             Esqueceu a palavra-passe?
             </Link>
          </div>
        </form>

        <p className="text-center text-sm text-slate-600 mt-6">
          Ainda não tem conta?{" "}
          <Link href="/signup" className="text-pink-600 font-medium hover:underline">
            Criar Conta
          </Link>
        </p>

        <div className="text-center mt-4">
          <Link href="/" className="text-xs text-slate-400 hover:underline">
            ← Voltar para Início
          </Link>
        </div>
      </div>
    </main>
  );
}