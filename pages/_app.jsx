import Layout from '../components/Layout'
import '../styles/globals.css'
import '@magiclabs/ui/dist/cjs/index.css'
import { magic } from '../utils/magic'
import React from 'react'
import NProgress from 'nprogress'
import Router from 'next/router'
import { hotjar } from 'react-hotjar'

NProgress.configure({ showSpinner: false })
Router.onRouteChangeStart = (url) => {
  NProgress.start()
}

Router.onRouteChangeComplete = () => NProgress.done()

Router.onRouteChangeError = () => NProgress.done()

async function refreshToken() {
  const didToken = await magic.user.getIdToken()
  const userMetadata = await magic.user.getMetadata()

  const body = JSON.stringify({
    didToken,
    issuer: userMetadata.issuer,
  })
  const res = await fetch(
    `${awsconfig.aws_cloud_logic_custom[0].endpoint}/auth`,
    {
      method: 'POST',
      body,
    }
  )
  const json = await res.json()
  return {
    identity_id: json.IdentityId,
    token: json.Token,
    expires_at: 2592000 * 1000 + new Date().getTime(),
  }
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  React.useEffect(() => {
    hotjar.initialize(3248630, 6)
    hotjar.identify('USER_ID', { userProperty: 'value' })
    hotjar.event('button-click')
    hotjar.stateChange('/home')
  }, [])

  return (
    <div>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  )
}
