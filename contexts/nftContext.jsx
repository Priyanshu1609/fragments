import { createContext } from 'react'

const API_KEY = 'YgOUcYlTNyBe0czxTWvruHCI9dbzkUQj7592RL1fEAakq0XdWughgAXZMA4s7k73';


export const NftContext = createContext();

export const NftContextProvider = ({ children }) => {

    const getTokenIdMetadata = async (tokenId, tokenAddress) => {

        try {

            const options = { method: 'GET', headers: { 'X-API-Key': API_KEY, 'Accept': 'application/json', 'Content-Type': 'application/json', } };

            const res = await fetch(`https://deep-index.moralis.io/api/v2/nft/${tokenAddress}/${tokenId}?chain=rinkeby&format=decimal`, options)

            let data = await res.json();

            return JSON.parse(data.metadata);

        } catch (error) {
            console.error(error);
        }

    }

    const getTokens = async (userAddress) => {

        try {

            const options = { method: 'GET', headers: { 'X-API-Key': API_KEY, 'Accept': 'application/json', 'Content-Type': 'application/json', } };

            const res = await fetch(`https://deep-index.moralis.io/api/v2/0x67407721B109232BfF825F186c8066045cFefe7F/nft?chain=rinkeby&format=decimal`, options)

            let data = await res.json();

            return data.result;

        } catch (error) {
            console.error(error);
        }

    }

    const getEstimatePrice = async (tokenId, tokenAddress) => {
        try {
            const options = { method: 'GET', headers: { 'x-api-key': API_KEY, 'Accept': 'application/json', 'Content-Type': 'application/json', } };
            const res = await fetch(`https://api.nftbank.ai/estimates-v2/estimates/0xc2c747e0f7004f9e8817db2ca4997657a7746928/1022?chain_id=ETHEREUM`, options)

            let data = await res.json();

            return data.data.estimate;
        } catch (error) {
            console.error(error);
        }
    }



    return (
        <NftContext.Provider value={{
            getTokenIdMetadata,
            getTokens,
            getEstimatePrice,
        }}>
            {children}
        </NftContext.Provider>
    )
}