import React, { Component } from 'react'
import { Header } from './Header'
import { Meta } from './Meta'
import styled, { ThemeProvider, injectGlobal } from 'styled-components'

const theme = {
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  lightgrey: '#E1E1E1',
  offwhite: '#EDEDED',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)'
}

const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
`

// We want to constrain the page elt in the center, not having them spread over the whole length.
const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`

export class Page extends Component {
  render () {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <Header />
          <Inner>
            { this.props.children }
          </Inner>
        </StyledPage>
      </ThemeProvider>
    )
  }
}

export default Page
