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



const MyInvestment= () => {

    const sliderRef = useRef();

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);



    return (
        <div className='h-[30rem]'>
            <div className='py-4 flex relative '>
                <div onClick={handlePrev} className='cursor-pointer  bg-gray-300 rounded-full p-2 absolute -left-7 top-60'><ChevronLeftIcon className='text-white h-7 w-7' /></div>
                <Swiper
                    ref={sliderRef}
                    // grabCursor={true}
                    slidesPerView={'auto'}

                    scrollbar={true}
                    spaceBetween={80}
                    modules={[Keyboard, Scrollbar, Navigation, Pagination]}
                    className="mySwiper"
                >

                </Swiper>
                <div onClick={handleNext} className='cursor-pointer  bg-gray-300 rounded-full p-2 absolute -right-0  top-60 z-10'><ChevronRightIcon className='text-white h-7 w-7' /></div>
            </div >
        </div>
    )
}

export default MyInvestment;