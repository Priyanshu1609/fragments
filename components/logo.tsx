import React from "react";
import Image from "next/image";
import gullakLogo from '../assets/gullaklogo.svg';
import logotype from '../assets/Group.png';

const Logo: React.FC<{ isWhite?: boolean }> = ({ isWhite = false }) => {
  return (
    <div className="flex items-center justify-between space-x-2 font-montserrat text-white text-2xl">
      <Image src={logotype} height={45} width={300} />
    </div>
  );
};

export default Logo;
