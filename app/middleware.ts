import { SUPPORTED_LOCALES } from '@/lib/metadata/i18n';
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

const PUBLIC_FILE = /\.(.*)$/

// Extract just the locale codes: ['en', 'ja']
const SUPPORTED_LOCALE_CODES = SUPPORTED_LOCALES.map(locale => locale.code);

export function middleware(request: NextRequest) {
  let headers = { 'accept-language': 'en-US,en;q=0.5' }
  let languages = new Negotiator({ headers }).languages()
  let locales = ['en-US', 'nl-NL', 'nl']
  let defaultLocale = 'en-US'
  
  console.log(match(languages, locales, defaultLocale)) // -> 'en-US'
}
