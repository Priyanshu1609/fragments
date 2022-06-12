import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { TransactionContext } from '../../contexts/transactionContext';

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

    const [vaults, setVaults] = useState<string[]>()

    const getVaults = async () => {

        const data = JSON.stringify({
            "walletAddress": "0x6d4b5acFB1C08127e8553CC41A9aC8F06610eFc7"
        });
        const response = await axios.post(`https://szsznuh64j.execute-api.ap-south-1.amazonaws.com/dev/api/associations/get`, data, {
            headers: {
                'content-Type': 'application/json',
            },
        }
        );

        let arr: any[] = [];
        response.data.Items.forEach((el: any) => {
            arr.push(Object.values(el.vaultAddress)[0])
        });

        var unique = arr.filter((v, i, a) => a.indexOf(v) === i);

        console.log(unique);
        setVaults(unique);

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
        getVaults();
    }, [])


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

                {vaults?.map(vault => (
                    <SwiperSlide>
                        <div className='cursor-pointer' onClick={() =>
                            router.push({
                                pathname: `/vaults/${vault}`,
                                query: { user: currentAccount },
                            })}>
                            <VaultCard
                                name={vault}
                                valuations={'600 ETH'}
                                uniqueOwners={4726}
                                theme="dark"
                                image="https://lh3.googleusercontent.com/b2fJSqKXfH9AJg63az3zmMUC6PMd_bmqnI5W-rtouKvZ03vBeiyayb3zqDq4t7PLt2HmNxcocUMjxb7V03Jy_mMZc_5wVDaxk_T5=w260"
                            />

                        </div>
                    </SwiperSlide>
                ))}

            </Swiper>
            <div onClick={handleNext} className='cursor-pointer  bg-gray-300 rounded-full p-2 absolute md:right-5 lg:right-10 xl:right-20 right-20 bottom-0'><ChevronRightIcon className='text-white h-7 w-7' /></div>

        </div >
    )
}

export default MyInvestment;
