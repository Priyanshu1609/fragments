import React, { useContext, useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Amplify, { Auth } from "aws-amplify";


import { magic } from '../utils/magic';
// import { useConnect } from 'wagmi'
import connectwallet from '../assets/walletconnect.png'
import ConnectModalContext from '../contexts/connectwallet'
import { TransactionContext } from '../contexts/transactionContext'
import PageLoader from '../components/PageLoader'

import loader from '../assets/loader.json'
import success from '../assets/success.json'
import { parseCookies } from '../utils/cookie'
import Logo from '../components/logo'

const Home: NextPage = ({ data }: any) => {

  const { setVisible } = useContext(ConnectModalContext)
  const { connectallet, currentAccount, setIsLoading, isLoading, awsClient } = useContext(TransactionContext)
  const [connected, setConnected] = useState(false)
  const [user, setUser] = useState<any>();
  const [email, setEmail] = useState<any>(null);
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    if (!user) {
      setUser(data.user);
    }
  }, [data.user])

  const router = useRouter();
  // console.log("Data of the user", data?.user);

  async function handleLoginWithEmail(e) {
    e.preventDefault();
    try {
      setDisabled(true);

      if (email.length === 0) {
        alert("Please enter your email address");
        return;
      }

      // Prevent login state inconsistency between Magic and the client side
      await magic.user.logout();
      // Trigger Magic link to be sent to user
      await magic.auth.loginWithMagicLink({
        email,
        redirectURI: new URL("/callback", window.location.origin).href, // optional redirect back to your app after magic link is clicked
      });
    } catch (error) {
      console.log(error);
    } finally {
      setDisabled(false);
    }
  }

  useEffect(() => {
    // setUser({ loading: true });
    Auth.currentUserCredentials().catch((e) => {
      console.log("=== currentcredentials", { e });
    });
    Auth.currentAuthenticatedUser()
      .then((user) => {
        magic.user
          .isLoggedIn()
          .then((isLoggedIn) => {
            return isLoggedIn
              ? magic.user
                .getMetadata()
                .then((userData) =>
                  setUser({ ...userData, identityId: user.id })
                )
              : setUser({ user: null });
          })
          .catch((e) => {
            console.log("=== currentUser", { e });
          });
      })
      .catch((e) => {
        setUser({ user: null });
      });
  }, []);

  useEffect(() => {
    if (data.user) {
      setConnected(true);
      setTimeout(() => {
        router.push({
          pathname: '/dashboard',
          query: { user: currentAccount },
        })
      }, 3000);
    }
  }, [data.user])

  return (
    <div className="flex   flex-col items-center justify-center py-2 h-[80%] overflow-hidden">
      <div className='text-white rounded-lg text-center  p-8 max-w-3xl'>
        <Image src={connectwallet} width={180} height={200} />
        <form onSubmit={e => handleLoginWithEmail(e)} className='flex items-center justify-center w-full flex-col mt-6'>
          <Logo />
          <p className=' text-gray-300 font-semnibold mt-4'>Create a new account or login into a existing one.</p>
          <input required type='email' maxLength={50} className='mt-8 text-md p-3 rounded-lg  bg-transparent focus:outline-none border-[1px] border-gray-600 w-80 placeholder:text-gray-500' placeholder='Enter Your Email Address' value={email} onChange={e => setEmail(e.target.value)} />
          <button type='submit' disabled={disabled} className='py-3 disabled:opacity-50 mt-6 w-80 text-md rounded-md !bg-[#2BFFB1] text-black font-semibold max-w-xs'>
            Connect
          </button>
        </form>
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