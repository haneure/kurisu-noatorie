// This only used to redirect root path to the default locale
import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/en')
}