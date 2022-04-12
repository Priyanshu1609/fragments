import React from "react";
import Image from "next/image";
import gullakLogo from '../assets/gullaklogo.svg';

const Logo: React.FC<{ isWhite?: boolean }> = ({ isWhite = false }) => {
  return (
      <div className="flex items-center justify-between space-x-2 font-sora text-white text-2xl">
          <Image src={gullakLogo} />
          <p>Gullak.party</p>
      </div>
  );
};

export default Logo;
