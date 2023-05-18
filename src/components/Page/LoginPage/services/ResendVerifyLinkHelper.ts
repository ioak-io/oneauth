import { isEmptyOrSpaces, isEmailValid } from "../../../../components/Utils";
import {
    AuthliteTypes,
} from 'authlite';

export const validateResendVerifyLinkForm = (payload: AuthliteTypes.ResendVerifyLinkRequest): (AuthliteTypes.ResendVerifyLinkResponse | null) => {
    const errorMessages: AuthliteTypes.ResendVerifyLinkFormErrorMessages = {};
    const error = [];
    if (isEmptyOrSpaces(payload.email)) {
        const errorCode = AuthliteTypes.TranslationName.RESEND_VERIFY_LINK_ERROR__BLANK_USERNAME;
        error.push({
            "field": "email",
            errorCode
        });
        errorMessages.email = errorCode;
    } else if (!isEmailValid(payload.email)) {
        const errorCode = AuthliteTypes.TranslationName.RESEND_VERIFY_LINK_ERROR__INVALID_USERNAME;
        error.push({
            "field": "email",
            errorCode
        });
        errorMessages.email = errorCode;
    }

    if (error.length === 0) {
        return null;
    }
    return {
        outcome: "ERROR",
        errorCode: "FORM_ERROR",
        data: error,
        errorMessages
    }
}

export const processResendVerifyLinkResponse = (request: AuthliteTypes.ResendVerifyLinkRequest, response: any, data: any): AuthliteTypes.ResendVerifyLinkResponse => {
    if (response.status === 400) {
        const errorCode = AuthliteTypes.TranslationName.RESEND_VERIFY_LINK_ERROR__BAD_REQUEST;
        return {
            outcome: "ERROR",
            errorCode,
            data,
            errorMessages: { system: errorCode }
        };
    } else if (response.status === 404) {
        const errorCode = AuthliteTypes.TranslationName.RESEND_VERIFY_LINK_ERROR__USER_NOT_FOUND;
        return {
            outcome: "ERROR",
            errorCode,
            data,
            errorMessages: { email: errorCode }
        };
    }
    return {
        outcome: "SUCCESS",
        data,
        errorMessages: {}
    };
}

export const processResendVerifyLinkFormException = (error: any): AuthliteTypes.ResendVerifyLinkResponse => {
    const errorCode = AuthliteTypes.TranslationName.RESEND_VERIFY_LINK_ERROR__UNKNOWN_ERROR;
    console.log(error.status)
    return {
        outcome: "ERROR",
        errorCode,
        data: "Exception",
        errorMessages: { system: errorCode }
    };
}
