import NextAuth from 'next-auth';
import CognitoProvider from "next-auth/providers/cognito";

export default NextAuth({
    providers: [
        CognitoProvider({
            clientId: process.env.COGNITO_CLIENT_ID,
            clientSecret: process.env.COGNITO_CLIENT_SECRET,
            issuer: "https://cognito-idp.ap-south-1.amazonaws.com/ap-south-1_7GY6B7rMq",
        })
    ]
})