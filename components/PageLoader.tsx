import React, { useState } from 'react'
import Logo from './logo'
import Modal from './Modal'

const PageLoader = () => {

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Modal
      open={isLoading}
      onClose={() => setIsLoading(false)}
      showCTA={false}
      showClose={false}
    >
      <div className='flex flex-col items-center justify-center p-16 '>
        <div className="border-t-transparent w-16 h-16 border-4 border-white border-solid rounded-full animate-spin mb-4"></div>
        <Logo />
      </div>
    </Modal>
  )
}

export default PageLoader