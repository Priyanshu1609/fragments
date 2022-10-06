import { useEffect, useContext, useState } from "react";
import { Auth, API } from "aws-amplify";
import { magic } from "../utils/magic";
// import awsconfig from "../src/aws-exports";
import loader from '../assets/loader.json'
import PageLoader from "../components/PageLoader";
import { useRouter } from "next/router";
import { TransactionContext } from "../contexts/transactionContext";
import { useCookies } from "react-cookie"
import axios from "axios";

const Callback = (props) => {
    const router = useRouter();

    const [cookie, setCookie, removeCookie] = useCookies(["user"])
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [setAwsClient, aws, currentAccount] = useContext(TransactionContext);

    const { magic_credential } = router.query;
    // The redirect contains a `provider` query param if the user is logging in with a social provider
    useEffect(() => {
        if (magic_credential) {
            finishEmailRedirectLogin();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [magic_credential]);

    // `loginWithCredential()` returns a didToken for the user logging in
    const finishEmailRedirectLogin = () => {
        // console.log("start email redirect login", magic_credential);
        if (magic_credential) {
            magic.auth
                .loginWithCredential()


                .then((didToken) => authenticateWithServer(didToken));
        }
        // console.log("finish email redirect login")
    };

    // Send token to server to validate
    // https://6lzffydaki.execute-api.ap-south-1.amazonaws.com/dev/api/auth/login
    const authenticateWithServer = async (didToken) => {
        try {

            let userMetadata = await magic.user.getMetadata();

            // console.log({ didToken, userMetadata })
            const options = {
                method: 'POST',
                url: 'https://r7d9t73qaj.execute-api.ap-south-1.amazonaws.com/dev/api/auth/magic',
                data: {
                    didToken: didToken,
                    issuer: userMetadata.issuer
                }
            };

            const credentials = axios.request(options)


            if (credentials) {
                // Set the UserContext to the now logged in user
                let userMetadata = await magic.user.getMetadata();
                // await setAwsClient({ ...userMetadata, identityId: credentials.identityId });
                setUser({ ...userMetadata, aws: credentials });
                setCookie("user", JSON.stringify({ ...userMetadata, identityId: credentials }), {
                    path: "/",
                    maxAge: 2592000, // Expires after 1hr
                    sameSite: true,
                })

                if (currentAccount) {
                    router.push("/dashboard");
                } else {
                    router.push("/connect");
                }
            }
            else {
                router.push("/")
            }

        } catch (error) {
            console.error(error)
        }

    };

    return (
        <PageLoader bg={false} open={true} onClose={() => setIsLoading(false)} img={loader} message='Redirecting...' desc='Please wait, processing your request.' />
    )
};

export default Callback;