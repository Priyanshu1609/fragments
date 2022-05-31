import React, { createContext, useState } from 'react'
export const DataContext = createContext();


export const DataContextProvider = ({ children }) => {

    const [formData, setFormData] = useState({
        flow: '',
        vaultName: '',
        type: '',
        description: '',
        tokenName: '',
        numOfTokens: 0,
        managementFees: 0,
        votingPeriod: 0,
        days: 0,
        quorum: 0,
        minFavor: 0,
        nftsImported: [],
        nftsPurchased: [],
        target: 0,
        fundraiseDuration: 0,
        myContribution: 0,
    })
    console.log('FormData : ', formData);

    const handleChange = (e, name) => {
        setFormData(prevState => ({ ...prevState, [name]: e.target.value }))
    }

    return (
        <DataContext.Provider value={{ formData, setFormData, handleChange }}>
            {children}
        </DataContext.Provider>
    )
}