import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const agreements = await prisma.agreement.findMany()
  return NextResponse.json(agreements)
}

export async function POST(request: Request) {
  const json = await request.json()
  const agreement = await prisma.agreement.create({
    data: json,
  })
  return new NextResponse(JSON.stringify(agreement), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  })
}