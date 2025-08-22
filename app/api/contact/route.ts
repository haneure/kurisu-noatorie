import EmailTemplate from '@/components/templates/email-template'
import { ContactFormSchema } from '@/lib/schemas'
import { logger } from '@/lib/logger'
import { Resend } from 'resend'
import { string } from 'zod'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)
const chrisEmail = string().parse(process.env.CHRIS_EMAIL)

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const result = ContactFormSchema.safeParse(data)

    if (result.error) {
      logger.error('Validation error:', result.error.format())
      return NextResponse.json(
        { error: result.error.format() },
        { status: 400 }
      )
    }

    const { name, email, message } = result.data

    logger.info('Sending email with data:', result.data)

    const { data: emailData, error } = await resend.emails.send({
      from: chrisEmail,
      to: [email],
      subject: 'Noatorie contact form submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      react: EmailTemplate({ name, email, message })
    })

    if (!emailData || error) {
      throw new Error('Error sending email')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error('Error in contact API:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
