'use client';

import Link from "next/link";
import { useState } from "react";
import { resetPasswordAction } from "../actions/auth";

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState<{ success: boolean; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const result = await resetPasswordAction(formData);

    setMessage({ success: result.success, text: result.message });
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-white text-slate-900 flex flex-col justify-center items-center px-6">
      <div className="w-full max-w-md bg-white border border-slate-200 shadow-sm rounded-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-wider text-pink-600">Glow Hair</h1>
          <p className="text-sm text-slate-600 mt-2">Redefinir palavra-passe</p>
        </div>

        {message && (
          <div className={`mb-4 p-3 rounded-lg text-sm text-center font-medium border ${
            message.success ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-pink-50 text-pink-700 border-pink-200'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">E-mail da conta</label>
            <input
              type="email"
              name="email"
              required
              placeholder="seu@email.com"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-slate-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nova Palavra-passe</label>
            <input
              type="password"
              name="newPassword"
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
            {loading ? "A atualizar..." : "Atualizar Palavra-passe"}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link href="/login" className="text-sm text-pink-600 font-medium hover:underline">
            ← Voltar para o Login
          </Link>
        </div>
      </div>
    </main>
  );
}