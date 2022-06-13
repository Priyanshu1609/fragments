import { ArrowNarrowUpIcon } from "@heroicons/react/solid";
import { dtToString, getEllipsisTxt } from "../../utils";
import logoWhite from '../../assets/LogoWhite.png'

export interface VaultCardProps {
    name: string;
    valuations: string;
    uniqueOwners: number;
    image: string;
    status: number,
    amount: number,
    address: string,
    timestamp: number,
}

const VaultCard: React.FC<VaultCardProps> = ({
    name,
    valuations,
    uniqueOwners,
    image,
    status,
    amount,
    address,
    timestamp
}) => {
    return (
        <div className={`rounded-lg  ${status == 1 ? 'bg-input text-white' : 'bg-gray-300 text-black'} w-[15rem]`} >
            <img src={image} className='w-[250px] h-[250px] rounded-t-lg' />
            <div className='px-4 py-3'>
                <div>
                    <div className='flex text-xs'>
                        <p>Completed : {amount}</p>
                        <span className='flex text-green-500 ml-3'>5% <ArrowNarrowUpIcon className='w-4' /></span>
                        <p>{dtToString(timestamp)}</p>
                    </div>
                    <div className='mt-2'>
                        <h1 className='font-semibold text-lg'>{name}</h1>
                    </div>
                    <p> {getEllipsisTxt(address)}</p>
                </div>
            </div>
            <hr className='border-gray-800' />
            <div className='p-4'>
                <div className='flex justify-between'>
                    <div>
                        <p className='text-xs  text-opacity-70'>Target</p>
                        <h2>{valuations}</h2>
                    </div>
                    <div>
                        <p className='text-xs  text-opacity-70'>Fundraised</p>
                        <h2>{uniqueOwners}</h2>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default VaultCard