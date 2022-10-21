import { useRouter } from 'next/router';
import React from 'react'
import Lottie from 'react-lottie-player';
import success from '../../assets/happy.json'
import { getEllipsisTxt } from '../../utils';
import { MdIosShare } from "react-icons/md"
import Blockies from 'react-blockies';
import ProgressBar from '@ramonak/react-progress-bar';
import { ArrowUpIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import PageLoader from '../../components/PageLoader';
import meta from '../../assets/MetaMask_Fox.svg.png'
import Modal from '../../components/Modal';

type Props = {}

const data = {
  "origin": "public",
  "creator": "0x6d4b5acfb1c08127e8553cc41a9ac8f06610efc7",
  "minApproval": "0",
  "email": "rylomi@mailinator.com",
  "vaultName": "fifth",
  "vaultAddress": "0x854af661234877d6ae57864c34f44Ef4FAf33E3e",
  "tokenName": "fragme",
  "target": "0.001",
  "managementFees": "15",
  "commiteeMembers": [
    ""
  ],
  "vaultStatus": "COMPLETED",
  "amount": "0.001",
  "nfts": [
    ""
  ],
  "votingPeriod": "0",
  "description": "Sed aut veritatis qui ut sapiente nostrud elit occaecat nulla dolore ut soluta eius et",
  "contractAddress": "0xC581A0a6210ba86e39A5aCF0936Be6C2C4ABD0ef",
  "minFavor": "0",
  "fundraiseDuration": "1666398660000",
  "fundraiseCreatedAt": "1665835974908",
  "numOfTokens": "1000000",
  "quorum": "0",
  "type": "monarchy"
}

const ProposalPage = (props: Props) => {

  const router = useRouter();
  const { vault, type } = router.query;

  // function to capitalise first letter
  const capitalizeFirstLetter = (string: string) => {
    if (string?.length <= 1) return null;
    return string?.charAt(0).toUpperCase() + string?.slice(1);
  }

  return (
    <div className='text-white max-w-7xl mx-auto  md:flex md:flex-row-reverse md:justify-center pb-16 min-h-screen overflow-y-scroll scrollbar-hide relative'>
      {type === "new" && <Lottie
        // loop
        animationData={success}
        play
        loop={1}
        style={{ width: "100wh", height: "100vh", position: "absolute", top: "0", left: "0", right: "0", bottom: "0", overflow: "scroll", zIndex: 1 }}
      />}
      <div className='flex flex-col flex-[0.6] items-start '>
        <div className='flex items-start justify-center w-full'>
          <div className='bg-input rounded-xl w-full mx-16 p-4'>
            <span className='border-b-[1px] border-gray-500 text-xl font-britanica font-normal underline '>Approvals (0/4) </span>
            <p className="text-gray-500 mt-2 font-semibold">Note: In order to execute the proposal, you will need to get approved 3 out of 4 signing members of this vault.</p>
            <div className='mt-2 h-[14rem] overflow-y-scroll relative'>
              <div className='py-4 flex flex-col items-center space-y-4 justify-between'>
                {
                  // ownerData?.map((owner: any, index: number) => (
                  //     <div key={index} className='flex items-center w-full justify-between'>
                  //         <div className='flex space-x-3'>
                  //             <Blockies
                  //                 seed='need to be changed'
                  //                 size={19}
                  //                 scale={2}
                  //                 className='rounded-full mr-3'
                  //             />
                  //             <div className='flex items-center justify-center'>
                  //                 <p className='font-semibold text-base'>
                  //                     {getEllipsisTxt(owner.walletAddress)}
                  //                 </p>

                  //             </div>
                  //         </div>
                  //         <div>
                  //             <p className='text-sm'>{parseFloat(((owner?.amountPledged / owner?.target) * 1000000).toString()).toFixed(2) + "  frag-" + data?.tokenName}</p>
                  //         </div>
                  //         <div>
                  //             <p>{owner.amountPledged} ETH</p>
                  //         </div>
                  //     </div>
                  // ))
                }
              </div>
              <button type='submit' className='w-36 absolute bottom-0 right-0 mt-auto px-3 py-3 rounded-lg font-semibold !bg-button  text-black flex items-center justify-center space-x-4'>
                <span>Approve</span>
              </button>
            </div>
          </div>
        </div>
        <div className='flex items-start justify-center w-full mt-6'>
          <div className='bg-input rounded-xl w-full mx-16 p-4'>
            <span className='border-b-[1px] border-gray-500 text-xl font-britanica font-normal underline '>List of Investors</span>
            <div className='mt-2 h-[24rem] overflow-y-scroll relative'>
              <div className='py-4 flex flex-col items-center space-y-4 justify-between'>
                {
                  // ownerData?.map((owner: any, index: number) => (
                  //     <div key={index} className='flex items-center w-full justify-between'>
                  //         <div className='flex space-x-3'>
                  //             <Blockies
                  //                 seed='need to be changed'
                  //                 size={19}
                  //                 scale={2}
                  //                 className='rounded-full mr-3'
                  //             />
                  //             <div className='flex items-center justify-center'>
                  //                 <p className='font-semibold text-base'>
                  //                     {getEllipsisTxt(owner.walletAddress)}
                  //                 </p>

                  //             </div>
                  //         </div>
                  //         <div>
                  //             <p className='text-sm'>{parseFloat(((owner?.amountPledged / owner?.target) * 1000000).toString()).toFixed(2) + "  frag-" + data?.tokenName}</p>
                  //         </div>
                  //         <div>
                  //             <p>{owner.amountPledged} ETH</p>
                  //         </div>
                  //     </div>
                  // ))
                }
              </div>
            </div>
          </div>
        </div>
        <div className='flex items-start justify-center w-full mt-6'>
          <div className='bg-input rounded-xl w-full mx-16 p-4'>
            <span className='border-b-[1px] border-gray-500 text-xl font-britanica font-normal underline '>Quick Actions</span>
            <div className="flex items-center justify-between mt-3 mb-1">
              <button type='submit' className='w-44 px-3 py-2 rounded-lg font-semibold !bg-[#232529]  text-white flex items-center justify-center space-x-4'>
                <span>View NFT</span>
              </button>
              <button type='submit' className='w-44 px-3 py-2 rounded-lg font-semibold !bg-[#232529]  text-white flex items-center justify-center space-x-4'>
                <span>Etherscan</span>
              </button>
              <button type='submit' className='w-44 px-3 py-2 rounded-lg font-semibold !bg-[#232529]  text-white flex items-center justify-center space-x-4'>
                <span>Gnosis Wallet</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      <div className={`p-6 bg-input rounded-xl flex-[0.4] `}>
        <div className='flex items-center justify-between w-full z-50 '>
          <button onClick={() =>
            router.push({
              pathname: `/profile/${data?.creator}`
            })}
            className='bg-[#1E1E24] rounded-lg flex items-center justify-center p-3 w-max'>
            <Blockies
              seed='need to be changed'
              size={7}
              scale={3}
              className='rounded-full mr-3'
            />
            <p className='text-sm'>{getEllipsisTxt(data?.creator, 5)}</p>
          </button>
          <button className='flex space-x-2 text-semibold z-10 bg-[#1E1E24] rounded-lg py-2 px-3'>
            <span>Share Link</span>
            <MdIosShare className='h-5 w-5 text-white' />
          </button>
          {/* <p>{data?.vaultStatus === "RUNNING" && countDown}</p> */}
        </div>
        <div className='my-5'>
          <h1
            className="mb-1 font-britanica font-normal text-transparent text-2xl bg-clip-text bg-gradient-to-r from-button to-bluebutton"
          >
            List NFT For Sale
          </h1>
          <p className='font-montserrat'>
            proposed by {getEllipsisTxt(data?.creator)}
          </p>
        </div >
        <div className='mt-4 mb-6'>
          <div>
            <div className='flex justify-between items-center mb-3'>
              <div className='flex space-x-2 items-center'>
                <p className='text-gray-300 text-base'>Proposal Status:</p><span className=' font-britanica font-normal text-yellow-300'>Pending Apporval</span>
              </div>
              <div className='flex space-x-2 items-center'>
                <p className='text-gray-300 text-base'>Votes:</p><span className='font-britanica font-normal'>0/4</span>
              </div>
            </div>
            <ProgressBar completed={(Number(data?.amount) / Number(data?.target)) * 100} bgColor='#2bffb1' baseBgColor='#2C2C35' isLabelVisible={false} height={'12px'} />
            <div className='flex justify-end space-x-2 ml-auto mt-1 mb-4'>
              <p className='text-gray-300 text-base'>Time Left: </p><span className=' font-britanica font-normal'>{ }</span>
            </div>
            <div className='mb-5 font-montserrat font-black rounded-lg flex w-full items-center justify-between space-x-3 mt-2' >
              <button className='text-black font-semibold !bg-button w-full p-3 m-auto rounded-lg z-10'>List NFT</button>
            </div >
          </div>


        </div >

        <div>
          <div className='mt-4'>
            <span className='border-b-[1px] font-britanica font-normal border-gray-500 text-xl text-gray-500 underline'>General Information</span>
            <div className='my-4'>
              <div className='flex justify-between mt-6'>
                <div>
                  <p className='text-xl text-white font-britanica font-normal mb-1'>Vault Name</p>
                  <p className='text-xl font-semibold'>{data?.vaultName}</p>
                </div>
              </div>
              <div className='flex justify-between mt-4'>
                <div>
                  <p className='text-xl text-white font-britanica font-normal mb-1'>Valuations</p>
                  <p className='text-xl font-semibold'>{ } ETH</p>
                </div>
                <div>
                  <p className='text-xl text-white font-britanica font-normal mb-1'>No. of tokens</p>
                  <p className='text-xl font-semibold'>1000000</p>
                </div>
              </div>
              <div className='flex justify-between mt-6'>
                <div>
                  <p className='text-xl text-white font-britanica font-normal mb-1'>Management fee</p>
                  <p className='text-xl font-semibold'>{data?.managementFees}</p>
                </div>
                {/* <div>
                                    <p className='text-xl text-white  mb-1'>Unique owners</p>
                                    <p className='text-xl font-semibold'>1</p>
                                </div> */}
              </div>
              <div></div>
            </div>
          </div>
          <div className='mt-4'>
            <span className='border-b-[1px] font-britanica font-normal border-gray-500 text-xl text-gray-500 underline'>Proposal Information - <span className="text-white">{capitalizeFirstLetter(data?.type)}</span></span>
            <div className='my-4'>
              <div className='flex justify-between mb-4'>
                <div>
                  <p className='text-xl text-white font-britanica font-normal mb-1'>Voting Period</p>
                  <p className='text-xl font-semibold'>{data?.type !== "Private" && data?.origin !== "private" ? data?.votingPeriod : "-"}</p>
                </div>
              </div>
              <div className='flex justify-between mt-6'>
                <div>
                  <p className='text-xl text-white font-britanica font-normal mb-1'>Quorum</p>
                  <p className='text-xl font-semibold'>{data?.type !== "Private" && data?.origin !== "private" ? data?.quorum : "-"}</p>
                </div>
                <div>
                  <p className='text-xl text-white font-britanica font-normal mb-1'>Min Favourable Majority</p>
                  <p className='text-xl font-semibold'>{data?.type !== "Private" && data?.origin !== "private" ? data?.minFavor : "-"}</p>
                </div>

              </div>
            </div>
          </div>
          <div>
            <span className='border-b-[1px] font-britanica font-normal border-gray-500 text-xl text-gray-500 underline'>Your Contribution</span>
            <div className="w-full">
              <div className='flex justify-between mt-4  '>
                <div>
                  <p className='text-xl text-white font-britanica font-normal mb-1'>Your Contribution</p>
                  <p className='text-xl font-semibold'>{data?.type !== "Private" && data?.origin !== "private" ? data?.quorum : "-"}</p>
                </div>
                <div>
                  <p className='text-xl text-white font-britanica font-normal mb-1'>Total Contribution</p>
                  <p className='text-xl font-semibold'>{data?.type !== "Private" && data?.origin !== "private" ? data?.minFavor : "-"}</p>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div >

      <Modal
        open={true}
        onClose={() => {}}
        showCTA={false}
        title="Fundraise is now live"
      >
        <div className="flex flex-col mt-2">
          <p className='text-left text-gray-500 font-montserrat'>Start sharing with your friends and fundraise together. </p>

          <div className=' flex items-center justify-evenly mt-4 space-x-5'>
            <div onClick={() => handleOpen(links[0])} className='hover:cursor-pointer hover:opacity-70 rounded-xl h-28 w-20 border-[1px] border-gray-600 flex items-center justify-center '>
              <BsWhatsapp className='h-10 w-10  text-[#25d366]' />
            </div>
            <div onClick={() => handleOpen(links[1])} className='hover:cursor-pointer hover:opacity-70 rounded-xl h-28 w-20 border-[1px] border-gray-600 flex items-center justify-center '>
              <FaTelegramPlane className='h-10 w-10  text-[#229ED9]' />
            </div>
            <div onClick={() => handleOpen(links[3])} className='hover:cursor-pointer hover:opacity-70 rounded-xl h-28 w-20 border-[1px] border-gray-600 flex items-center justify-center '>
              <FaDiscord className='h-10 w-10  text-[#7289da]' />
            </div>
            <div onClick={() => handleOpen(links[4])} className='hover:cursor-pointer hover:opacity-70 rounded-xl h-28 w-20 border-[1px] border-gray-600 flex items-center justify-center '>
              <TiSocialTwitter className='h-10 w-10  text-[#1da1f2]' />
            </div>
            <div onClick={() => handleOpen(links[4])} className='hover:cursor-pointer hover:opacity-70 rounded-xl h-28 w-20 border-[1px] border-gray-600 flex items-center justify-center'>
              <MdMail className='h-10 w-10  text-[#4285f4]' />
            </div>

          </div>
          <button type='submit'
            onClick={() => {
              navigator.clipboard
                .writeText(`https://dev.fragments.money/vaults/${id}`)
                .then(() => {
                  alert(`Link copied to clipboard , https://dev.fragments.money/vaults/${id}`)
                })
                .catch(() => {
                  alert("something went wrong while copying");
                });
            }}
            className='w-full mt-4 p-3 rounded-lg !bg-button text-black flex items-center justify-center space-x-4'>
            <span className='text-xl'>Copy</span>
          </button>
          <button type='submit' onClick={() => setModal(false)} className='w-full mt-4 p-3 rounded-lg !bg-[#1E1E24]  text-white flex items-center justify-center space-x-4'>
            <span className='text-xl'>Close</span>
          </button>
        </div>
      </Modal>
      {/*  <Modal
                open={purchaseForm}
                onClose={() => setPurchaseForm(false)}
                showCTA={false}
                title="Buy More"
            >
                <p>You can start buying from here</p>
                <div className=''>
                    <div className='p-2 text-sm bg-[#303104] text-[#FFF500] flex rounded-lg mt-4 font-montserrat '>
                        <div className='px-3'>
                            <p className='font-black'>Note: We only accepts funds in ETH</p>
                            <p className='text-[#C6BE0F]'>Have funds in different tokens? Click on swap tokens</p>
                        </div>
                        <div onClick={() => setSwapModal(true)} className='flex hover:cursor-pointer bg-[#FFF500] rounded-lg text-black font-black w-44 mx-auto items-center justify-center text-base'>
                            <div className="flex flex-col items-center justify-center">
                                <span>Swap</span>
                                <span>Tokens</span>
                            </div>
                            <ArrowSmRightIcon className='h-8 w-8' />
                        </div>
                    </div>
                    <div className='mt-4'>
                        <div className='flex justify-between text-sm text-gray-300 mb-1'>
                            <p>Enter amount</p>
                            <p>Balance: {balance} ETH</p>
                        </div>
                        <input required type='number' step="0" placeholder='Enter amount' min={0} onChange={(e) => setTokenAmount(Number(e.target.value))} className='bg-transparent focus:outline-none border-[1px] border-gray-600 p-4 w-full rounded-lg ' />
                    </div>

                    <div className='text-center' >
                        <button onClick={handleAddAmount} className='!bg-button flex items-center space-x-3 justify-center text-sm w-full text-gray-900 py-2 px-4 rounded-lg mt-4'>
                            <p>Purchase {tokenAmount}</p>
                            <ArrowRightIcon className='w-4 h-4' />
                        </button>
                    </div>
                </div>

            </Modal>
            <PageLoader bg={false} open={isLoading} onClose={() => setIsLoading(false)} img={loader} message='Waiting for transaction to complete' desc="Check the metamask window to complete the transaction. Avoid closing this tab." /> */}

    </div>
  )
}

export default ProposalPage