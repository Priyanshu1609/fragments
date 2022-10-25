import Image from 'next/image'
import React, { useState, useContext } from 'react'
import { SelectProposalProps } from './SelectProposal'
import NFT from "../../assets/NFT.png";
import { ProposalStep, ProposalValues } from '../../pages/create-proposal';
import { requiredTag } from '../CreateDAOForm';
import Select from '../Select';
import info from "../../assets/info.png";
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/solid';
import { DataContext } from '../../contexts/dataContext';
import { ProposalContext } from '../../contexts/proposalContext';
import coins from "../../abis/coins.json";
import { customAlphabet } from 'nanoid'
import { useRouter } from 'next/router';
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10)


const SwapTokens: React.FC<SelectProposalProps> = ({
  setCurrentStep,
  handleBack
}) => {

  const { proposalData, setProposalData, handleChangePropsal, handleCreateProposal } = useContext(ProposalContext);

  const router = useRouter();
  const { vault } = router.query

  const [fromToken, setFromToken] = useState<string>("");
  const [toToken, setToToken] = useState<string>("");
  console.log({ toToken, fromToken });

  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    let id = nanoid()

    let data = {
      ...proposalData,
      fromToken,
      toToken
    }

    setProposalData(data);
    handleCreateProposal(data, id, vault);
  }

  return (
    <div className='pb-8 text-lg max-w-2xl mx-auto '>
      <div className='max-w-2xl mx-auto text-lg flex items-center justify-between h-28 p-6 bg-[url("/Button.png")]  bg-[#232529]    bg-cover overflow-hidden rounded-2xl '>

        <div className='text-white'>
          <h2 className=' text-2xl font-normal font-britanica '>Swap Tokens</h2>
          <p className='text-lg font-montserrat'>Swap tokens amongst the vault.</p>
        </div>
        <div className='mt-20'>
          <Image src={NFT} height={220} width={220} />
        </div>

      </div>
      <form onSubmit={onSubmitHandler}>
        <div className='flex mt-6 space-x-5'>
          <label className='flex-[0.7] relative'>
            <p className='text-xl mt-2 font-britanica font-normal'>Swap Tokens</p>
            <input required type='number' step="0" className='p-3 rounded-lg bg-transparent focus:outline-none border-[1px] border-gray-600 w-full' value={proposalData.fromToken} onChange={(e) => handleChangePropsal(e, "fromToken")} placeholder='21' />
          </label>
          <label className='flex-[0.3]'>
            <p className='text-xl mt-1 font-britanica font-normal'>Select Token</p>
            <Select
              options={coins}
              value={fromToken}
              onChange={(value) => setFromToken(value)}
              placeholder="Token"
            />
          </label>
        </div>
        <div className='flex mt-6 space-x-5 '>
          <label className='flex-[0.7] relative'>
            <p className='text-xl mt-2 font-britanica font-normal'>You will recieve</p>
            <input required type='number' step="0" className='p-3 rounded-lg bg-transparent focus:outline-none border-[1px] border-gray-600 w-full ' placeholder='21' value={proposalData.toToken} onChange={(e) => handleChangePropsal(e, "toToken")} />
          </label>
          <label className='flex-[0.3]'>
            <p className='text-xl mt-1 font-britanica font-normal'>Select Token</p>
            <Select
              options={coins}
              value={toToken}
              onChange={(value) => setToToken(value)}
              placeholder="Token"
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

export default SwapTokens