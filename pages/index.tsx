import React, { useContext, useEffect, useState } from 'react'
import type { NextPage } from 'next'
// import { useSession, signIn, signOut } from "next-auth/react"
import Image from 'next/image'
import { useRouter } from 'next/router'

// import { useConnect } from 'wagmi'
import connectwallet from '../assets/vaultcreation.png'
import ConnectModalContext from '../contexts/connectwallet'
import { TransactionContext } from '../contexts/transactionContext'
import PageLoader from '../components/PageLoader'

import loader from '../assets/loader.json'
import success from '../assets/success.json'
import { parseCookies } from '../utils/cookie'

import { useSession, getProviders, signOut, signIn, ClientSafeProvider, LiteralUnion } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';

const Home: NextPage = ({ data }: any) => {

  const { data: session, status } = useSession();



  const { setVisible } = useContext(ConnectModalContext)
  const { connectallet, currentAccount, setIsLoading, isLoading, awsClient } = useContext(TransactionContext)
  const [connected, setConnected] = useState(false)
  const [user, setUser] = useState(null);
  // useEffect(() => {
  //   if (!user) {
  //     setUser(data.user);
  //   }
  // }, [data.user])

  const router = useRouter();
  // console.log("Data of the user", data?.user);

  // useEffect(() => {
  //   if (data.user) {
  //     setConnected(true);
  //     setTimeout(() => {
  //       router.push({
  //         pathname: '/dashboard',
  //         query: { user: currentAccount },
  //       })
  //     }, 3000);
  //   }
  // }, [data.user])

  // useEffect(() => {
  //   if (session) {
  //     alert("Signed in")
  //     setTimeout(() => {
  //       router.push({
  //         pathname: '/dashboard',
  //         query: { user: currentAccount },
  //       })
  //     }, 3000);
  //   }
  // }, [])

  const [providers, setproviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>();

  useEffect(() => {
    const setTheProviders = async () => {
      const setupProviders = await getProviders();
      setproviders(setupProviders);
    };
    setTheProviders();
  }, []);


  const Temp = () => {
    if (status === 'loading') {
      return <h1>Loading...</h1>;
    }
    if (session) {
      return (
        <>
          Signed in as {session.user?.email} <br />
          <button type="button" onClick={() => signOut()}>
            Sign out
          </button>
        </>
      );
    }
    return (
      <>
        {/* <button type="button" onClick={() => signIn()}>
          Sign in
        </button> */}
        {providers?.cognito && (
          <>
            <button type="button" onClick={() => signIn(providers.cognito.id)}>
              Email Login
            </button>
          </>
        )}
        {providers?.github && (
          <>
            <br />
            <br />
            <button type="button" onClick={() => signIn(providers.github.id)}>
              Github Login Sis
            </button>
          </>
        )}
      </>
    )
  }


  return (
    <div className="flex   flex-col items-center justify-center py-2 h-[80%] overflow-hidden">
      <div className='text-white rounded-lg text-center  p-8 max-w-3xl'>
        <Image src={connectwallet} width={200} height={200} />

        <h1 className='text-4xl mt-6 mb-2  font-britanica font-normal '>Wallet not connected</h1>
        <p className=' text-white text-opacity-60 text-lg mt-4'>Fractional ownership of the world's most sought after NFTs. Fractional reduces entry costs, increases access, and enables new communities.</p>
        <button className='py-3 mt-8 text-lg rounded-md bg-[#2BFFB1] text-black font-semibold w-full max-w-xs'>
          <Temp />
        </button>
        {/* <button className='py-3 mt-8 text-lg rounded-md bg-[#2BFFB1] text-black font-semibold w-full max-w-xs' onClick={() => setVisible(true)}>
          Connect Wallet to Get Started
        </button> */}
      </div>
      <PageLoader bg={false} open={isLoading} onClose={() => setIsLoading(false)} img={loader} message='Connecting to wallet...' desc='Accept the prompt in your wallet to continue' />
      <PageLoader bg={false} open={connected} onClose={() => setConnected(false)} img={success} message='Connection Successfull!' desc="Redirecting to Fragment's dashboard " />
    </div>
  )
}

export default Home

export async function getServerSideProps({ req, res }: any) {

  const data = parseCookies(req)

  if (res) {
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      res.writeHead(301, { Location: "/" })
      res.end()
    }
  }

  return { props: { data } }
}