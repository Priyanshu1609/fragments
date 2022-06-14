import { url } from "inspector";
import { ethers } from "ethers";

/**
 * Returns a string of form "abc...xyz"
 * @param {string} str string to string
 * @param {number} n number of chars to keep at front/end
 * @returns {string}
 */
export const getEllipsisTxt = (str: string, n = 6) => {
  if (str) {
    return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
  }
  return "";
};

export const fixTokenURI = (uri: string) => {
  if (uri?.startsWith('ipfs')) {
    return "https://ipfs.moralis.io:2053/ipfs/" + uri.split("ipfs://ipfs/").slice(-1)[0].split("://").slice(-1);
  } else if (uri?.indexOf("ipfs") > -1) {
    return "https://ipfs.moralis.io:2053/ipfs" + uri.split("ipfs").slice(-1);
  } else {
    return uri;
  }
}

export const bnToString = (bn: string) => {
  return bn ? parseInt(ethers.utils.formatEther(parseInt(bn, 10).toString(10))) : 0;
}

export const dtToString = (unixTime: any) => {
  if (unixTime === Number.MAX_SAFE_INTEGER) {
    return "Duration"
  }
  else {
    const date = new Date(unixTime * 1000);
    return (date.toLocaleDateString("en-US") + " at " + date.toLocaleTimeString("en-US"));
  }
}
const formateDigit = (myNumber: any) => {
  let formattedNumber = myNumber.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  })

  return formattedNumber;
}
export const minDtTime = () => {
  const d = new Date();
  const yr = d.getFullYear();
  const mo = formateDigit(d.getMonth() + 1);
  const dy = formateDigit(d.getDate());
  const hr = formateDigit(d.getHours());
  const min = formateDigit(d.getMinutes());
  const sec = formateDigit(d.getSeconds());
  const ms = formateDigit(d.getMilliseconds());
  return `${yr}-${mo}-${dy}T${hr}:${min}`;

}

export const maxDtTime = (unixTime: any) => {
  if (unixTime === Number.MAX_SAFE_INTEGER) {
    return;
  }

  const d = new Date(unixTime * 1000);
  d.setMinutes(d.getMinutes())
  const yr = d.getFullYear();
  const mo = formateDigit(d.getMonth() + 1);
  const dy = formateDigit(d.getDate());
  const hr = formateDigit(d.getHours());
  const min = formateDigit(d.getMinutes());
  const sec = formateDigit(d.getSeconds());
  const ms = formateDigit(d.getMilliseconds());
  return `${yr}-${mo}-${dy}T${hr}:${min}`;

}

export const ipfsParse = (ipfsHash: string) => {
  return ipfsHash?.replace("ipfs://", "https://ipfs.io/ipfs/");
}