import * as Sentry from '@sentry/browser'
import Link from 'next/link'

Sentry.init({ dsn: 'https://6066970219f84edca9f1c5d21e8a75c3@sentry.io/1417349' })

const Sell = props => (
  <div>
    <p>Sell Page!</p>
    <Link href='/'>
      <a>Home...</a>
    </Link>
  </div>
)

export default Sell
