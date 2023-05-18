import {
    AuthliteComponents,
    AuthliteTypes,
} from 'authlite';
import { processResendVerifyLinkFormException, processResendVerifyLinkResponse, validateResendVerifyLinkForm } from "./ResendVerifyLinkHelper";
import { processResetPasswordLinkFormException, processResetPasswordLinkResponse, validateResetPasswordLinkForm } from "./ResetPasswordLinkHelper";
import { processSigninException, processSigninResponse, validateSigninForm } from "./SigninHelper";
import { processSignupException, processSignupResponse, validateSignupForm } from "./SignupHelper";

const BASE_URL_PRODUCTION = "https://api.ioak.io:8010/api-internal";
const BASE_URL_LOCAL = "http://localhost:4010/api-internal";

export const signin = (environment: 'local' | 'production', payloadRequest: AuthliteTypes.SigninRequest): Promise<AuthliteTypes.SigninResponse> => {
    const payload: AuthliteTypes.SigninRequest = {
        email: payloadRequest.email?.trim(),
        password: payloadRequest.password
    }
    let url = BASE_URL_PRODUCTION;
    if (environment === 'local') {
        url = BASE_URL_LOCAL;
    }
    const validationError = validateSigninForm(payload);
    if (validationError) {
        return new Promise((resolve, reject) => {
            resolve(validationError);
        })
    }
    return fetch(`${url}/auth/signin`, {
        method: "POST",
        body: JSON.stringify({ response_type: "token", ...payload }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((response) => response.json()
            .then((data) => {
                return processSigninResponse(payload, response, data);
            }))
        .catch((error: any) => {
            return processSigninException(error);
        });
}


export const signup = (environment: 'local' | 'production', payloadRequest: AuthliteTypes.SignupRequest): Promise<AuthliteTypes.SigninResponse> => {
    const payload: AuthliteTypes.SignupRequest = {
        given_name: payloadRequest.given_name?.trim(),
        family_name: payloadRequest.family_name?.trim(),
        email: payloadRequest.email?.trim(),
        password: payloadRequest.password,
        retype_password: payloadRequest.retype_password
    }
    let url = BASE_URL_PRODUCTION;
    if (environment === 'local') {
        url = BASE_URL_LOCAL;
    }
    const validationError = validateSignupForm(payload);
    if (validationError) {
        return new Promise((resolve, reject) => {
            resolve(validationError);
        })
    }
    return fetch(`${url}/auth/signup`, {
        method: "POST",
        body: JSON.stringify({ response_type: "token", ...payload, given_name: null }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((response) => response.json()
            .then((data) => {
                return processSignupResponse(payload, response, data);
            }))
        .catch((error: any) => {
            return processSignupException(error);
        });
}


export const resetPasswordLink = (environment: 'local' | 'production', payloadRequest: AuthliteTypes.ForgotPasswordRequest): Promise<AuthliteTypes.ForgotPasswordResponse> => {
    const payload: AuthliteTypes.ForgotPasswordRequest = {
        email: payloadRequest.email?.trim(),
    }
    let url = BASE_URL_PRODUCTION;
    if (environment === 'local') {
        url = BASE_URL_LOCAL;
    }
    const validationError = validateResetPasswordLinkForm(payload);
    if (validationError) {
        return new Promise((resolve, reject) => {
            resolve(validationError);
        })
    }
    return fetch(`${url}/reset-password-link`, {
        method: "POST",
        body: JSON.stringify({ ...payload }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((response) => response.json()
            .then((data) => {
                return processResetPasswordLinkResponse(payload, response, data);
            }))
        .catch((error: any) => {
            return processResetPasswordLinkFormException(error);
        });
}

export const resendVerifyLink = (environment: 'local' | 'production', payloadRequest: AuthliteTypes.ResendVerifyLinkRequest): Promise<AuthliteTypes.ResendVerifyLinkResponse> => {
    const payload: AuthliteTypes.ResendVerifyLinkRequest = {
        email: payloadRequest.email?.trim(),
    }
    let url = BASE_URL_PRODUCTION;
    if (environment === 'local') {
        url = BASE_URL_LOCAL;
    }
    const validationError = validateResendVerifyLinkForm(payload);
    if (validationError) {
        return new Promise((resolve, reject) => {
            resolve(validationError);
        })
    }
    return fetch(`${url}/auth/verify-email/resend`, {
        method: "POST",
        body: JSON.stringify({ ...payload }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((response) => response.json()
            .then((data) => {
                return processResendVerifyLinkResponse(payload, response, data);
            }))
        .catch((error: any) => {
            return processResendVerifyLinkFormException(error);
        });
}
