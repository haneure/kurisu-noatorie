import MouseDistanceDrivenTextAnimation from '@/components/animations/mouse-distance-driven-text-animation'
import ContactForm from '@/components/contact-form'

export default function Contact() {
  const texts = [
    "Let's connect!",
    "Let's create something amazing.",
    "Let's make your ideas a reality.",
    "Let's get started on your project today!",
    "Let's make it happen!",
    "Let's talk about your project."
  ]

  return (
    <section className='pt-40 pb-24'>
      <div className='container mx-auto max-w-3xl px-4'>
        <h2 className='title mb-12'>
          <MouseDistanceDrivenTextAnimation
            texts={texts}
            className='text-4xl font-bold'
            fontSize='2rem'
            fontWeight='bold'
            color='text-primary-foreground'
          />
        </h2>

        <ContactForm />
      </div>
    </section>
  )
}
