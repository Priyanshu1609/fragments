import { AmplifyAuthCognitoStackTemplate } from '@aws-amplify/cli-extensibility-helper';

export function override(resources: AmplifyAuthCognitoStackTemplate) {
    resources.userPool.policies = {
        passwordPolicy: {
            ...resources.userPool.policies["passwordPolicy"], // Retain current settings
            temporaryPasswordValidityDays: 2 // Override "temporary password validity days" setting
        }
    }

    resources.userPool.usernameConfiguration = {
        caseSensitive: true
    }
}
