import { ArrowNarrowUpIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import React, { useCallback, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper";
import Logo from '../logo';
import Modal from '../Modal';
import VaultCard from '../VaultCard';

export interface VaultCardProps {
    name: string;
    valuations: string;
    uniqueOwners: number;
}



const MyInvestment: React.FC = () => {

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
        <div className='py-4 flex '>

            <div onClick={handlePrev} className='cursor-pointer  bg-gray-300 rounded-full p-2 absolute left-5 lg:left-10 xl:left-20 bottom-0'><ChevronLeftIcon className='text-white h-7 w-7' /></div>
            <Swiper
                ref={sliderRef}
                // grabCursor={true}
                slidesPerView={'auto'}
            
                scrollbar={true}
                spaceBetween={80}
                modules={[Keyboard, Scrollbar, Navigation, Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <VaultCard
                        name='Bored Ape <> RTFKT'
                        valuations={'600 ETH'}
                        uniqueOwners={4726}
                        theme="dark"
                        image="https://lh3.googleusercontent.com/b2fJSqKXfH9AJg63az3zmMUC6PMd_bmqnI5W-rtouKvZ03vBeiyayb3zqDq4t7PLt2HmNxcocUMjxb7V03Jy_mMZc_5wVDaxk_T5=w260"
                        
                        />
                </SwiperSlide> 
                <SwiperSlide>
                    <VaultCard
                        name='Bored Ape <> RTFKT'
                        theme="light"
                        valuations={'600 ETH'}
                        uniqueOwners={4726}
                        image="https://lh3.googleusercontent.com/b2fJSqKXfH9AJg63az3zmMUC6PMd_bmqnI5W-rtouKvZ03vBeiyayb3zqDq4t7PLt2HmNxcocUMjxb7V03Jy_mMZc_5wVDaxk_T5=w260"
                        
                        />
                </SwiperSlide> 
                {/* <SwiperSlide>
                    <VaultCard
                    name='Bored Ape <> RTFKT'
                    valuations={'600 ETH'}
                    uniqueOwners={4726}
                    image="https://lh3.googleusercontent.com/b2fJSqKXfH9AJg63az3zmMUC6PMd_bmqnI5W-rtouKvZ03vBeiyayb3zqDq4t7PLt2HmNxcocUMjxb7V03Jy_mMZc_5wVDaxk_T5=w260"

                    />
                </SwiperSlide> 
                <SwiperSlide>
                    <VaultCard
                        name='Bored Ape <> RTFKT'
                        valuations={'600 ETH'}
                        uniqueOwners={4726}
                        image="https://lh3.googleusercontent.com/b2fJSqKXfH9AJg63az3zmMUC6PMd_bmqnI5W-rtouKvZ03vBeiyayb3zqDq4t7PLt2HmNxcocUMjxb7V03Jy_mMZc_5wVDaxk_T5=w260"

                    />
                    </SwiperSlide> 
                <SwiperSlide>
                    <VaultCard
                        name='Bored Ape <> RTFKT'
                        valuations={'600 ETH'}
                        uniqueOwners={4726}
                        image="https://lh3.googleusercontent.com/b2fJSqKXfH9AJg63az3zmMUC6PMd_bmqnI5W-rtouKvZ03vBeiyayb3zqDq4t7PLt2HmNxcocUMjxb7V03Jy_mMZc_5wVDaxk_T5=w260"

                    />
                </SwiperSlide>  */}



            </Swiper>
            <div onClick={handleNext} className='cursor-pointer  bg-gray-300 rounded-full p-2 absolute right-5 lg:right-10 xl:right-20  bottom-0'><ChevronRightIcon className='text-white h-7 w-7' /></div>
        </div >
    )
}

export default MyInvestment;