import React, { Component } from 'react'
import { ProposalValues } from '../pages/create-proposal'


export const defaultProposalData = {
    origin: "",
    toToken: "",
    fromToken: "",
    toChain: "",
    fromChain: "",
    listingPrice: 0,
    listingExpireAt: 0,
    listingCreatedAt: 0,
    transferTo: "",
    owner: "",
    nfts: [""],
}

export const ProposalContext = React.createContext({})

export const ProposalContextProvider = ({ children } : any) => {
    const [proposalData, setProposalData] = React.useState<ProposalValues>(defaultProposalData);

    const handleChangePropsal = (values: ProposalValues) => {
        setProposalData(values)
    }

    return (
        <ProposalContext.Provider value={[proposalData, setProposalData, handleChangePropsal]}>
            {children}
        </ProposalContext.Provider>
    )
}