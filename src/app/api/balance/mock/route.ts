import { NextResponse } from 'next/server'

export async function GET() {
  // Dados mockados para saldo disponível
  const mockBalance = {
    "query": {
      "currentBalance": "1250.75"
    }
  }

  return NextResponse.json(mockBalance)
}