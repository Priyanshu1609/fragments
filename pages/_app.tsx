import type { AppProps } from 'next/app'

import Head from 'next/head'
import Link from 'next/link'


import { ConnectModalProvider } from '../contexts/connectwallet'
import { SocketProvider } from '../contexts/socketContext'
import { OpenseaContextProvider } from '../contexts/opensesContext'
import { NftContextProvider } from '../contexts/NftContext'
import { TransactionProvider } from '../contexts/transactionContext'

import Logo from '../components/logo'
import ConnectModal from '../components/ConnectModal'
import Account from '../components/Account'
import CreateDAOButton from '../components/CreateDAOButton'
import '../styles/globals.css'

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
    <TransactionProvider>
        <ConnectModalProvider>
          <NftContextProvider>
            <OpenseaContextProvider>
              <SocketProvider>
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
                <div className='min-h-screen bg-black font-sora'>
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
                          <CreateDAOButton />
                          <Account />
                        </div>
                      </div>
                    </div>
                  </header>
                  <Component {...pageProps} />
                  <ConnectModal />
                </div>
              </SocketProvider>
            </OpenseaContextProvider>
          </NftContextProvider>
        </ConnectModalProvider>
    </TransactionProvider>
  )
}

export default MyApp
