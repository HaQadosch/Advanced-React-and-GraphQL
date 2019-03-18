import Link from 'next/link'

export const Nav = _ => (
  <div>
    <Link href='/sell'>
      <a>Sell page</a>
    </Link>
    <Link href='/'>
      <a>Home...</a>
    </Link>
  </div>
)

export default Nav
