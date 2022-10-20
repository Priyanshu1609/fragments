import Image from 'next/image'
import React, { useState } from 'react'
import { SelectProposalProps } from './SelectProposal'
import NFT from "../../assets/NFT.png";
import { ProposalStep } from '../../pages/create-proposal';
import { requiredTag } from '../CreateDAOForm';
import Select from '../Select';
import info from "../../assets/info.png";
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/solid';

type Props = {}

const option = [
  {
    "chainId": 'opensea',
    "name": "Opensea",
    "icon": "",
    // "address": "",
  },
]
const Liquidatation: React.FC<SelectProposalProps> = ({
    setCurrentStep,
    handleBack
}) => {


  const [inputType, setInputType] = useState<any>({
    "chainId": 'opensea',
    "name": "Opensea",
    "icon": "",
    // "address": "",
  })

  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    alert("Done")
    // if (!name.length || !description.length || !tokenSupply || managementFee >= 100 || managementFee < 0 || tokenName.length !== 4) {
    //     console.log('Error in values, Please input again')
    //     return;
    // }

    // setCurrentStep(ProposalStep.)
  }

  return (
    <div className='pb-8 text-lg max-w-2xl mx-auto '>
      <div className='max-w-2xl mx-auto text-lg flex items-center justify-between h-28 p-6 bg-[url("/Button.png")]  bg-[#232529]    bg-cover overflow-hidden rounded-2xl '>

        <div className='text-white'>
          <h2 className=' text-2xl font-normal font-britanica '>Liquidate</h2>
          <p className='text-lg font-montserrat'>Liquidate amongst all members</p>
        </div>
        <div className='mt-20'>
          <Image src={NFT} height={220} width={220} />
        </div>

      </div>
      <form onSubmit={onSubmitHandler}>

        <div className='flex mt-6 space-x-5'>
          <label className='flex-[1]'>
            <p className='text-xl mt-1 font-britanica font-normal'>Choose final token to liquidate to investors of the vault?</p>
            <Select
              options={option}
              value={inputType}
              onChange={(value) => setInputType(value)}
              placeholder="Days"
            />
          </label>
        </div>

        <div className='flex flex-col space-y-4 my-8'>
          <label className='relative '>
            <div className='text-xl flex items-center '>
              <div className='flex flex-col'>
                <p className='mr-1 font-britanica font-normal'>Listing Expiry Time</p>
                <p className='mr-1 font-montserrat text-gray-300  text-base font-normal'>When will the listing expire ?</p>
              </div>
              {/* <div className='group'>
                <Image src={info} className="cursor-pointer " height={30} width={30} />
                <div className='text-gray-400  group-hover:flex hidden absolute right-0 top-0 bg-input rounded-lg px-2 py-1 font-montserrat text-sm w-[34rem]'>The token-based quorum is among the most basic DAO voting mechanisms. For a proposal to pass, a certain number of DAO members must participate in the voting process.</div>
              </div> */}
            </div>

            <input required type='datetime-local' style={{ colorScheme: 'dark' }} className='p-3  rounded-lg bg-transparent focus:outline-none border-[1px] border-gray-600 w-full mt-2' placeholder='21/08/2022 ; 08:46 HRS GMT' />

          </label>
        </div>
        <div className='flex justify-between'>
          <button onClick={handleBack} className='w-44 px-3 py-2 rounded-lg font-semibold bg-[#232529]  text-white flex items-center justify-center space-x-4'>
            <ArrowLeftIcon className='w-4' />
            <span>Back</span>
          </button>
          <button type='submit' className='w-44 px-3 py-2 rounded-lg font-semibold !bg-button  text-black flex items-center justify-center space-x-4'>
            <span>Start Proposal</span>
            <ArrowRightIcon className='w-4' />
          </button>
        </div>
      </form>
    </div>
  )
}

export default Liquidatation