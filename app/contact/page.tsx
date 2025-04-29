import ContactForm from '@/components/contact-form'

export default function Contact() {
  return (
    <section className='pt-40 pb-24'>
      <div className='container mx-auto max-w-3xl px-4'>
        <h2 className='title mb-12'>
          Let&apos;s connect! <br />
          Let&apos;s work together to create something amazing. Let&apos;s make
          your ideas a reality. Lets get started on your project today!
          Let&apos;s make it happen! Let&apos;s talk about your project.
        </h2>

        <ContactForm />
      </div>
    </section>
  )
}
