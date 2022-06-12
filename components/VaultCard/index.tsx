import { ArrowNarrowUpIcon } from "@heroicons/react/solid";

export interface VaultCardProps {
    name: string;
    valuations: string;
    uniqueOwners: number;
    image: string;
    theme: string,
}

const VaultCard: React.FC<VaultCardProps> = ({
    name,
    valuations,
    uniqueOwners,
    image,
    theme,
}) => {
    return (
        <div className={`rounded-lg  ${theme === 'dark' ? 'bg-input text-white' : 'bg-gray-300 text-black'} w-[15rem]`} >
            <img src={image} className='w-[250px] h-[250px] rounded-t-lg' />
            <div className='px-4 py-3'>
                <div>
                    <div className='flex text-xs'>
                        <p>10% ( ≈8,283,292 BORE )</p>
                        <span className='flex text-green-500 ml-3'>5% <ArrowNarrowUpIcon className='w-4' /></span>
                    </div>
                    <div className='mt-2'>
                        <h1 className='font-semibold text-lg'>{name}</h1>
                    </div>
                </div>
            </div>
            <hr className='border-gray-800' />
            <div className='p-4'>
                <div className='flex justify-between'>
                    <div>
                        <p className='text-xs text-white text-opacity-70'>Valuations</p>
                        <h2>{valuations}</h2>
                    </div>
                    <div>
                        <p className='text-xs text-white text-opacity-70'>Unique owners</p>
                        <h2>{uniqueOwners}</h2>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default VaultCard