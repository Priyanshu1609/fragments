import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { TransactionContext } from '../../contexts/transactionContext';
import logoWhite from '../../assets/LogoWhite.png'

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper";
import VaultCard from '../VaultCard';
import axios from 'axios';

const MyInvestment: React.FC = () => {
    const { currentAccount } = React.useContext(TransactionContext);
    const router = useRouter();

    const [vaults, setVaults] = useState<object[]>()

    const getVaults = async () => {

        const data = JSON.stringify({
            "walletAddress": currentAccount
        });
        const response = await axios.post(`https://szsznuh64j.execute-api.ap-south-1.amazonaws.com/dev/api/associations/get`, data, {
            headers: {
                'content-Type': 'application/json',
            },
        }
        );



        console.log(response)

        response.data.Items.forEach((element: any) => {
            console.log(element);
            let d: object = {}
            for (let i in element) {
                console.log(i, Object.values(element[i])[0])
                d[i] = Object.values(element[i])[0]
            }

            setVaults([...vaults ?? [], d]);
        });

    }

    console.log('Vaults', vaults)

    const sliderRef = useRef() as any;

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);

    useEffect(() => {
        setVaults([])
        getVaults();
    }, [])


    return (
        <div className='py-4 flex relative'>
            <div onClick={handlePrev} className='cursor-pointer  bg-gray-300 rounded-full p-2 absolute -left-7 top-60'><ChevronLeftIcon className='text-white h-7 w-7' /></div>
            <Swiper
                ref={sliderRef}
                // grabCursor={true}
                slidesPerView={'auto'}
                spaceBetween={80}
                scrollbar={true}
                modules={[Keyboard, Scrollbar, Navigation, Pagination]}
                className="mySwiper"
            >
                {/* <SwiperSlide>
                    <div onClick={() =>
                        router.push({
                            pathname: '/create-gullak',
                            query: { user: currentAccount },
                        })
                    } className='rounded-lg cursor-pointer bg-[#0F0F13] w-[250px] mx-auto'>
                        <div className='flex items-center justify-center h-[250px]'>
                            <PlusIcon className='w-[100px] text-white opacity-70' />
                        </div>
                        <div className='text-center px-2 py-4'>
                            <h2 className='text-2xl font-semibold'>Create Vault!</h2>
                            <p className='text-[#70707C] text-base font-normal'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. At tristique gravida.</p>
                        </div>
                    </div>
                </SwiperSlide> */}

                {vaults?.map(vault => (
                    <SwiperSlide>
                        <div className='cursor-pointer' onClick={() =>
                            router.push({
                                pathname: `/vaults/${vault?.vaultAddress}`,
                                query: { user: currentAccount },
                            })}>
                            <VaultCard
                                name={vault?.vaultName}
                                address={vault?.vaultAddress}
                                valuations={vault?.target}
                                uniqueOwners={1}
                                status={vault?.vaultStatus}
                                amount={vault?.amountPledged}
                                timestamp={vault?.timestamp}
                                image="https://lh3.googleusercontent.com/b2fJSqKXfH9AJg63az3zmMUC6PMd_bmqnI5W-rtouKvZ03vBeiyayb3zqDq4t7PLt2HmNxcocUMjxb7V03Jy_mMZc_5wVDaxk_T5=w260"
                            />

                        </div>
                    </SwiperSlide>
                ))}

            </Swiper>
            <div onClick={handleNext} className='cursor-pointer  bg-gray-300 rounded-full p-2 absolute -right-0  top-60 z-10'><ChevronRightIcon className='text-white h-7 w-7' /></div>

        </div >
    )
}

export default MyInvestment;
