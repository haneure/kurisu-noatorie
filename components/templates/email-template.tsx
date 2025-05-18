import React from 'react'

interface ContactFormEmailProps {
  name: string
  email: string
  message: string
}

function EmailTemplate({
  name,
  email,
  message
}: ContactFormEmailProps): React.ReactElement {
  return (
    <div>
      <h1 className='text-2xl font-bold'>Contact Form Submission</h1>
      <p>
        From <strong>{name}</strong> at {email}
      </p>
      <h2>Message:</h2>
      <p>{message}</p>
    </div>
  )
}

export default EmailTemplate
