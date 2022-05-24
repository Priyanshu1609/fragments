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


    return (
        <NftContext.Provider value={{ getTokenIdMetadata, getTokens }}>
            {children}
        </NftContext.Provider>
    )
}