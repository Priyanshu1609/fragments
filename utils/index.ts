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

export const ipfsParse = (ipfsHash: string) => {
  return ipfsHash?.replace("ipfs://", "https://ipfs.io/ipfs/");
}