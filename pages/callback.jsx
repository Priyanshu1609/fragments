import { useEffect, useContext, useState } from "react";
import { Auth, API } from "aws-amplify";
import { magic } from "../utils/magic";
// import awsconfig from "../src/aws-exports";
import loader from '../assets/loader.json'
import PageLoader from "../components/PageLoader";
import { useRouter } from "next/router";
import { TransactionContext } from "../contexts/transactionContext";
import { useCookies } from "react-cookie"

const Callback = (props) => {
    const router = useRouter();
    
    const [cookie, setCookie, removeCookie] = useCookies(["user"])
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [setAwsClient] = useContext(TransactionContext);

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


            // .then((didToken) => authenticateWithServer(didToken));
            setCookie("user", JSON.stringify(magic_credential), {
                path: "/",
                maxAge: 3600, // Expires after 1hr
                sameSite: true,
            })
            // await setAwsClient(magic_credential);

            router.push("/dashboard");
        }
        // console.log("finish email redirect login")
    };

    // Send token to server to validate
    // https://6lzffydaki.execute-api.ap-south-1.amazonaws.com/dev/api/auth/login
    const authenticateWithServer = async (didToken) => {
        let userMetadata = await magic.user.getMetadata();
        const res = await API.post(
            awsconfig?.aws_cloud_logic_custom[0].name,
            "/api/auth/login",
            {
                body: {
                    didToken,
                    issuer: userMetadata.issuer,
                },
            }
        );
        console.log("Magic ID Fetched", res);
        const credentials = await Auth.federatedSignIn(
            "developer",
            {
                identity_id: res.IdentityId,
                token: res.Token,
                expires_at: 3600 * 1000 + new Date().getTime(),
            },
            user
        );

        console.log("Credentials", credentials)

        if (credentials) {
            // Set the UserContext to the now logged in user
            let userMetadata = await magic.user.getMetadata();
            await setAwsClient({ ...userMetadata, identityId: credentials.identityId });
            setUser({ ...userMetadata, identityId: credentials.identityId });
            setCookie("user", JSON.stringify(aws), {
                path: "/",
                maxAge: 3600, // Expires after 1hr
                sameSite: true,
            })
            router.push("/dashboard");
        }
    };

    return (
        <PageLoader bg={false} open={true} onClose={() => setIsLoading(false)} img={loader} message='Redirecting...' desc='Please wait, processing your request.' />
    )
};

export default Callback;