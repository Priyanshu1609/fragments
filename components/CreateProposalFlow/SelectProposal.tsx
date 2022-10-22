import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { TiTick } from 'react-icons/ti';
import governance from "../../assets/governance.png";
import { ProposalStep, ProposalValues } from '../../pages/create-proposal';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { DataContext } from '../../contexts/dataContext';
import { ProposalContext } from '../../contexts/proposalContext';

type Props = {}

export interface SelectProposalProps {
    setCurrentStep: (values: ProposalStep) => void;
    handleBack: () => void;
}



const SelectProposal: React.FC<SelectProposalProps> = ({
    setCurrentStep,
    handleBack
}) => {

    const [type, setType] = useState<any>(null);
    const [proposalData, setProposalData, handleChangePropsal,] = useContext(ProposalContext);



    const onSubmitHandler = (e: any) => {
        e.preventDefault();

        if (!type) {
            alert("Please select a proposal type")
            return;
        }
        setProposalData((prevState: ProposalValues) => ({
            ...prevState,
            origin: type
        }))

        if (type === ProposalStep.SwapTokens || type === ProposalStep.Liquidation) {
            setCurrentStep(type)
        }
        else {
            setCurrentStep(ProposalStep.SelectNFT);
        }
    }

    const Options = ({ title, desc, option, open }: any) => (
        <div className={`inline-flex  rounded-lg ${type === option ? `bg-gradient-to-tr from-[#2bffb1] to-[#2bd8ff] text-white` : 'bg-gray-600'}`} onClick={e => setType(option)}>

            <div className="radio bg-input m-[0.05rem] w-full  p-4 rounded-lg cursor-pointer flex">
                <div>
                    <div className='flex items-center justify-between'>
                        <p className='text-xl font-semibold mb-1'>{title}</p>
                        {open && <div className='bg-[#343941] px-2 text-sm rounded-md text-button'>Coming Soon</div>}
                    </div>
                    <p className='text-base mt-2 text-[#E6E6E6]'>{desc}</p>
                </div>
                <div className={` ${type === option ? 'bg-gradient-to-tr from-[#2bffb1] to-[#2bd8ff] text-white' : 'bg-white'} h-4 w-4 mt-2 mb-auto mx-2 rounded-full`}>
                    <TiTick className={`h-4 w-4 ${type === option ? 'text-black' : 'text-white'}`} />
                </div>
            </div>
        </div>
    )


    return (
        <div className='max-w-2xl mx-auto text-lg'>
            <div className='flex items-center justify-between h-28 p-6 bg-[url("/Button.png")]  bg-[#232529]    bg-cover overflow-hidden rounded-2xl'>
                <div className='text-white'>
                    <h2 className='text-2xl font-britanica font-normal'>Select a New Proposal</h2>
                    <p className='font-montserrat text-base'>Choose a Proposal type to continue</p>
                </div>
                <div className='-mr-[4.4rem] mt-4'>
                    <Image src={governance} height={160} width={160} />
                </div>
            </div>

            <p className="mb-1 font-bold mt-4">NFT Proposals</p>
            <div className="grid grid-cols-2 gap-5">
                <Options title='List NFT for Sale' desc='This is an onchain sale. With this proposal you can list your vault’s NFT for sale on OpenSea/Rarible or our platform.' option={ProposalStep.ListNFT} open={false} />
                <Options title='Edit NFT for Sale' desc='Listing price went down? We got you covered. Propose to change the listing price of your vault’s NFT. Propose to change the listing price of your' option={ProposalStep.EditNFT} open={false} />
                <Options title='Transfer NFT' desc='This is an onchain sale. With this proposal you can list your vault’s NFT for sale on OpenSea/Rarible or our platform.' option={ProposalStep.TransferNFT} open={false} />
                <Options title='Cancel Order' desc='Listing price went down? We got you covered. Propose to change the listing price of your vault’s NFT. Propose to change the listing price of your' option={ProposalStep.CancelNFT} open={false} />
            </div>
            <p className="mb-1 font-bold mt-4">Administrative Proposals</p>
            <div className="grid grid-cols-2 gap-5">
                <Options title='Swap Tokens' desc='This is an onchain sale. With this proposal you can list your vault’s NFT for sale on OpenSea/Rarible or our platform.' option={ProposalStep.SwapTokens} open={false} />
                <Options title='Liquidate Tokens' desc='Listing price went down? We got you covered. Propose to change the listing price of your vault’s NFT. Propose to change the listing price of your.' option={ProposalStep.Liquidation} open={false} />
            </div>

            <div className='flex justify-between mt-20'>
                <button onClick={handleBack} className='w-44 px-3 py-2 rounded-lg font-semibold bg-[#232529]  text-white flex items-center justify-center space-x-4'>
                    <MdArrowBackIosNew className='w-4' />
                    <span>Back</span>
                </button>
                <button type='submit' onClick={onSubmitHandler} className='w-44 px-3 py-2 rounded-lg font-semibold  !bg-button  text-black flex items-center justify-center space-x-4'>
                    <span>Next Step</span>
                    <MdArrowForwardIos className='w-4 h-4' />
                </button>
            </div>
        </div>
    )
}

export default SelectProposal