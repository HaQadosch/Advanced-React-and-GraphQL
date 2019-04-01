import App, { Container } from 'next/app'
import * as Sentry from '@sentry/browser'
import { Page } from '../components/Page'
import { ApolloProvider } from 'react-apollo'
import { withData } from '../lib/withData'

Sentry.init({
  dsn: 'https://6066970219f84edca9f1c5d21e8a75c3@sentry.io/1417349',
  release: 'Advanced-React-and-GraphQL@0.3.0'
})

Sentry.configureScope((scope) => {
  scope.setUser({
    'id': 'god',
    'username': 'haqadosch',
    'email': 'haqadosch@pm.me'
  })
})

export default withData(class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
    pageProps.query = ctx.query
    return { pageProps }
  }

  constructor (props) {
    super(props)
    this.state = { error: null }
  }

  componentDidCatch (error, errorInfo) {
    this.setState({ error })
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key])
      })
      Sentry.captureException(error)
    })
  }

  render () {
    const { Component, apollo, pageProps } = this.props

    if (this.state.error) {
      // render fallback UI
      return (
        <a onClick={() => Sentry.showReportDialog()}>Report feedback</a>
      )
    } else {
      return (
        <Container>
          <ApolloProvider client={apollo}> {/** this.props.apollo is available thanks to WithData() */}
            <Page>
              <Component {...pageProps} />
            </Page>
          </ApolloProvider>
        </Container>
      )
    }
  }
}
)
