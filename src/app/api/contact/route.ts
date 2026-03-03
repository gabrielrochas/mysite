import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Aqui você pode integrar com serviço de email (SendGrid, Resend, etc)
    // Por enquanto, apenas log
    console.log('Contact form submission:', data)
    
    // Simular delay de envio
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
