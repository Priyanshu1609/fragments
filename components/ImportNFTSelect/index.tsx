import React, { useEffect, useState, useContext } from 'react';
import Image from 'next/image'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import { ArrowRightIcon, CheckIcon } from '@heroicons/react/solid';
import { ethers } from 'ethers';

import NFTillustration from '../../assets/NFT.png'
import { fixTokenURI } from '../../utils';
import { MoralisNFT } from '../../contracts/nft';
import { TransactionContext } from '../../contexts/transactionContext';
import ERC_20 from '../../abis/ERC_20.json'
import ERC_721 from '../../abis/ERC_721.json'
import ERC_1155 from '../../abis/ERC_1155.json'
import { DataContext, } from '../../contexts/dataContext'
import { CreateVaultFormValues, CreateVaultStep } from '../CreateVaultForm'
import { useRouter } from 'next/router';

const APP_ID = process.env.NEXT_PUBLIC_MORALIS_APP_ID;
const SERVER_URL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;

declare var window: any

interface CreateVaultFormProps {
    setCurrentStep: (values: CreateVaultStep) => void;
    handleCreateVault: (values: CreateVaultFormValues) => Promise<void>;
}



const ImportNFTSelect: React.FC<CreateVaultFormProps> = ({
    setCurrentStep,
    handleCreateVault,
}) => {
    const router = useRouter();

    const [isLoading, setIsLoading] = React.useState(false);
    const [nftList, setNftList] = React.useState<any[]>([]);
    const [selected, setSelected] = useState(-1);
    const [transferred, setTransferred] = useState<any>([]);
    const [nftsImported, setNftsImported] = useState<string[]>([""])

    const { connectallet, currentAccount } = useContext(TransactionContext);
    const { formData, setFormData, handleChange } = useContext(DataContext);


    const onSubmitHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();

        const form = {
            ...formData, nftsImported
        }

        handleCreateVault(form);
    }


    // const getNFTs = async () => {
    //     setIsLoading(true)
    //     try {
    //         if(!currentAccount.length) return
    //         if(!APP_ID?.length || !SERVER_URL?.length) {
    //             throw new Error("can't fetch NFTs")
    //         };
    //         Moralis.start({
    //             appId: APP_ID,
    //             serverUrl: SERVER_URL,
    //         })
    //         const nfts = await Moralis.Web3API.account.getNFTs({ chain: 'eth', address: currentAccount });
    //         const nftsMetadataPromise = nfts.result?.filter(nft => nft.symbol !== 'ENS')?.map(nft => fixTokenURI(nft.token_uri ?? '')).map(nft => fetch(nft).then(res => res.json())) ?? []

    //         const nftsMetadata = await Promise.all(nftsMetadataPromise)

    //         const nftsMetadataFixedWithImages = nftsMetadata.map(
    //             (nft, i) => ({
    //                 ...(nfts?.result?.[i] ?? {}),
    //                 ...nft,
    //                 image: fixTokenURI(nft.image ?? nft.image_url),
    //             })
    //         )
    //         setNftList(!nftsMetadataFixedWithImages?.length ? [] : nftsMetadataFixedWithImages);
    //     } catch (error) {
    //         console.error(error)
    //     } finally {
    //         setIsLoading(false)
    //     }
    // }

    const getNFTs = async () => {
        setIsLoading(true)
        console.log(currentAccount)
        try {

            const options = { method: 'GET', headers: { Accept: 'application/json', 'X-API-KEY': '  ' } };

            fetch(`https://testnets-api.opensea.io/api/v1/assets?owner=${currentAccount}&order_direction=desc&limit=20&include_orders=false`, options)
                .then(response => response.json())
                .then(response => { console.log(response); setNftList(response.assets); })
                .catch(err => console.error(err));

        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const send_token = async (tokenAddress: string, tokenId: string, id: number, schema: string) => {
        try {
            setIsLoading(true)

            // const provider = new ethers.providers.Web3Provider(window.ethereum);
            // const signer = provider.getSigner();
            // const to_address = '0x67407721B109232BfF825F186c8066045cFefe7F'
            // const fromAddress = currentAccount;


            // const abi = schema === "ERC721" ? ERC_721 : ERC_1155;
            // let contract = new ethers.Contract(
            //     tokenAddress,
            //     abi,
            //     signer
            // )
            // // console.log('Contract', { contract, signer, fromAddress, to_address, tokenId, tokenAddress })

            // let numberOfTokens = 1
            // console.log(`numberOfTokens: ${numberOfTokens}`)
            // let transfer;
            // schema === "ERC721" ? transfer = await contract.transferFrom(fromAddress, to_address, tokenId) :
            //     transfer = await contract.safeTransferFrom(fromAddress, to_address, tokenId, 1, "0x0")

            // console.log('transfer', transfer)
            // await transfer.wait();
            setTransferred([...transferred, id]);
            let add: string = `https://testnets.opensea.io/assets/rinkeby/${tokenAddress}/${tokenId}`;

            setNftsImported([...nftsImported ?? [], add])

        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false);
        }


    }

    const transferToken = async (i: number, tokenAddress: string, tokenId: string, id: number, schema: string) => {
        if (transferred.includes(id)) {
            console.log('Item already transferred');
            return;
        }

        if (selected !== -1) {
            console.log('Error in selection');
            return;
        }
        setSelected(i);

        await send_token(tokenAddress, tokenId, id, schema);

        setSelected(-1);
    }


    useEffect(() => {
        getNFTs();
    }, [currentAccount, selected === -1])

    const Loader = () => (

        <button className="flex items-center rounded-lg  px-4 py-2 text-white w-full justify-center" disabled>
            <svg className="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="font-medium"> Transferring... </span>
        </button>

    )


    return (
        <div className='pb-8'>
            <div className='flex items-center justify-between p-6 bg-[url("/heading.png")] bg-cover  rounded-lg '>
                <div className='text-black'>
                    <h2 className=' text-2xl font-semibold mb-2'>Select NFTs to Fractionalize</h2>
                    <p className=''>Lorem ipsum dolor sit amet, ectetur adipisc elita dipiscing elit.</p>
                </div>
                <div>
                    <Image src={NFTillustration} width={150} height={150} />
                </div>
            </div>
            <div className='mt-10'>
                <div className='py-6 grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-x-12 gap-y-4 no-scrollbar mx-auto'>
                    {
                        nftList?.map((nft, i) => (
                            <div key={nft.id} className={`cursor-pointer rounded-md bg-black hover:bg-[#1E1E24] max-w-[20rem] mx-auto`} onClick={e => transferToken(i, nft.asset_contract.address, nft.token_id, nft.id, nft.asset_contract.schema_name)}>

                                <div className='p-2 truncate'>
                                    <p className=''>{(nft.name).slice(0, 20)}...</p>
                                </div>
                                <div className='flex items-center w-[260px] h-[260px]'>
                                    <img src={nft.animation_url ? nft.animation_url : nft.image_url} />
                                </div>
                                <div className={`text-center p-2 text-sm ${i == 1 ? 'bg-input' : ''}`}>
                                    {
                                        !transferred.includes(nft.id) && selected !== i && (
                                            <button className="flex items-center rounded-lg  px-4 py-2 text-white w-full justify-center" disabled>
                                                <span className="font-medium"> {i}.  Select NFT</span>
                                            </button>
                                        )
                                    }
                                    {
                                        !transferred.includes(nft.id) && selected === i && (
                                            <Loader />
                                        )
                                    }
                                    {
                                        transferred.includes(nft.id) && (
                                            <button className="flex items-center rounded-lg  px-4 py-2 text-white w-full justify-center" disabled>
                                                <span className="font-medium"> Transferred</span>
                                            </button>
                                        )
                                    }

                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
            <button onClick={onSubmitHandler} className='w-full flex rounded-lg items-center text-gray-900 justify-center py-3 bg-gradient-to-tr from-[#2bffb1] to-[#2bd8ff] '>
                {/* <p>Import {nftList.length} NFTs</p> */}
                <p className='mr-3'> Next </p>
                <ArrowRightIcon className='w-4' />
            </button>
        </div>
    )
}

export default ImportNFTSelect;
