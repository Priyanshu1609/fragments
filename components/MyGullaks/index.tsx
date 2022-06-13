import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { TransactionContext } from '../../contexts/transactionContext';
import { DataContext } from '../../contexts/dataContext';
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
    const { currentAccount } = useContext(TransactionContext);
    const { vaults } = useContext(DataContext);

    const router = useRouter();

    const sliderRef = useRef() as any;

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);


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

                {vaults?.map((vault: any) => (
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
