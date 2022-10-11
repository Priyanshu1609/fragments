import { Magic } from "magic-sdk";

// Create client-side Magic instance
const createMagic = (key : string) => {
    if (typeof window != "undefined") {
        return new Magic(key);
    }
};
export const magic = createMagic("pk_live_97A74AEBCE12CF92");