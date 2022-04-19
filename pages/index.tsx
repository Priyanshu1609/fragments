import type { NextPage } from 'next'
import Image from 'next/image'
import { useConnect } from 'wagmi'
import connectwallet from '../assets/connectwallet.png'
import React, { useContext, useEffect } from 'react'
import ConnectModalContext from '../contexts/connectwallet'
import { useRouter } from 'next/router'

const Home: NextPage = () => {

  const { setVisible } = useContext(ConnectModalContext)

  const [{ data: connectData }] = useConnect()

  const router = useRouter();

  useEffect(() => {
    if(connectData.connected) {
      console.log('called')
      router.push('/dashboard')
    }
  }, [connectData.connected])

  return (
    <div className="flex min-h-screen bg-black flex-col items-center justify-center py-2">
      <div className='text-white border border-white border-solid border-opacity-10 rounded-lg text-center font-sora p-8 bg-[#0F0F10] w-[330px]'>
        <Image src={connectwallet} />
        <h1 className='text-2xl mt-6 mb-2'>Wallet not connected</h1>
        <p className='text-sm text-white text-opacity-60'>Lorem ipsum dolor sit amet, ectetur adipiscing elita dipiscing elit.</p>
        <button className='py-3 mt-6 rounded-md bg-white text-black w-full' onClick={() => setVisible(true)}>
          Connect Wallet
        </button>
      </div>
    </div>
  )
}

export default Home
