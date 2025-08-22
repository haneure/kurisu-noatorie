import { NewsletterFormSchema } from '@/lib/schemas'
import { logger } from '@/lib/logger'
import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const result = NewsletterFormSchema.safeParse(data)

    if (result.error) {
      logger.error('Validation error:', result.error.format())
      return NextResponse.json(
        { error: result.error.format() },
        { status: 400 }
      )
    }

    const { email } = result.data

    logger.info('Add email to audience, email:', result.data)

    const { data: contactData, error } = await resend.contacts.create({
      email: email,
      audienceId: process.env.RESEND_AUDIENCE_ID as string
    })

    if (!contactData || error) {
      throw new Error('Error adding email, error: ' + error?.message)
    }

    logger.info('Email added successfully:', contactData)

    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error('Error adding email:', error)
    return NextResponse.json({ error: 'Error sending email' }, { status: 500 })
  }
}
