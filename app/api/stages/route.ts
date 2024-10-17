import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const stages = await prisma.stage.findMany()
  return NextResponse.json(stages)
}

export async function POST(request: Request) {
  const json = await request.json()
  const stage = await prisma.stage.create({
    data: json,
  })
  return new NextResponse(JSON.stringify(stage), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  })
}