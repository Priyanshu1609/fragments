import React, { useState, useContext } from 'react';
import vault from '../../assets/vaultcreation.png';
import Image from 'next/image';
import { requiredTag } from '../CreateDAOForm';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/solid';
import { DataContext } from '../../contexts/dataContext'
import { TiTick } from "react-icons/ti"
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';

interface CreateVaultFormProps {
    origin: string
    setCurrentStep: (values: CreateVaultStep) => void;
    handleBack: () => void;
}

// export enum CreateVaultStep {
//     InputFieldsForm = 'input-fields-form',
//     GovernedStep = 'governed-form',
//     ImportOrPurchase = 'import-or-purchase',
//     Fundraise = 'fundraise',
//     FundingCycle = 'funding-cycle'
// }
export enum CreateVaultStep {
    InputFieldsForm = 'input-fields-form',
    WeightGoverned = 'governed-weight',
    CommiteeGoverned = 'governed-commitee',
    DemocraticGoverned = 'governed-democratic',
    Import = "import",
    Purchase = "purchase",
    Fundraise = 'fundraise',
    FundingCycle = 'funding-cycle'
}

export interface CreateVaultFormValues {
    origin: string,
    vaultName: string,
    contractAddress: string,
    type: string,
    description: string,
    tokenName: string,
    creator: string,
    numOfTokens: number,
    managementFees: number,
    votingPeriod: number,
    quorum: number,
    minFavor: number,
    nftsImported: string[],
    nftsPurchased: string[],
    target: number,
    fundraiseDuration: number,
    myContribution: number,
    amount: number,
    minApproval: number,
    commiteeMembers: string[],
    email: string,
}

const CreateVaultForm: React.FC<CreateVaultFormProps> = ({
    origin,
    setCurrentStep,
    handleBack
}) => {


    const [tokenSupply, setTokenSupply] = useState(1000000)
    const [type, setType] = useState<string>("");
    const [numOfTokens, setNumOfTokens] = useState(1000000)
    console.log({ type })

    const { formData, setFormData, handleChange } = useContext(DataContext);


    const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        if (!type) {
            alert("Please select a governance type")
            return;
        }

        setFormData(
            (prev: CreateVaultFormProps) => ({
                ...prev,
                type,
                numOfTokens,
                origin
            })
        )
        if (type === "democratic") {
            setCurrentStep(CreateVaultStep.DemocraticGoverned)
        } else if (type === "committee") {
            setCurrentStep(CreateVaultStep.CommiteeGoverned)
        } else if (type === "weighted") {
            setCurrentStep(CreateVaultStep.WeightGoverned)
        } else if (type === "monarchy") {
            setCurrentStep(CreateVaultStep.Fundraise)
        }
        // setCurrentStep(CreateVaultStep.DemocraticGoverned)

    }

    const handleType = (option: string) => {
        if (option === "democratic") {
            // setType("democratic")
            alert("The team is working hard to ship this soon.")
        } else if (option === "committee") {
            setType("committee")
        } else if (option === "weighted") {
            // setType("weighted")
            alert("The team is working hard to ship this soon.")
        } else if (option === "monarchy") {
            setType("monarchy")
        }
    }

    const Options = ({ title, desc, option, open }: any) => (
        <div className={`inline-flex  rounded-lg ${type === option ? `bg-gradient-to-tr from-[#2bffb1] to-[#2bd8ff] text-white` : 'bg-gray-600'}`} onClick={e => handleType(option)}>

            <div className="radio bg-black m-[0.05rem] w-full  py-2 px-4 rounded-lg cursor-pointer flex">
                <div>
                    <div className='flex items-center justify-between'>
                        <p className='text-base font-semibold mb-1'>{title}</p>
                        {open && <div className='bg-[#343941] px-2 text-sm rounded-md text-button'>Coming Soon</div>}
                    </div>
                    <p className='text-sm text-[#E6E6E6]'>{desc}</p>
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
                    <h2 className='text-2xl font-britanica font-normal'>Setup Basic Vault Details</h2>
                    <p className='font-montserrat text-base'>Describe your goals, select preferred governance and other basic details</p>
                </div>
                <div className='-mr-[4.4rem] mt-4'>
                    <Image src={vault} height={160} width={160} />
                </div>
            </div>
            <div className='mt-10'>
                <form onSubmit={onSubmitHandler}>
                    <div className='flex flex-col justify-between'>
                        <label className='flex-grow'>
                            <p className='text-xl font-britanica font-normal '>What should we call this Vault?{requiredTag}</p>
                            <input required type='text' maxLength={50} className='text-lg p-3 mb-6 rounded-lg w-full mt-2 bg-transparent focus:outline-none border-[1px] border-gray-600' placeholder='Enter Vault Name' value={formData.vaultName} onChange={(e) => handleChange(e, 'vaultName')} />
                        </label>
                        <label>
                            <p className='text-xl font-britanica font-normal '>What are your goals with this vault?{requiredTag}</p>
                            <textarea required rows={3} maxLength={500} className='p-4 mb-6 rounded-lg bg-transparent focus:outline-none border-[1px] border-gray-600 w-full mt-2' placeholder='Where are you planning to invest? for how long are you investing? how risky is this investment? what returns are you expecting? Write all that you feel is necessary here.'
                             value={formData.description} onChange={(e) => handleChange(e, 'description')} />
                        </label>


                        <p className='text-xl font-britanica font-normal  mb-2'>Select a governance framework.{requiredTag}</p>
                        <div className=" rounded-2xl relative grid grid-cols-1 md:grid-cols-2 gap-3">

                            <Options open={true} option="weighted" title="Weighted Voting" desc="Proposals will lead to transactions. Each member of the vault will have votes(proportional to their stake in the vault) on these proposals." />
                            <Options open={true} option="democratic" title="Democratic Voting" desc="Proposals will lead to transactions. Each member of the vault will have a vote on these proposals." />
                            <Options open={false} option="monarchy" title="Monarchy" desc="Creator will be the sole decision maker. They can carry out transactions as they want." />
                            <Options open={false} option="committee" title="Committee" desc="Creator and selected validators will vote and approve transactions. Validators will be selected prior to vault deployment. " />

                        </div>


                    </div>
                    <div className='grid grid-cols-2 gap-6 mt-8'>
                        <label>
                            <p className='text-xl font-britanica font-normal '>Token Name <span className='text-xs'> ( 3-6 letters )</span>{requiredTag}</p>
                            <div className='flex items-center justify-center'>
                                <p className='text-2xl'>FRAG-</p>
                                <input required type='text' minLength={3} maxLength={6} className='p-4 rounded-lg bg-transparent focus:outline-none border-[1px] border-gray-600 w-full mt-2 placeholder:text-sm' placeholder='Enter Token Name e.g. $LOOK' value={formData.tokenName} onChange={(e) => handleChange(e, 'tokenName')} />
                            </div>
                        </label>
                        {/* <label>
                            <p className='text-xl font-britanica font-normal '>No. of Tokens{requiredTag}</p>
                            <p className='p-4 mb-6 rounded-lg bg-transparent focus:outline-none border-[1px] border-gray-600 w-full mt-2'>{tokenSupply}</p>
                        </label> */}
                        <label>
                            <p className='text-xl font-britanica font-normal '>Management Fees <span className='text-base'> ( Upto 20% )</span>{requiredTag}</p>
                            <input required type='number' step="0" min={0} max={20} className='p-4 mb-6 rounded-lg bg-transparent focus:outline-none border-[1px] border-gray-600 w-full mt-2' placeholder='Enter Management Fees' value={formData.managementFees} onChange={(e) => handleChange(e, 'managementFees')} />
                        </label>
                    </div>
                    <div className='flex justify-between'>
                        <button onClick={handleBack} className='w-44 px-3 py-2 rounded-lg font-semibold bg-[#232529]  text-white flex items-center justify-center space-x-4'>
                            <MdArrowBackIosNew className='w-4' />
                            <span>Back</span>
                        </button>
                        <button type='submit' className='w-44 px-3 py-2 rounded-lg font-semibold  !bg-button  text-black flex items-center justify-center space-x-4'>
                            <span>Next Step</span>
                            <MdArrowForwardIos className='w-4 h-4' />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateVaultForm;