import React, { useContext, useState } from 'react'
import Logo from './logo'

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { TransactionContext } from '../contexts/transactionContext';
import Image from 'next/image';

interface PageProps {
  message: string;
  desc: string;
  img: any;
}

const PageLoader = ({ message, desc, img }: PageProps) => {

  const { isLoading, setIsLoading } = useContext(TransactionContext);

  return (
    <Transition.Root show={isLoading} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto scrollbar-hide"
        onClose={() => { }}
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 text-center sm:block sm:p-0 text-white  bg-opacity-50 bg-black font-britanica">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0  bg-opacity-50 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={`inline-block align-bottom rounded-lg text-left transform transition-all sm:align-middle max-w-lg w-full bg-[#232529] `}
            >

              <div className="">
                <div className="mt-3 text-center sm:mt-5">
                  <div className='flex flex-col items-center justify-center p-8'>
                    <Image src={img} height={200} width={200} className="animate-pulse" />
                    <p className='text-3xl'>{message}</p>
                    {/* <p className='text-3xl'>Connecting to Wallet...</p> */}
                    {/* <p className='text-xl text-gray-400 pt-2'>Accept the prompt in your wallet to continue</p> */}
                    <p className='text-xl text-gray-400 pt-2'>{desc}</p>
                  </div>
                </div>
              </div>

            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default PageLoader