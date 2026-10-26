import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { clientName, clientPhone, date, serviceId } = body

    if (!clientName || !clientPhone || !date || !serviceId) {
      return NextResponse.json({ error: 'Campos obrigatórios em falta.' }, { status: 400 })
    }

    const appointment = await prisma.appointment.create({
      data: {
        clientName,
        clientPhone,
        date: new Date(date),
        serviceId,
      },
    })

    return NextResponse.json(appointment, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar agendamento:', error)
    return NextResponse.json({ error: 'Erro interno ao agendar.' }, { status: 500 })
  }
}