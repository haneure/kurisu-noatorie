'use server'

import EmailTemplate from '@/components/templates/email-template'
import { Resend } from 'resend'
import { string, z } from 'zod'
import { logger } from './logger'
import { ContactFormSchema, NewsletterFormSchema } from './schemas'

type ContactFormInputs = z.infer<typeof ContactFormSchema>
const resend = new Resend(process.env.RESEND_API_KEY)
const chrisEmail = string().parse(process.env.CHRIS_EMAIL)
export async function sendEmail(data: ContactFormInputs) {
  const result = ContactFormSchema.safeParse(data)

  if (result.error) {
    logger.error('Validation error:', result.error.format())
    return { error: result.error.format() }
  }

  try {
    const { name, email, message } = result.data

    logger.info('Sending email with data:', result.data)

    // TODO:
    // Don't forget to change this from and to email
    // from : kurisu@noatorie.com
    // to : [process.env.CHRIS_EMAIL, email (from user)]
    const { data, error } = await resend.emails.send({
      from: chrisEmail,
      to: [email],
      subject: 'Noatorie contact form submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      react: EmailTemplate({ name, email, message })
    })

    if (!data || error) {
      throw new Error('Error sending email')
    }

    return { success: true }
  } catch (error) {
    return { error }
  }
}

export async function subscribe(data: { email: string }) {
  const result = NewsletterFormSchema.safeParse(data)

  if (result.error) {
    logger.error('Validation error:', result.error.format())
    return { error: result.error.format() }
  }

  try {
    const { email } = result.data

    logger.info('Add email to audience, email:', result.data)

    const { data, error } = await resend.contacts.create({
      email: email,
      audienceId: process.env.RESEND_AUDIENCE_ID as string
    })

    if (!data || error) {
      throw new Error('Error adding email, error: ' + error?.message)
    }

    logger.info('Email added successfully:', data)

    return { success: true }
  } catch ( error) {
    logger.error('Error adding email:', error)
    return { error: 'Error sending email' }
  }
}
