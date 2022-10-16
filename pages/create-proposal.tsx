import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import CancelNFT from '../components/CreateProposalFlow/CancelNFT';
import EditNFT from '../components/CreateProposalFlow/EditNFT';
import Liquidatation from '../components/CreateProposalFlow/Liquidatation';
import ListNFT from '../components/CreateProposalFlow/ListNFT';
import SelectNFT from '../components/CreateProposalFlow/SelectNFT';
import SelectProposal from '../components/CreateProposalFlow/SelectProposal';
import SwapTokens from '../components/CreateProposalFlow/SwapTokens';
import TransferNFT from '../components/CreateProposalFlow/TransferNFT';
import { parseCookies } from '../utils/cookie';

type Props = {}

export enum ProposalStep {
    SelectProposal = 'select-proposal',
    SelectNFT = 'select-nft',
    Liquidation = 'liquidation',
    SwapTokens = 'swap-tokens',
    ListNFT = 'list-nft',
    EditNFT = 'edit-nft',
    TransferNFT = 'transfer-nft',
    CancelNFT = 'cancel-nft',

}

export interface ProposalValues {
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


const CreateProposal = ({ data }: any) => {

    const router = useRouter()

    const [currentStep, setCurrentStep] = React.useState(ProposalStep.SelectProposal)

    useEffect(() => {
        if (!data.user) {
            router.push('/')
        }
    }, [data.user])

    const handleBack = () => {

        if (currentStep === ProposalStep.SelectProposal) {
            router.push('/dashboard')
        }
        else if (currentStep === ProposalStep.SelectNFT || currentStep === ProposalStep.Liquidation || currentStep === ProposalStep.SwapTokens) {
            setCurrentStep(ProposalStep.SelectProposal)
        }
        else if (currentStep === ProposalStep.ListNFT || currentStep === ProposalStep.EditNFT || currentStep === ProposalStep.TransferNFT || currentStep === ProposalStep.CancelNFT) {
            setCurrentStep(ProposalStep.SelectNFT)
        }
        // else if (currentStep === ProposalStep.Import) {
        //     formData.type === 'Public' ? setCurrentStep(ProposalStep.CommiteeGoverned) : setCurrentStep(ProposalStep.SelectProposal)
        // }

    }

    return (
        <div className='text-white mx-auto  sm:px-4 pb-16 '>
            {
                currentStep === ProposalStep.SelectProposal && (
                    <div>
                        <SelectProposal handleBack={handleBack}  setCurrentStep={setCurrentStep} />
                    </div>
                )
            }
            {
                currentStep === ProposalStep.ListNFT && (
                    <div>
                        <ListNFT handleBack={handleBack}  setCurrentStep={setCurrentStep} />
                    </div>
                )
            }
            {
                currentStep === ProposalStep.EditNFT && (
                    <div>
                        <EditNFT handleBack={handleBack}  setCurrentStep={setCurrentStep} />
                    </div>
                )
            }
            {
                currentStep === ProposalStep.TransferNFT && (
                    <div>
                        <TransferNFT handleBack={handleBack}  setCurrentStep={setCurrentStep} />
                    </div>
                )
            }
            {
                currentStep === ProposalStep.CancelNFT && (
                    <div>
                        <CancelNFT handleBack={handleBack}  setCurrentStep={setCurrentStep} />
                    </div>
                )
            }
            {
                currentStep === ProposalStep.SwapTokens && (
                    <div>
                        <SwapTokens handleBack={handleBack}  setCurrentStep={setCurrentStep} />
                    </div>
                )
            }
            {
                currentStep === ProposalStep.Liquidation && (
                    <div>
                        <Liquidatation handleBack={handleBack}  setCurrentStep={setCurrentStep} />
                    </div>
                )
            }
            {
                currentStep === ProposalStep.SelectNFT && (
                    <div>
                        <SelectNFT handleBack={handleBack}  setCurrentStep={setCurrentStep} />
                    </div>
                )
            }
        </div>
    )
}

export default CreateProposal

export async function getServerSideProps({ req, res }: any) {

    const data = parseCookies(req)

    if (res) {
        if (Object.keys(data).length === 0 && data.constructor === Object) {
            res.writeHead(301, { Location: "/" })
            res.end()
        }
    }

    return { props: { data } }
}