'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signUp } from '../../lib/auth-client'
import Link from 'next/link'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    
    await signUp.email({
      email,
      password,
      name,
    }, {
      onSuccess: () => {
        router.push('/dashboard')
      },
      onError: (ctx) => {
        setError(ctx.error.message || 'Erro ao criar conta.')
      }
    })
  }

  return (
    <main className="min-h-screen bg-[#0B132B] flex items-center justify-center px-4 font-sans text-white">
      <div className="bg-[#111827] border border-[#D4AF37]/30 rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <h1 className="text-2xl font-serif font-bold text-[#D4AF37] mb-2 text-center">Criar Conta Profissional</h1>
        <p className="text-gray-400 text-sm mb-6 text-center">Registe o primeiro profissional do Glow Hair.</p>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 p-3 rounded-xl mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-300 mb-1">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-[#1F2937] border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
              placeholder="Ex: Maria Silva"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#1F2937] border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
              placeholder="profissional@glowhair.com"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-300 mb-1">Palavra-passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#1F2937] border border-gray-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#B8860B] text-black font-semibold py-3 rounded-xl hover:opacity-90 transition-all shadow-lg mt-2"
          >
            Registar Conta
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/login" className="text-sm text-[#D4AF37] hover:underline">
            Já tem conta? Faça login aqui
          </Link>
        </div>
      </div>
    </main>
  )
}