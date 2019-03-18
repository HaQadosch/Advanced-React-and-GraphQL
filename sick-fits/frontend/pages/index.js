import * as Sentry from '@sentry/browser'
import Link from 'next/link'

Sentry.init({ dsn: 'https://6066970219f84edca9f1c5d21e8a75c3@sentry.io/1417349' })

const Home = props => (
  <div>
    <p>Yo!</p>
    <Link href='/sell'>
      <a>Sell page</a>
    </Link>
  </div>
)

export default Home
