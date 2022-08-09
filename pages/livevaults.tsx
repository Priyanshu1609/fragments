import React from 'react'
import VaultCard from '../components/VaultCard'

const Livevaults: React.FC = () => {
    return (
        <div className='text-white  max-w-7xl xl:mx-auto mx-2 md:mx-4 lg:mx-6'>
            <div className='py-6 grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-y-4 no-scrollbar mx-auto '>

                <VaultCard />
                <VaultCard />
                <VaultCard />
                <VaultCard />
                <VaultCard />
            </div>
        </div>
    )
}

export default Livevaults