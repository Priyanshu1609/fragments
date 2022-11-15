import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { TiTick } from 'react-icons/ti'
import governance from '../../assets/governance.png'
import { ProposalStep, ProposalValues } from '../../pages/create-proposal'
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'
import { toast } from 'react-toastify'
import { ProposalContext } from '../../contexts/proposalContext'

export interface SelectProposalProps {
  setCurrentStep: (values: ProposalStep) => void
  handleBack: () => void
}

const SelectProposal: React.FC<SelectProposalProps> = ({
  setCurrentStep,
  handleBack,
}) => {
  const [type, setType] = useState<any>(null)
  const { proposalData, setProposalData, handleChangePropsal, getVaultData } =
    useContext(ProposalContext)

  const onSubmitHandler = (e: any) => {
    e.preventDefault()

    if (!type) {
      toast.info('Please select a proposal type')
      return
    }
    setProposalData((prevState: ProposalValues) => ({
      ...prevState,
      origin: type,
    }))

    if (type === ProposalStep.SwapTokens || type === ProposalStep.Liquidation) {
      setCurrentStep(type)
    } else {
      setCurrentStep(ProposalStep.SelectNFT)
    }
  }
  const Options = ({ title, desc, option, open }: any) => (
    <div
      className={`inline-flex  rounded-lg ${
        type === option
          ? `bg-gradient-to-tr from-[#2bffb1] to-[#2bd8ff] text-white`
          : 'bg-gray-600'
      }`}
      onClick={() => setType(option)}
    >
      <div className="radio m-[0.05rem] flex w-full  cursor-pointer rounded-lg bg-input p-4">
        <div>
          <div className="flex items-center justify-between">
            <p className="mb-1 text-xl font-semibold">{title}</p>
            {open && (
              <div className="rounded-md bg-[#343941] px-2 text-sm text-button">
                Coming Soon
              </div>
            )}
          </div>
          <p className="mt-2 text-base text-[#E6E6E6]">{desc}</p>
        </div>
        <div
          className={` ${
            type === option
              ? 'bg-gradient-to-tr from-[#2bffb1] to-[#2bd8ff] text-white'
              : 'bg-white'
          } mx-2 mt-2 mb-auto h-4 w-4 rounded-full`}
        >
          <TiTick
            className={`h-4 w-4 ${
              type === option ? 'text-black' : 'text-white'
            }`}
          />
        </div>
      </div>
    </div>
  )

  return (
    <div className="mx-auto max-w-2xl text-lg">
      <div className='flex h-28 items-center justify-between overflow-hidden rounded-2xl  bg-[#232529]    bg-[url("/Button.png")] bg-cover p-6'>
        <div className="text-white">
          <h2 className="font-britanica text-2xl font-normal">
            Select a New Proposal
          </h2>
          <p className="font-montserrat text-base">
            Choose a Proposal type to continue
          </p>
        </div>
        <div className="-mr-[4.4rem] mt-4">
          <Image src={governance} height={160} width={160} />
        </div>
      </div>

      <p className="mb-1 mt-4 font-bold">NFT Proposals</p>
      <div className="grid grid-cols-2 gap-5">
        <Options
          title="List NFT for Sale"
          desc="This is an onchain sale. With this proposal you can list your vault’s NFT for sale on OpenSea/Rarible or our platform."
          option={ProposalStep.ListNFT}
          open={false}
        />
        <Options
          title="Edit NFT for Sale"
          desc="Listing price went down? We got you covered. Propose to change the listing price of your vault’s NFT. Propose to change the listing price of your"
          option={ProposalStep.EditNFT}
          open={false}
        />
        <Options
          title="Transfer NFT"
          desc="This is an onchain sale. With this proposal you can list your vault’s NFT for sale on OpenSea/Rarible or our platform."
          option={ProposalStep.TransferNFT}
          open={false}
        />
        <Options
          title="Cancel Order"
          desc="Listing price went down? We got you covered. Propose to change the listing price of your vault’s NFT. Propose to change the listing price of your"
          option={ProposalStep.CancelNFT}
          open={false}
        />
      </div>
      <p className="mb-1 mt-4 font-bold">Administrative Proposals</p>
      <div className="grid grid-cols-2 gap-5">
        <Options
          title="Swap Tokens"
          desc="This is an onchain sale. With this proposal you can list your vault’s NFT for sale on OpenSea/Rarible or our platform."
          option={ProposalStep.SwapTokens}
          open={false}
        />
        <Options
          title="Liquidate Tokens"
          desc="Listing price went down? We got you covered. Propose to change the listing price of your vault’s NFT. Propose to change the listing price of your."
          option={ProposalStep.Liquidation}
          open={false}
        />
      </div>

      <div className="mt-20 flex justify-between">
        <button
          onClick={handleBack}
          className="flex w-44 items-center justify-center space-x-4 rounded-lg  bg-[#232529] px-3 py-2 font-semibold text-white"
        >
          <MdArrowBackIosNew className="w-4" />
          <span>Back</span>
        </button>
        <button
          onClick={onSubmitHandler}
          className="flex w-44 items-center justify-center space-x-4  rounded-lg  !bg-button px-3 py-2 font-semibold text-black"
        >
          <span>Next Step</span>
          <MdArrowForwardIos className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default SelectProposal
