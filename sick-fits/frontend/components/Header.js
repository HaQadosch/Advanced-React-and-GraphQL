import { Nav } from './Nav'
import styled from 'styled-components'
import Link from 'next/link'
import Router from 'next/router'
import NProgress from 'nprogress'

Router.onRouteChangeStart = pathname => {
  // console.log('onRouteChangeStart', { pathname })
  NProgress.start()
}
Router.onRouteChangeComplete = pathname => {
  // console.log('onRouteChangeComplete', { pathname })
  NProgress.done()
}
Router.onRouteChangeError = pathname => {
  // console.log('onRouteChangeError', { pathname })
  NProgress.done()
}

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  a {
    padding: 0.5rem 1rem;
    background: ${props => props.theme.red};
    color: white;
    text-transform: uppercase;
    text-decoration: none;
  }
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`

const StyledHeader = styled.header`
  .bar {
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    border-bottom: 10px solid ${props => props.theme.black};
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${props => props.theme.lightgrey};

  }
`

export const Header = _ => (
  <StyledHeader>
    <div className='bar'>
      <Logo>
        <Link href='/'>
          <a>Sick Fits</a>
        </Link>
      </Logo>
      <Nav />
    </div>
    <div className='sub-bar'>
      <p className=''>Search</p>
    </div>
    <div className=''>Cart</div>
  </StyledHeader>
)

export default Header
