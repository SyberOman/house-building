import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const payments = await prisma.payment.findMany()
  return NextResponse.json(payments)
}

export async function POST(request: Request) {
  const json = await request.json()
  const payment = await prisma.payment.create({
    data: json,
  })
  return new NextResponse(JSON.stringify(payment), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  })
}