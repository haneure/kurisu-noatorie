import { getSystemDetails } from '@/lib/system'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const systemDetails = await getSystemDetails()
    return NextResponse.json(systemDetails)
  } catch (error) {
    console.error('Error fetching system details:', error)
    return NextResponse.json(
      { error: 'Failed to fetch system details' },
      { status: 500 }
    )
  }
}
