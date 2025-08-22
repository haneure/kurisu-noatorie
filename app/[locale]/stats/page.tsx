import { SUPPORTED_LOCALES } from '@/lib/metadata/i18n'
import StatsClient from './StatsClient'

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map(locale => ({ locale: locale.code }))
}

export default function StatsPage() {
  return <StatsClient />
}
