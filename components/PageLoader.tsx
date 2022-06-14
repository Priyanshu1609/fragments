import React, { useContext, useState } from 'react'
import Logo from './logo'

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { TransactionContext } from '../contexts/transactionContext';

const PageLoader = () => {

  const { isLoading, setIsLoading } = useContext(TransactionContext);

  return (
    <Transition.Root show={isLoading} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto scrollbar-hide"
        onClose={() => { }}
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 text-center sm:block sm:p-0 text-white  bg-opacity-50 bg-black">
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
              className={`inline-block align-bottom pb-4 rounded-lg text-left transform transition-all sm:my-8 sm:align-middle max-w-lg w-full `}
            >

              <div className="">
                <div className="mt-3 text-center sm:mt-5">
                  <div className="mt-2">
                    <div className='flex flex-col items-center justify-center p-16'>
                      <div className="border-t-transparent w-16 h-16 border-4 border-white border-solid rounded-full animate-spin mb-4"></div>
                      <Logo />
                    </div>
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