import Image from 'next/image';
import React, { useContext, useState } from 'react'
import { DataContext } from '../../contexts/dataContext';
import { requiredTag } from '../CreateDAOForm';
import info from "../../assets/info.png";
import Select from '../Select';
import { ArrowLeftIcon, ArrowRightIcon, PlusIcon, XIcon } from '@heroicons/react/solid';
import governance from '../../assets/governance.png';
import { CreateVaultStep } from '../CreateVaultForm';
const option = [
    {
        "chainId": 'days',
        "name": "Days",
        "icon": "",
        // "address": "",
    },
    {
        "chainId": 'hours',
        "name": "Hours",
        "icon": "",
        // "address": "",
    },
]

const Commitee = ({ setCurrentStep, handleBack }: any) => {

    const { formData, setFormData, handleChange, defaultFormData } = useContext(DataContext);
    const [commiteeAddresses, setCommiteeAddresses] = useState("")
    const [links, setLinks] = useState([
        {
            type: "text",
            id: 1,
            value: "",
            vis: false,
        }
    ]);


    const [inputType, setInputType] = useState<any>({
        "chainId": 'days',
        "name": "Days",
        "icon": "",
        // "address": "",
    })

    const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        // if (!name.length || !description.length || !tokenSupply || managementFee >= 100 || managementFee < 0 || tokenName.length !== 4) {
        //     console.log('Error in values, Please input again')
        //     return;
        // }
        let array = [] as any;
        links.forEach(link => {
            array.push(link.value)
        });

        setFormData({
            ...formData,
            commiteeMembers: array,
        })

        console.log({ array })

        setCurrentStep(CreateVaultStep.Fundraise)
    }

    const addInput = () => {
        setLinks((s: any) => {
            return [
                ...s,
                {
                    type: "text",
                    value: "",
                    vis: false,
                }
            ];
        });
    };

    const handleLinksChange = (e: any) => {
        e.preventDefault();

        const index = e.target.id;
        setLinks(s => {
            const newArr = s.slice();
            newArr[index].value = e.target.value;

            return newArr;
        });
    };

    const handleRemove = (i: any) => {
        if (links.length === 1) {
            return;
        }
        // if (orders[i]) {
        //     console.log('Deleting value');
        //     setTarget(target - bnToString(orders[i]?.currentPrice));
        //     if (duration === (orders[i].expirationTime)) {
        //         orders.splice(i, 1);
        //         let a = Number.MAX_SAFE_INTEGER;
        //         orders.forEach((element: any) => {
        //             a = (Math.min(a, element.expirationTime))
        //         });
        //         setDuration(a);
        //     }
        // }
        setLinks((products) => products.filter((_, index) => index !== i));
    }

    return (
        <div className='max-w-2xl mx-auto text-lg'>
            <div className='flex items-center justify-between h-28 p-6 bg-[url("/Button.png")] bg-[#232529] bg-cover overflow-hidden rounded-2xl'>
                <div className='text-white'>
                    <h2 className=' text-3xl font-semibold'>Define Governance Parameters </h2>
                    <p className='font-montserrat text-base'>Carefully define these parameters for the decision framework of the vault.</p>
                </div>
                <div className='-mr-[5rem] mt-8'>
                    <Image src={governance} height={160} width={200} />
                </div>
            </div>
            <div className='mt-10'>
                <form onSubmit={onSubmitHandler}>
                    <div className='flex flex-col'>
                        <p className='font-britanica font-normal'>Voting Period{requiredTag}</p>
                        <p className='mt-0 text-lg text-gray-300'>How long will the voting happen on the proposals?</p>
                    </div>
                    <div className='flex mt-4 space-x-10'>
                        <label className='flex-[0.3]'>
                            <p className='text-xl mt-1 font-britanica font-normal'>Choose Timeframe</p>
                            <Select
                                options={option}
                                value={inputType}
                                onChange={(value) => setInputType(value)}
                                placeholder="Days"
                            />
                        </label>
                        <label className='flex-[0.7] relative'>
                            <p className='text-xl mt-2 font-britanica font-normal'>How many {inputType?.name}?</p>

                            <input required type='number' step="0" min={1} max={inputType.name === "Days" ? 7 : 24} className='p-3 rounded-lg bg-transparent focus:outline-none border-[1px] border-gray-600 w-full ' placeholder='Enter Voting Period' value={formData.votingPeriod} onChange={(e) => handleChange(e, 'votingPeriod')} />
                        </label>
                    </div>
                    <div className='rounded-lg bg-[#3D3112] text-base text-yellow-400 px-2 py-1 text-center mt-2'>
                        <p>
                            Note: The vault will be controlled by the validator addresses that you add below. 
                        </p>
                        <p className=''>
                            We urge you to only add members you trust and know personally. Be very careful and double check these addresses.
                        </p>
                    </div>
                    <div className='flex flex-col space-t-4 my-6'>

                        <div className=''>
                            <div className='flex'>
                                <p className='mr-1 font-britanica font-normal'>Add Committee Wallet Addresses</p>
                                <Image src={info} className="cursor-pointer " height={30} width={30} />
                            </div>
                            {links.map((item, i) => {
                                return (
                                    <div key={i} className='flex justify-between mb-4'>
                                        <label className='relative flex-grow'>
                                            <div className='text-xl flex items-center '>
                                                <div className='group'>
                                                    <div className='text-gray-400  group-hover:flex hidden absolute right-0 top-0 bg-input rounded-lg px-2 py-1 font-montserrat text-sm w-[34rem]'>The token-based quorum is among the most basic DAO voting mechanisms. For a proposal to pass, a certain number of DAO members must participate in the voting process.</div>
                                                </div>
                                            </div>

                                            <input
                                                required step="0"
                                                min={1}
                                                max={99}
                                                className='p-3  rounded-l-lg bg-transparent focus:outline-none border-[1px] border-gray-600 w-full mt-2'
                                                placeholder='0x879873988938490293092, 0x879873988938490293092, 0x879873988938490293092'
                                                onChange={handleLinksChange}
                                                value={item.value}
                                                id={i.toString()}
                                                type={item.type}
                                            />

                                        </label>
                                        <button onClick={e => handleRemove(i)} className='w-10 mt-2 underline text-sm rounded-r-lg text-red-500 flex justify-center items-center bg-input focus:outline-none border-[1px] border-gray-600 '>
                                            <XIcon className='h-8 w-8 mx-3' />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                        <div onClick={addInput} className='p-3  rounded-l-lg bg-input focus:outline-none w-full cursor-pointer'>
                            <p className='text-center flex items-center justify-center'>Add New Address <PlusIcon className='h-5 w-5 mx-3' /> </p>
                        </div>
                        <label className='relative mt-4'>
                            <div className='text-xl flex items-center '>
                                <p className='mr-1 font-britanica font-normal'>Min. Number of Approvals on Transactions*</p>
                                <div className='group'>
                                    <Image src={info} className="cursor-pointer " height={30} width={30} />
                                    <div className='text-gray-400  group-hover:flex hidden absolute right-0 top-0 bg-input rounded-lg px-2 py-1 font-montserrat text-sm w-[26rem]'>The token-based quorum is among the most basic DAO voting mechanisms. For a proposal to pass, a certain number of DAO members must participate in the voting process.</div>
                                </div>
                            </div>

                            <input required type='number' step="0" min={1} max={100} className='p-3  rounded-lg bg-transparent focus:outline-none border-[1px] border-gray-600 w-full mt-2' placeholder='Enter min. percentage of votes required in favor' value={formData.minApproval} onChange={(e) => handleChange(e, 'minApproval')} />

                        </label>
                    </div>
                    <div className='flex justify-between'>
                        <button onClick={handleBack} className='w-44 px-3 py-2 rounded-lg font-semibold bg-[#232529]  text-white flex items-center justify-center space-x-4'>
                            <ArrowLeftIcon className='w-4' />
                            <span>Back</span>
                        </button>
                        <button type='submit' className='w-44 px-3 py-2 rounded-lg font-semibold !bg-button  text-black flex items-center justify-center space-x-4'>
                            <span>Next Step</span>
                            <ArrowRightIcon className='w-4' />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Commitee