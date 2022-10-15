import React, { useContext , useEffect} from 'react'

import type { LiFiWidget, useWidgetEvents } from '@lifi/widget';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Modal from './Modal';
import ConnectModalContext from '../contexts/connectwallet';
import { WidgetConfig } from '@lifi/widget';
import { useMemo } from 'react';
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { CgCloseR } from 'react-icons/cg';

const LiFiWidgetDynamic = dynamic(
    () => import('@lifi/widget').then((module) => module.LiFiWidget) as any,
    {
        ssr: false,
    },
) as typeof LiFiWidget;

const Loader = () => (

    <button className="flex flex-col min-h-[30rem] absolute inset-0 items-center rounded-lg font-semibold px-4 py-2 text-white w-full justify-center" disabled>
        <svg className="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="font-medium mt-2"> Please wait loading... </span>
    </button>

)

const LifiWidget: React.FC = () => {

    const { swapModal, setSwapModal } = useContext(ConnectModalContext);

    const widgetConfig: WidgetConfig = useMemo(() => ({
        appearance: 'dark',
        containerStyle: {
            border: `1px solid black`,
            borderRadius: '16px',
        },
        theme: {
            palette: {
                primary: { main: '#2BFFB1' },
                secondary: { main: '#2bd8ff' },
            },
            shape: {
                borderRadius: 0,
                borderRadiusSecondary: 0,
            },
            typography: {
                fontFamily: 'Montserrat',
            },
        },
        disableAppearance: true,
        toAddress: "0x560c7D1759b86E3EaD22dc2483AfC8cA67e1f3Ad",
        toChain: 1,
        toToken: "0x0000000000000000000000000000000000000000",
        variant: 'expandable',
    }), []);

    // const widgetEvents = useWidgetEvents();



    // useEffect(() => {
    //     const onRouteExecutionStarted = (route: Route) => {
    //         // console.log('onRouteExecutionStarted fired.');
    //     };
    //     const onRouteExecutionUpdated = (update: RouteExecutionUpdate) => {
    //         // console.log('onRouteExecutionUpdated fired.');
    //     };
    //     const onRouteExecutionCompleted = (route: Route) => {
    //         // console.log('onRouteExecutionCompleted fired.');
    //     };
    //     const onRouteExecutionFailed = (update: RouteExecutionUpdate) => {
    //         // console.log('onRouteExecutionFailed fired.');
    //     };
    //     widgetEvents.on(WidgetEvent.RouteExecutionStarted, onRouteExecutionStarted);
    //     widgetEvents.on(WidgetEvent.RouteExecutionUpdated, onRouteExecutionUpdated);
    //     widgetEvents.on(WidgetEvent.RouteExecutionCompleted, onRouteExecutionCompleted);
    //     widgetEvents.on(WidgetEvent.RouteExecutionFailed, onRouteExecutionFailed);


    //     return () => widgetEvents.all.clear();
    // }, [widgetEvents]);

    return (
        <Transition.Root show={swapModal} as={Fragment}>
            <Dialog
                as="div"
                className="fixed z-10 inset-0 overflow-y-auto scrollbar-hide "
                onClose={() => { }}
            >
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 text-white overflow-y-auto scrollbar-hide  bg-opacity-70 bg-[#000000]  font-britanica font-normal  ">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0  bg-opacity-70 transition-opacity" />
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
                        <Dialog.Panel
                            className={`inline-block align-bottom bg-[#232529] py-4 overflow-hidden rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-4xl w-full `}
                        >
                            <div className='w-full pt-4 bg-[#232529] flex justify-between px-8'>
                                {<Dialog.Title
                                    as="h3"
                                    className="text-2xl leading-6 font-bold "
                                >
                                    Mutltichain Swap
                                </Dialog.Title>}

                                <CgCloseR className='w-7 h-7 text-white cursor-pointer  hover:scale-125 ' onClick={() => setSwapModal(false)} />
                            </div>
                            <div className="px-8">
                                <div className='    '>
                                    <div className='relative '>
                                        <Loader />
                                    </div>
                                    <div className=' w-full min-h-[30rem] mt-4 font-montserrat z-50'>
                                        <LiFiWidgetDynamic
                                            config={widgetConfig}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default LifiWidget;
