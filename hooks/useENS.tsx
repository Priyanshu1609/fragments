import { ethers } from "ethers";
import { useEffect, useState } from "react";


let eth: any;

if (typeof window !== 'undefined') {
    // @ts-ignore
    eth = window.ethereum
}

const useENS = (address: string) => {
    const [ensName, setENSName] = useState<string | null>(null);
    const [ensAvatar, setENSAvatar] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const resolveENS = async () => {
            setLoading(true);
            if (address && ethers.utils.isAddress(address)) {
                try {
                    const provider = new ethers.providers.Web3Provider(eth);
                    let ensName = await provider.lookupAddress(address);
                    const resolver = ensName ? await provider.getResolver(ensName) : null;
                    let avatar = resolver ? await resolver.getAvatar() : null;
                    setENSName(ensName);
                    // @ts-ignore
                    setENSAvatar(avatar.url);
                } finally {
                    setLoading(false);
                }
            }
        };
        resolveENS();
    }, [address]);

    return { ensName, ensAvatar, loading };
};

export default useENS;
