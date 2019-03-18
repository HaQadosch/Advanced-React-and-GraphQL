import { Nav } from './Nav'

export const Header = _ => (
  <div>
    <div className='bar'>
      <a href=''>Sick Fits</a>
      <Nav />
    </div>
    <div className='sub-bar'>
      <p className=''>Search</p>
    </div>
    <div className=''>Cart</div>
  </div>
)

export default Header
