import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import React, { useCallback, useRef } from 'react';

import { TransactionContext } from '../../contexts/transactionContext';

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper";
import VaultCard from '../VaultCard';

const MyInvestment: React.FC = () => {
    const { currentAccount } = React.useContext(TransactionContext);
    const router = useRouter()

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
        <div className='py-4 flex'>
            <div onClick={handlePrev} className='cursor-pointer  bg-gray-300 rounded-full p-2 absolute md:left-5 lg:left-10 xl:left-20 bottom-0'><ChevronLeftIcon className='text-white h-7 w-7' /></div>
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
                <SwiperSlide>
                    <div className='cursor-pointer' onClick={() =>
                        router.push({
                            pathname: '/vaults/0x67407721B109232BfF825F186c8066045cFefe7F',
                            query: { user: currentAccount },
                        })}>
                        <VaultCard
                            name='Priyanshu panda'
                            valuations={'600 ETH'}
                            uniqueOwners={4726}
                            theme="dark"
                            image="https://lh3.googleusercontent.com/b2fJSqKXfH9AJg63az3zmMUC6PMd_bmqnI5W-rtouKvZ03vBeiyayb3zqDq4t7PLt2HmNxcocUMjxb7V03Jy_mMZc_5wVDaxk_T5=w260"
                        />

                    </div>
                </SwiperSlide>
                <div>

                    <SwiperSlide>
                        <VaultCard
                            theme="light"
                            name='Priyanshu panda'
                            valuations={'600 ETH'}
                            uniqueOwners={4726}
                            image="https://lh3.googleusercontent.com/b2fJSqKXfH9AJg63az3zmMUC6PMd_bmqnI5W-rtouKvZ03vBeiyayb3zqDq4t7PLt2HmNxcocUMjxb7V03Jy_mMZc_5wVDaxk_T5=w260"
                        />

                    </SwiperSlide>
                </div>
                <div>

                    <SwiperSlide>
                        <VaultCard
                            name='Priyanshu panda'
                            valuations={'600 ETH'}
                            uniqueOwners={4726}
                            image="https://lh3.googleusercontent.com/b2fJSqKXfH9AJg63az3zmMUC6PMd_bmqnI5W-rtouKvZ03vBeiyayb3zqDq4t7PLt2HmNxcocUMjxb7V03Jy_mMZc_5wVDaxk_T5=w260"
                        />

                    </SwiperSlide>
                </div>
                <div>

                    <SwiperSlide>
                        <VaultCard
                            name='Priyanshu panda'
                            valuations={'600 ETH'}
                            uniqueOwners={4726}
                            image="https://lh3.googleusercontent.com/b2fJSqKXfH9AJg63az3zmMUC6PMd_bmqnI5W-rtouKvZ03vBeiyayb3zqDq4t7PLt2HmNxcocUMjxb7V03Jy_mMZc_5wVDaxk_T5=w260"
                        />

                    </SwiperSlide>
                </div>
                <div>

                    <SwiperSlide>
                        <VaultCard
                            name='Priyanshu panda'
                            valuations={'600 ETH'}
                            uniqueOwners={4726}
                            image="https://lh3.googleusercontent.com/b2fJSqKXfH9AJg63az3zmMUC6PMd_bmqnI5W-rtouKvZ03vBeiyayb3zqDq4t7PLt2HmNxcocUMjxb7V03Jy_mMZc_5wVDaxk_T5=w260"
                        />

                    </SwiperSlide>
                </div>
                <div>

                    <SwiperSlide>
                        <VaultCard
                            name='Priyanshu panda'
                            valuations={'600 ETH'}
                            uniqueOwners={4726}
                            image="https://lh3.googleusercontent.com/b2fJSqKXfH9AJg63az3zmMUC6PMd_bmqnI5W-rtouKvZ03vBeiyayb3zqDq4t7PLt2HmNxcocUMjxb7V03Jy_mMZc_5wVDaxk_T5=w260"
                        />

                    </SwiperSlide>
                </div>


            </Swiper>
            <div onClick={handleNext} className='cursor-pointer  bg-gray-300 rounded-full p-2 absolute md:right-5 lg:right-10 xl:right-20 right-20 bottom-0'><ChevronRightIcon className='text-white h-7 w-7' /></div>

        </div >
    )
}

export default MyInvestment;
