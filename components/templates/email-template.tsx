interface ContactFormEmailProps {
  name: string
  email: string
  message: string
}

const EmailTemplate: React.FC<Readonly<ContactFormEmailProps>> = ({
  name,
  email,
  message
}) => (
  <div>
    <h1 className='text-2xl font-bold'>Contact Form Submission</h1>
    <p>
      From <strong>{name}</strong> at {email}
    </p>
    <h2>Message:</h2>
    <p>{message}</p>
  </div>
)

export default EmailTemplate
