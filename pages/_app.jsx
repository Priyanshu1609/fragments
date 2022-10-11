
import Layout from '../components/Layout'
import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import "@magiclabs/ui/dist/cjs/index.css";
import { ThemeProvider } from "@magiclabs/ui";
// import awsconfig from "../src/aws-exports";
import { magic } from "../utils/magic";
import Amplify, { Auth } from "aws-amplify";

import NProgress from "nprogress"
import Head from "next/head"
import Router from "next/router"


NProgress.configure({ showSpinner: false });
Router.onRouteChangeStart = url => {
  NProgress.start()
}

Router.onRouteChangeComplete = () => NProgress.done()

Router.onRouteChangeError = () => NProgress.done()

async function refreshToken() {
  const didToken = await magic.user.getIdToken();
  const userMetadata = await magic.user.getMetadata();


  const body = JSON.stringify({
    didToken,
    issuer: userMetadata.issuer,
  });
  const res = await fetch(
    `${awsconfig.aws_cloud_logic_custom[0].endpoint}/auth`,
    {
      method: "POST",
      body,
    }
  );
  const json = await res.json();
  return {
    identity_id: json.IdentityId,
    token: json.Token,
    expires_at: 2592000 * 1000 + new Date().getTime(),
  };
}


// Amplify.configure(awsconfig);

// Auth.configure({
//   refreshHandlers: {
//     developer: refreshToken,
//   },
// });


export default function App({
  Component, pageProps: { session, ...pageProps }
}) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}