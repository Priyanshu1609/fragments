import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Connector, defaultChains, InjectedConnector, Provider } from 'wagmi'
import Head from 'next/head'
import Link from 'next/link'
import Logo from '../components/logo'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { ConnectModalProvider } from '../contexts/connectwallet'
import ConnectModal from '../components/ConnectModal'
import Account from '../components/Account'
const chains = defaultChains

export type ConnectorsType = Connector<any, any>[] | ((config: {
    chainId?: number | undefined;
}) => Connector<any, any>[])

const connectors: ConnectorsType = () => {
  return [
    new InjectedConnector({
      chains,
      options: { shimDisconnect: true },
    }),
    new WalletConnectConnector({
      options: {
        infuraId: "d0bf9072628c4863bdee91fd86a9c5fa",
        qrcode: true,
      },
    })
  ]
}

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <Provider connectors={connectors} autoConnect>
      <ConnectModalProvider>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link 
            href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&display=swap" 
            rel="stylesheet" 
          />
        </Head>
        <div className='min-h-screen bg-black'>
          <header className="bg-black">
            <div className="max-w-7xl mx-auto lg:px-8">
              <div className="flex items-center w-full justify-between py-5 px-4">
                <div className="flex px-2 lg:px-0">
                  <div className="flex-shrink-0 flex items-center cursor-pointer">
                    <Link href="/">
                      <div className="inline-flex items-center">
                        <Logo />
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="flex space-x-6 items-center">
                  {/* <Chains /> */}
                  <Account />
                </div>
              </div>
            </div>
          </header>
          <Component {...pageProps} />
          <ConnectModal />
        </div>
      </ConnectModalProvider>
    </Provider>
  )
}

export default MyApp
