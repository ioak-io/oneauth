import { isEmptyOrSpaces, isEmailValid } from "../../../../components/Utils";
import {
    AuthliteTypes,
} from 'authlite';


export const validateSignupForm = (payload: AuthliteTypes.SignupRequest): (AuthliteTypes.SignupResponse | null) => {
    const errorMessages: AuthliteTypes.SignupFormErrorMessages = {};
    const error = [];
    if (isEmptyOrSpaces(payload.email)) {
        const errorCode = AuthliteTypes.TranslationName.SIGNUP_ERROR__BLANK_USERNAME;
        error.push({
            "field": "email",
            errorCode
        });
        errorMessages.email = errorCode;
    } else if (!isEmailValid(payload.email)) {
        const errorCode = AuthliteTypes.TranslationName.SIGNUP_ERROR__INVALID_USERNAME;
        error.push({
            "field": "email",
            errorCode
        });
        errorMessages.email = errorCode;
    }

    if (isEmptyOrSpaces(payload.password)) {
        const errorCode = AuthliteTypes.TranslationName.SIGNUP_ERROR__BLANK_PASSWORD;
        error.push({
            "field": "password",
            errorCode
        });
        errorMessages.password = errorCode;
    }

    if (isEmptyOrSpaces(payload.retype_password)) {
        const errorCode = AuthliteTypes.TranslationName.SIGNUP_ERROR__BLANK_RETYPEPASSWORD;
        error.push({
            "field": "retype_password",
            errorCode
        });
        errorMessages.retype_password = errorCode;
    }

    if (payload.password !== payload.retype_password) {
        const errorCode = AuthliteTypes.TranslationName.SIGNUP_ERROR__PASSWORDS_DO_NOT_MATCH;
        error.push({
            "field": "password",
            errorCode
        });
        error.push({
            "field": "retype_password",
            errorCode
        });
        errorMessages.password = errorCode;
        errorMessages.retype_password = errorCode;
    }

    if (isEmptyOrSpaces(payload.given_name)) {
        const errorCode = AuthliteTypes.TranslationName.SIGNUP_ERROR__BLANK_GIVENNAME;
        error.push({
            "field": "given_name",
            errorCode
        });
        errorMessages.given_name = errorCode;
    }

    if (isEmptyOrSpaces(payload.family_name)) {
        const errorCode = AuthliteTypes.TranslationName.SIGNUP_ERROR__BLANK_FAMILYNAME;
        error.push({
            "field": "family_name",
            errorCode
        });
        errorMessages.family_name = errorCode;
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

export const processSignupResponse = (request: AuthliteTypes.SignupRequest, response: any, data: any): AuthliteTypes.SignupResponse => {
    if (response.status === 400) {
        const errorCode = AuthliteTypes.TranslationName.SIGNUP_ERROR__BAD_REQUEST;
        return {
            outcome: "ERROR",
            errorCode,
            data,
            errorMessages: { system: errorCode }
        };
    } else if (response.status === 403) {
        const errorCode = AuthliteTypes.TranslationName.SIGNUP_ERROR__USER_ALREADY_EXISTS;
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

export const processSignupException = (error: any): AuthliteTypes.SignupResponse => {
    const errorCode = AuthliteTypes.TranslationName.SIGNUP_ERROR__UNKNOWN_ERROR;
    return {
        outcome: "ERROR",
        errorCode,
        data: error,
        errorMessages: { system: errorCode }
    };
}
