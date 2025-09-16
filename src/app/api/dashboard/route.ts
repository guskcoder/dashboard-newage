import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch('https://api.versellpay.com/api/v1/dashboard/getDataAzcend', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      console.error(`API returned status: ${response.status}`)
      const text = await response.text()
      console.error('Response body:', text)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('Data fetched successfully:', data)

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}