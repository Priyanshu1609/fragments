import ProgressBar from '@ramonak/react-progress-bar'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { BsFillPersonCheckFill } from 'react-icons/bs'
import { FaCopy, FaDiscord, FaTwitter } from 'react-icons/fa'
import demo from '../../assets/demo.png'
import { getEllipsisTxt } from '../../utils'
import info from '../../assets/info.png'
import { MdArrowForwardIos } from 'react-icons/md'
import { useRouter } from 'next/router'
import { DataContext } from '../../contexts/dataContext'
import { parseCookies } from '../../utils/cookie'
import { TransactionContext } from '../../contexts/transactionContext'
import axios from 'axios'
import { unmarshall } from '@aws-sdk/util-dynamodb'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'

import { BsWhatsapp } from 'react-icons/bs'
import { FaTelegramPlane, FaLinkedinIn, FaRedditAlien } from 'react-icons/fa'
import { TiSocialTwitter } from 'react-icons/ti'
import useENS from '../../hooks/useENS'

const links = [
    "https://web.whatsapp.com/send?text=Hey%20bro%2C%0A%0AI%27ve%20just%20signed%20up%20on%20the%20waitlist%20for%20this%20collective%20investment%20product%2C%20Fragments(https%3A%2F%2Ffragments.money%2F).%0A%0AIn%20case%20this%20interests%20you%2C%20sharing%20my%20referral%20code%20which%20you%20can%20use%20so%20that%20both%20of%20us%20get%20500%20points%20on%20their%20waitlist%20leaderboard.%0A%0AReferral%20code%20%3A%20",
    "https://telegram.me/share/url?url=Hey bro, &text=%0AI%27ve%20just%20signed%20up%20on%20the%20waitlist%20for%20this%20collective%20investment%20product%2C%20Fragments(https%3A%2F%2Ffragments.money%2F).%0A%0AIn%20case%20this%20interests%20you%2C%20sharing%20my%20referral%20code%20which%20you%20can%20use%20so%20that%20both%20of%20us%20get%20500%20points%20on%20their%20waitlist%20leaderboard.%0A%0AReferral%20code%20%3A%20",
    "https://www.linkedin.com/shareArticle?mini=true&url=https://www.fragments.money/&title=hey).%0A%0AIn%20case%20this%20interests%20you%2C%20sharing%20my%20referral%20code%20which%20you%20can%20use%20so%20that%20both%20of%20us%20get%20500%20points%20on%20their%20waitlist%20leaderboard.%0A%0AReferral%20code%20%3A",
    "https://www.reddit.com/submit?url=https://www.fragments.money/&title=Hey%20bro%2C%0A%0AI%27ve%20just%20signed%20up%20on%20the%20waitlist%20for%20this%20collective%20investment%20product%2C%20Fragments%0A%0AIn%20case%20this%20interests%20you%2C%20sharing%20my%20referral%20code%20which%20you%20can%20use%20so%20that%20both%20of%20us%20get%20500%20points%20on%20their%20waitlist%20leaderboard.%0A%0AReferral%20code%20%3A%20",
    "https://twitter.com/intent/tweet?text=Hey%2C%0A%0AI%27ve%20just%20signed%20up%20on%20the%20waitlist%20for%20this%20collective%20investment%20product%2C%40fragmentsHQ%20%0A%0AIn%20case%20this%20interests%20you%2C%20sharing%20my%20referral%20code%20which%20you%20can%20use%20so%20that%20both%20of%20us%20get%20500%20points%20on%20their%20waitlist%20leaderboard.%0A%0Ahttps%3A%2F%2Fwww.fragments.money%2F%0AReferral%20code%3A%20"
]

const Profile: React.FC = ({ data }: any) => {
    const router = useRouter();

    const { id } = router.query;
    const [cookie, setCookie, removeCookie] = useCookies(["user"])
    const { currentAccount, awsClient } = useContext(TransactionContext);
    // const { vaults, creatorVaults } = useContext(DataContext);
    const [vaults, setVaults] = useState<any>([]);
    const [creatorVaults, setCreatorVaults] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [referralId, setReferralId] = useState('');

    const [valuation, setValuation] = useState(0);
    const [showMore, setShowMore] = useState(false);

    const [profileData, setProfileData] = useState<any>()
    const [metaData, setMetaData] = useState<any>()
    const [leaderBoard, setLeaderBoard] = useState<any>([])
    const [ensName, setEnsName] = useState<string | null>("");
    const [ensAvatar, setEnsAvatar] = useState<string | null>(null);

    console.log({ profileData });

    const handleLoadENSName = async (id: any) => {
        const { ensName, ensAvatar, loading } = useENS(id);

        return ensName
    }
    const handleLoadENSAvatar = async (id: any) => {
        const { ensName, ensAvatar, loading } = useENS(id);

        return ensAvatar
    }


    const getVaultsByWallet = async () => {

        try {
            setIsLoading(true);
            setVaults([])

            const options: any = {
                method: 'POST',
                url: 'https://2phfi2xsn5.execute-api.ap-south-1.amazonaws.com/dev/api/associations/getbyuser',
                data: { address: id }
            };

            const response = await axios.request(options)

            console.log("response now", response.data.Items);
            response.data.Items?.forEach((element: any) => {
                // console.log(element);
                let d = {} as any
                for (let i in element) {
                    d[i] = Object.values(element[i])[0]
                }

                setVaults((prev: any) => [...prev, element]);
            })

        } catch (error) {
            console.error(error); toast.error(error);
        } finally {
            setIsLoading(false)
        }
    }
    // console.log(vaults);

    const getVaultsByCreator = async () => {

        try {

            setCreatorVaults([])

            const data = JSON.stringify({
                "creator": id
            });
            const response = await axios.post(`https://lk752nv0gd.execute-api.ap-south-1.amazonaws.com/dev/api/vaults/getbycreator`, data, {
                headers: {
                    'content-Type': 'application/json',
                },
            }
            );

            console.log("response creator vault", response, data);
            response.data.Items?.forEach((element: any) => {
                // console.log(element);
                let d = {} as any
                for (let i in element) {
                    d[i] = Object.values(element[i])[0]
                }

                setCreatorVaults((prev: any) => [...prev, d]);
            })

        } catch (error) {
            console.error(error); toast.error(error);;
        } finally {
            setIsLoading(false);
        }

    }

    const getLeaderBoard = async () => {
        try {
            if (!id) { return }

            setIsLoading(true);

            const data = JSON.stringify({
                "address": id
            });

            const response = await axios.post(`https://1lejmlwfeg.execute-api.ap-south-1.amazonaws.com/dev/api/twitter/fetchleaderboard`, data, {
                headers: {
                    'content-Type': 'application/json',
                },
            });

            // console.log("Leader board response: ", response.data);

            setLeaderBoard(response.data);

        } catch (error) {
            console.error(error); toast.error(error);;
        } finally {
            setIsLoading(false);
        }
    }

    const getUserData = async () => {
        try {

            const body = JSON.stringify({
                "walletAddress": id
            })


            const response = await axios.post(`https://tuq0t0rs55.execute-api.ap-south-1.amazonaws.com/dev/api/profile/get`, body, {
                headers: {
                    'content-Type': 'application/json',
                },
            });

            console.log("Profile Response", response);
            setProfileData(response.data);

        } catch (error) {
            console.error(error); toast.error(error);;
        } finally {
            setIsLoading(false);
        }
    }

    const getMetaData = async () => {
        try {
            var data = JSON.stringify({
                "primaryWallet": id
            });

            var configWallet = {
                method: 'post',
                url: 'https://tuq0t0rs55.execute-api.ap-south-1.amazonaws.com/dev/api/profile/getbyprimary',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            // @ts-ignore
            let res: any = await axios(configWallet)
            console.log("Profile", res.data.Items);
            res = unmarshall(res.data.Items[0])
            // console.log("Profile Now Checking Meta Data", res[0].email);
            console.log("Profile updated", res);

            var data = JSON.stringify({
                "email": res.email
            });

            var config: any = {
                method: 'post',
                url: 'https://tuq0t0rs55.execute-api.ap-south-1.amazonaws.com/dev/wallet',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            let walletRes: any = await axios(config)

            if (walletRes.data.Item) {
                walletRes = (unmarshall(walletRes.data.Item))
            }

            setMetaData(walletRes);
        }
        catch (error) {
            console.error(error); toast.error(error);;
        }
    }

    const getReferralData = async () => {
        try {

            const data = JSON.stringify({
                "walletAddress": id
            });

            const response = await axios.post(`https://vgzlvwmfjh.execute-api.ap-south-1.amazonaws.com/dev/api/accounts/get`, data, {
                headers: {
                    'content-Type': 'application/json',
                },
            });
            const customerId = (response.data.Item.customerId.S);

            const data2 = JSON.stringify({
                "customerId": customerId,
                "typeAction": "CREATED"
            });

            const res = await axios.post(`https://6jadt4b9h5.execute-api.ap-south-1.amazonaws.com/dev/api/referralid/get`, data2, {
                headers: {
                    'content-Type': 'application/json',
                },
            });
            setReferralId(res.data.Item.referralId.S);
        } catch (error) {
            console.error(error); toast.error(error);;
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (id) {
            getUserData();
            getReferralData();
            getMetaData();
            getLeaderBoard();
            getVaultsByWallet();
            getVaultsByCreator();
        }

    }, [id])

    const handleRefresh = async () => {
        try {

            const body = JSON.stringify({
                "walletAddress": id
            })

            toast.info("Profile data refreshing... It may take some time.")

            const response = await axios.post(`https://tuq0t0rs55.execute-api.ap-south-1.amazonaws.com/dev/api/profile/update`, body, {
                headers: {
                    'content-Type': 'application/json',
                },
            });

        } catch (error) {
            console.error(error); toast.error(error);;
        } finally {
            setIsLoading(false);
        }
    }


    const handleValuation = async () => {
        if (!vaults) {
            console.log("no vaults")
            return
        }
        let value = 0.00;
        vaults.forEach(async (vault: any) => {
            const vaultValuation = Number(vault.amountPledged)
            // console.log({ valuation, vaultValuation })
            value += vaultValuation
        }
        )
        setValuation(value);
    }
    useEffect(() => {
        handleValuation();
    }, [currentAccount, vaults])

    useEffect(() => {
        if (!cookie.user?.currentAccount) {
            router.push('/')
        }
    }, [cookie])

    const handleOpen = (link: string) => {
        link = link + referralId
        window.open(link, "_blank");
    }


    return (
        <div className='text-white min-h-screen max-w-7xl xl:mx-auto mx-2 md:mx-4 lg:mx-6'>
            <div className='flex w-full h-full space-x-5'>
                <div className='flex-[0.2] rounded-lg overflow-hidden '>
                    <div className='h-[389px] flex flex-col justify-evenly bg-input '>
                        <div className='flex items-center flex-col justify-evenly h-[75%]'>
                            <Image src={demo} height={140} width={140} />
                            <div className='flex flex-col items-center space-y-2'>
                                <button className='bg-[#303235] px-2 py-1 rounded-lg flex items-center'>
                                    {metaData?.username}
                                    {/* <FaCopy className="ml-3 mr-1" /> */}
                                </button>
                                <button className='bg-[#303235] px-2 py-1 rounded-lg flex items-center'>
                                    {getEllipsisTxt(metaData?.primaryWallet)}
                                    <FaCopy
                                        onClick={() => {
                                            if (!id) {
                                                toast.error("Nothing to copy")
                                                return;
                                            }
                                            navigator.clipboard
                                                // @ts-ignore
                                                .writeText(id)
                                                .then(() => {
                                                    toast.info(`Wallet Address copied to Clipboard,  ${id}`)
                                                })
                                                .catch(() => {
                                                    toast.error("something went wrong while copying");
                                                });
                                        }}
                                        className="ml-3 mr-1" />
                                </button>
                            </div>
                            <div className='flex items-center justify-evenly text-gray-300 space-x-2'>
                                <FaDiscord className='w-8 h-5' />
                                <BsFillPersonCheckFill className='w-8 h-5' />
                                <FaTwitter className='w-8 h-5' />
                            </div>

                        </div>

                        <div className='mx-6'>
                            <p className='text-gray-400 text-left mb-2'>Invited by</p>
                            <div className='flex items-center space-x-3'>
                                <Image src={demo} height={40} width={40} />
                                <div className='text-sm'>
                                    {/* <p>Priyanshu Panda</p> */}
                                    <p className="text-gray-400">{getEllipsisTxt(leaderBoard?.Self?.InvitedBy)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='h-[188px] mt-4 rounded-lg bg-gradient-to-tr from-[#2bffb1] to-[#2bd8ff] text-white flex items-center flex-col justify-evenly'>
                        <div className='bg-[#181B22] h-full rounded-lg m-[0.05rem] flex flex-col w-[99.5%] items-start px-4 py-2 justify-center'>
                            <p>Refer & Earn</p>
                            <p className='text-xs text-gray-400'>Invite a fren to earn 500 frag coins</p>
                            <div className='bg-[#303235]  px-2 py-1 mt-3 rounded-lg w-full '>
                                <p className='text-xs text-gray-400'>Your ReferralID</p>
                                <div className='flex space-x-4 items-center justify-evenly'>
                                    <p className='text-base'>{referralId}</p>
                                    <FaCopy onClick={() => {
                                        if (!referralId) {
                                            toast.error("Nothing to copy")
                                            return;
                                        }
                                        navigator.clipboard
                                            .writeText(referralId)
                                            .then(() => {
                                                toast.info(`Referral ID copied to clipboard,  ${referralId}`)
                                            })
                                            .catch(() => {
                                                toast.error("something went wrong while copying");
                                            });
                                    }} className="ml-3 mr-1 cursor-pointer" />
                                </div>
                            </div>
                            <div className=' flex items-center justify-center mt-4 space-x-3'>
                                <div onClick={() => handleOpen(links[0])} className='bg-green-500 cursor-pointer flex items-center justify-center h-8 w-8 rounded-full'>
                                    <BsWhatsapp className='h-5 w-6 text-white' />
                                </div>
                                <div onClick={() => handleOpen(links[1])} className='bg-[#409FC5] flex cursor-pointer items-center justify-center h-8 w-8 rounded-full'>
                                    <FaTelegramPlane className='h-5 w-5 text-white' />
                                </div>
                                <div onClick={() => handleOpen(links[2])} className='bg-[#0A66C2] flex cursor-pointer items-center justify-center h-8 w-8 rounded-full'>
                                    <FaLinkedinIn className='h-5 w-5 text-white' />
                                </div>
                                <div onClick={() => handleOpen(links[3])} className='bg-[#FF4500] flex cursor-pointer items-center justify-center h-8 w-8 rounded-full'>
                                    <FaRedditAlien className='h-5 w-5 text-white' />
                                </div>
                                <div onClick={() => handleOpen(links[4])} className='bg-[#1A8CD8] flex cursor-pointer items-center justify-center h-8 w-8 rounded-full'>
                                    <TiSocialTwitter className='h-5 w-5 text-white' />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex-[0.8] '>
                    <div className='flex justify-between space-x-4'>
                        <div className='h-[125px] mt-4 rounded-lg flex-grow bg-gradient-to-tr from-[#2bffb1] to-[#2bd8ff] text-white flex flex-[0.33] items-center flex-col justify-evenly font-semibold'>
                            <div className='bg-input h-full rounded-lg m-[0.05rem] flex flex-col w-[99.5%] items-start px-4 py-2 justify-center '>
                                <p>Current Value</p>
                                <p className="bg-gradient-to-r mt-2 from-[#2bffb1] to-[#2bd8ff] text-transparent bg-clip-text text-3xl font-bold">{valuation.toFixed(4)} ETH</p>
                            </div>
                        </div>
                        <div className='h-[125px] mt-4 rounded-lg flex-grow bg-gradient-to-tr from-[#2bffb1] to-[#2bd8ff] text-white flex flex-[0.33] items-center flex-col justify-evenly font-semibold'>
                            <div className='bg-input h-full rounded-lg m-[0.05rem] flex flex-col w-[99.5%] items-start px-4 py-2 justify-center '>
                                <p>Realised Gains</p>
                                <p className="bg-gradient-to-r mt-2 from-[#2bffb1] to-[#2bd8ff] text-transparent bg-clip-text text-3xl font-bold">--- ETH</p>
                            </div>
                        </div>
                        <div className='h-[125px] mt-4 rounded-lg flex-grow bg-gradient-to-tr from-[#2bffb1] to-[#2bd8ff] text-white flex flex-[0.33] items-center flex-col justify-evenly font-semibold'>
                            <div className='bg-input h-full rounded-lg m-[0.05rem] flex flex-col w-[99.5%] items-start px-4 py-2 justify-center '>
                                <p>Vaults Created</p>
                                <p className="bg-gradient-to-r mt-2 from-[#2bffb1] to-[#2bd8ff] text-transparent bg-clip-text text-3xl font-bold">{creatorVaults.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className=' h-[455px] mt-4'>
                        <div className='bg-input h-[435px] w-full p-4 rounded-lg'>

                            <div className='flex justify-between items-center space-x-5'>
                                <div className="bg-[#181B22] rounded-lg h-[125px] flex-[0.72] p-3">
                                    <div className='flex items-center justify-between mb-6'>
                                        <div className='flex items-center s'>
                                            <p className='mr-5'>Your NFT Score</p>
                                            <Image src={info} className="cursor-pointer " height={30} width={30} />
                                        </div>
                                        <div className='flex items-center space-x-2'>
                                            <p onClick={() => setShowMore(!showMore)} className='bg-gradient-to-r from-[#2bffb1] to-[#2bd8ff] text-transparent cursor-pointer hover:opacity-90 bg-clip-text underline decoration-[#2bd8ff] font-bold'>Show {showMore ? "Breakdown" : "More"}</p>
                                            <button onClick={handleRefresh} className=" cursor-pointer hover:opacity-90  font-bold">Refresh</button>
                                        </div>
                                    </div>
                                    <ProgressBar completed={45} bgColor='#2bffb1' baseBgColor='#2C2C35' isLabelVisible={false} height={'12px'} />
                                </div>
                                {/* <div className='flex-[0.33] flex items-start flex-col justify-evenly p-4 bg-[#005081] rounded-lg h-[125px]'>
                                    <p className='font-semibold'>Verify your Twitter</p>
                                    <p className='text-sm text-gray-300 mt-1'>and earn upto 1500 Frag coins</p>
                                    <button className='flex items-center justify-between py-1 w-32 bg-[#33739a] rounded-lg px-2 mt-2'>
                                        <FaTwitter />
                                        Verify Now
                                    </button>

                                </div> */}


                                <div className='flex-[0.37] flex items-start flex-col justify-evenly rounded-lg h-[125px] bg-gradient-to-tr from-[#2bffb1] to-[#2bd8ff] text-white font-semibold'>
                                    <div className='bg-input h-full rounded-lg m-[0.05rem] flex w-[99.5%] items-center px-4 py-2 justify-evenly'>
                                        <div className='flex flex-[0.5] flex-col items-center justify-between'>
                                            <p className='text-left'>FRAG POINTS  </p>
                                            <p className='bg-gradient-to-r mt-2 from-[#2bffb1] to-[#2bd8ff] text-transparent bg-clip-text text-3xl font-bold'>{leaderBoard?.Self?.Points}</p>
                                        </div>
                                        <div className='flex flex-[0.5] flex-col items-center justify-between'>
                                            <p className='text-left'>RANK  </p>
                                            <p className='bg-gradient-to-r mt-2 from-[#2bffb1] to-[#2bd8ff] text-transparent bg-clip-text text-3xl font-bold'>{leaderBoard?.Self?.Rank}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                showMore &&
                                <div className="navbar">
                                    <div className='flex justify-between space-x-4'>
                                        <div className='h-[125px] mt-4 rounded-lg flex-grow bg-gradient-to-tr from-[#2bffb1] to-[#2bd8ff] text-white flex flex-[0.33] items-center flex-col justify-evenly font-semibold'>
                                            <div className='bg-input h-full rounded-lg m-[0.05rem] flex flex-col w-[99.5%] items-start px-4 py-2 justify-center '>
                                                <p>Average ROI</p>
                                                <p className="bg-gradient-to-r mt-2 from-[#2bffb1] to-[#2bd8ff] text-transparent bg-clip-text text-3xl font-bold">{
                                                    profileData?.avg_roi_in_usd ? profileData.avg_roi_in_usd : 0
                                                }</p>
                                            </div>
                                        </div>
                                        <div className='h-[125px] mt-4 rounded-lg flex-grow bg-gradient-to-tr from-[#2bffb1] to-[#2bd8ff] text-white flex flex-[0.33] items-center flex-col justify-evenly font-semibold'>
                                            <div className='bg-input h-full rounded-lg m-[0.05rem] flex flex-col w-[99.5%] items-start px-4 py-2 justify-center '>
                                                <p>Hit Rate</p>
                                                <p className="bg-gradient-to-r mt-2 from-[#2bffb1] to-[#2bd8ff] text-transparent bg-clip-text text-3xl font-bold">{
                                                    profileData?.hitRate ? profileData.hitRate : 0
                                                }</p>
                                            </div>
                                        </div>
                                        <div className='h-[125px] mt-4 rounded-lg flex-grow bg-gradient-to-tr from-[#2bffb1] to-[#2bd8ff] text-white flex flex-[0.33] items-center flex-col justify-evenly font-semibold '>
                                            <div className='bg-input h-full rounded-lg m-[0.05rem] flex flex-col w-[99.5%] items-start px-4 py-2 justify-center '>
                                                <p>Total Collections</p>
                                                <p className="bg-gradient-to-r mt-2 from-[#2bffb1] to-[#2bd8ff] text-transparent bg-clip-text text-3xl font-bold">{
                                                    profileData?.collections_invested ? profileData.collections_invested : 0
                                                }</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex justify-between space-x-4'>
                                        <div className='h-[125px] mt-4 rounded-lg flex-grow bg-gradient-to-tr from-[#2bffb1] to-[#2bd8ff] text-white flex flex-[0.33] items-center flex-col justify-evenly font-semibold'>
                                            <div className='bg-input h-full rounded-lg m-[0.05rem] flex flex-col w-[99.5%] items-start px-4 py-2 justify-center '>
                                                <p>Total Flips</p>
                                                <p className="bg-gradient-to-r mt-2 from-[#2bffb1] to-[#2bd8ff] text-transparent bg-clip-text text-3xl font-bold">{
                                                    profileData?.sales ? profileData.sales : 0
                                                }</p>
                                            </div>
                                        </div>
                                        <div className='h-[125px] mt-4 rounded-lg flex-grow bg-gradient-to-tr from-[#2bffb1] to-[#2bd8ff] text-white flex flex-[0.33] items-center flex-col justify-evenly font-semibold'>
                                            <div className='bg-input h-full rounded-lg m-[0.05rem] flex flex-col w-[99.5%] items-start px-4 py-2 justify-center '>
                                                <p>Avg Hold Time</p>
                                                <p className="bg-gradient-to-r mt-2 from-[#2bffb1] to-[#2bd8ff] text-transparent bg-clip-text text-3xl font-bold">{
                                                    profileData?.avg_holding_time ? parseFloat(profileData?.avg_holding_time.toFixed(4)) : "0"
                                                }</p>
                                            </div>
                                        </div>
                                        <div onClick={() => {
                                            router.push(
                                                {
                                                    pathname: '/create-gullak',
                                                    query: { user: currentAccount }
                                                }
                                            )
                                        }} className='flex flex-[0.33] flex-grow items-start flex-col  justify-evenly bg-[#0c878e] rounded-lg h-[125px] mt-4 text-white '>
                                            <div className='px-4 py-2 '>
                                                <p className='font-semibold'>Create your own Vault</p>
                                                <p className='text-sm text-gray-300 mt-1'>start investing with your frens</p>
                                                <button className='flex items-center justify-between py-2 w-40 bg-black text-white rounded-lg px-3 mt-2'>
                                                    start creating
                                                    <MdArrowForwardIos />
                                                </button>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div >
    )
}

export default Profile

