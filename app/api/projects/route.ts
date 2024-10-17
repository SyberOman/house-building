import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const projects = await prisma.project.findMany()
  return NextResponse.json(projects)
}

export async function POST(request: Request) {
  const json = await request.json()
  const project = await prisma.project.create({
    data: json,
  })
  return new NextResponse(JSON.stringify(project), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  })
}