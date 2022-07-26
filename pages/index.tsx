import React, { useContext, useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'

// import { useConnect } from 'wagmi'
import connectwallet from '../assets/vaultcreation.png'
import ConnectModalContext from '../contexts/connectwallet'
import { TransactionContext } from '../contexts/transactionContext'
import PageLoader from '../components/PageLoader'

import loader from '../assets/Vaultpage.png'
import tick from '../assets/Tick-Square.png'

const Home: NextPage = () => {

  const { setVisible } = useContext(ConnectModalContext)
  const { connectallet, currentAccount, setIsLoading } = useContext(TransactionContext)

  const [load, setLoad] = useState(false)

  const router = useRouter();


  useEffect(() => {
    if (currentAccount) {
      router.push({
        pathname: '/dashboard',
        query: { user: currentAccount },
      })
    }
  }, [currentAccount])

  return (
    <div className="flex   flex-col items-center justify-center py-2">
      <div className='text-white rounded-lg text-center  p-8 max-w-3xl'>
        <Image src={connectwallet} width={200} height={200} />
        <h1 className='text-4xl font-black mt-6 mb-2 font-britanica'>Wallet not connected</h1>
        <p className=' text-white text-opacity-60 text-lg mt-4'>Fractional ownership of the world's most sought after NFTs. Fractional reduces entry costs, increases access, and enables new communities.</p>
        <button className='py-3 mt-8 text-lg rounded-md bg-[#2BFFB1] text-black w-full max-w-xs' onClick={() => setVisible(true)}>
          Connect Wallet to Get Started
        </button>
      </div>
      <PageLoader img={loader} message='Connecting to wallet...' desc='Accept the prompt in your wallet to continue' />
      {/* {load && <PageLoader img={tick} message='Connecting Successfull' desc='Redirecting to your Fragments dashboard' />} */}
    </div>
  )
}

export default Home
