import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const purchases = await prisma.purchase.findMany()
  return NextResponse.json(purchases)
}

export async function POST(request: Request) {
  const json = await request.json()
  const purchase = await prisma.purchase.create({
    data: json,
  })
  return new NextResponse(JSON.stringify(purchase), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  })
}