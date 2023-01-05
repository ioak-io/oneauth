import { currentRealmEventSubject } from "src/events/CurrentRealmEvent";
import { sendMessage } from "src/events/MessageService";
import { httpGet } from "../Lib/RestTemplate";

interface Params {
    realm?: string;
}

export const apply = (middlewares: string[], authorization: any, params: Params) => {
    const realm = params.realm ? Number(params.realm) : 100;
    // if (props.profile.clientStatus === 'authenticated') {
    middlewares?.forEach((middlewareName) => {
        if (!runMidleware(middlewareName, authorization, params, realm)) {
            return false;
        }
    });
    return true;
    // }
};

const runMidleware = (middlewareName: string, authorization: any, params: Params, realm: number) => {
    // sendMessage('realmChange', true, '');
    switch (middlewareName) {
        case 'readRealm':
            return readRealm(realm, authorization);
        case 'authenticate':
            return authenticateRealm(realm, authorization);
        case 'readAuthentication':
            return readAuthenticationRealm(realm, authorization);
        case 'authenticateClientrealm':
            return authenticateClientrealm(realm, authorization);
        case 'readAuthenticationClientrealm':
            return readAuthenticationClientrealm(realm, authorization);
        default:
            return true;
    }
};

const readRealm = (realm: number) => {
    if (currentRealmEventSubject.value?.realm !== realm) {
        httpGet(`/realm/${realm}`, null).then((response) => {
            currentRealmEventSubject.next(response.data);
        });
    }
    setTimeout(() => {
        sendMessage(
            'realmChange',
            true,
            realm
        );
    }, 0);
};

const authenticateRealm = (realm: number, authorization: any) => {
    return authenticate('realm', realm, authorization);
};
const authenticateClientrealm = (realm: number, authorization: any) => {
    return authenticate('clientrealm', realm, authorization);
};
const readAuthenticationRealm = (realm: number, authorization: any) => {
    return authenticate('realm', realm, false);
};
const readAuthenticationClientrealm = (realm: number, authorization: any) => {
    return authenticate('clientrealm', realm, false);
};

const authenticate = (type: string, realm: number, authorization: any, redirect = true) => {
    if (authorization.isAuth && authorization.realm === realm) {
        return true;
    }
    const accessToken = props.cookies.get(`${realm}-access_token`);
    const refreshToken = props.cookies.get(`${realm}-refresh_token`);
    if (accessToken) {
        interpretAccessToken(realm, accessToken, refreshToken, type, redirect);
    } else if (redirect) {
        // dispatch(setProfile({ ...profile, clientStatus: 'authenticated' }));
        redirectHandler(type, realm);
    } else {
        return true;
    }
};

const interpretAccessToken = (
    realm: number,
    accessToken: string,
    refreshToken: string,
    type: string,
    redirect: boolean
) => {
    httpGet('/auth/token/decode', {
        headers: {
            authorization: accessToken,
        },
    })
        .then((decodedResponse) => {
            console.log(decodedResponse);
            if (decodedResponse.status === 200) {
                dispatch(
                    addAuth({
                        isAuth: true,
                        access_token: accessToken,
                        refresh_token: refreshToken,
                        given_name: decodedResponse.data.given_name,
                        family_name: decodedResponse.data.family_name,
                        name: decodedResponse.data.name,
                        nickname: decodedResponse.data.nickname,
                        email: decodedResponse.data.email,
                        type: decodedResponse.data.type,
                        user_id: decodedResponse.data.user_id,
                        realm: props.match.params.realm || 100,
                    })
                );
                if (type === 'clientrealm') {
                    sendMessage('clientrealmChange', true, props.match.params.realm);
                } else {
                    // sendMessage('realmChange', true, realm);
                }
                if (type === 'oa') {
                    // dispatch(fetchRealm());
                    // dispatch(fetchUsers(sessionResponse.data));
                    // dispatch(fetchRoles(sessionResponse.data));
                    // dispatch(fetchClient(sessionResponse.data));
                    // dispatch(fetchPermittedRealm(sessionResponse.data));
                }
                // dispatch(setProfile({ ...profile, clientStatus: 'authenticated' }));
            } else {
                props.cookies.remove(`${realm}-access_token`);
                props.cookies.remove(`${realm}-refresh_token`);
            }
        })
        .catch((error: any) => {
            if (error.response.status === 401) {
                httpPost(
                    '/auth/token',
                    {
                        grant_type: 'refresh_token',
                        realm,
                        refresh_token: refreshToken,
                    },
                    {
                        headers: {
                            authorization: accessToken,
                        },
                    }
                )
                    .then((refreshTokenResponse) => {
                        if (refreshTokenResponse.status === 200) {
                            props.cookies.set(
                                `${realm}-access_token`,
                                refreshTokenResponse.data.access_token
                            );
                        } else {
                            props.cookies.remove(`${realm}-access_token`);
                            props.cookies.remove(`${realm}-refresh_token`);
                        }
                    })
                    .catch((error) => {
                        props.cookies.remove(`${realm}-access_token`);
                        props.cookies.remove(`${realm}-refresh_token`);
                    });
            } else {
                props.cookies.remove(`${realm}-access_token`);
                props.cookies.remove(`${realm}-refresh_token`);
                if (redirect && error.response.status === 404) {
                    sendMessage('notification', true, {
                        type: 'failure',
                        message: 'Invalid session token',
                        duration: 3000,
                    });
                    redirectHandler(type, realm);
                } else if (redirect && error.response.status === 401) {
                    sendMessage('notification', true, {
                        type: 'failure',
                        message: 'Session expired',
                        duration: 3000,
                    });
                    redirectHandler(type, realm);
                }
            }
        });
};

const redirectHandler = (type: string, realm: number) => {
    switch (type) {
        case 'realm':
            redirectToRealmLogin(realm);
            break;
        case 'clientrealm':
            redirectToClientrealmLogin(props.match.params.clientrealm);
            break;
        default:
            redirectToOaLogin();
    }
};

const redirectToOaLogin = () => {
    // window.location.href = `http://localhost:3010/#/login`;
    props.history.push(`/realm/100/login/oneauth`);
};

const redirectToRealmLogin = (realm: number) => {
    // window.location.href = `http://localhost:3010/#/realm/${realmId}/login`;
    console.log(realm);
    if (realm === 100) {
        props.history.push(`/realm/100/login/oneauth`);
    } else {
        props.history.push(`/realm/${realm}/login/oneauth`);
    }
};

const redirectToClientrealmLogin = (clientrealmId: string) => {
    // window.location.href = `http://localhost:3010/#/clientrealm/${clientrealmId}/login`;
    props.history.push(`/clientrealm/${clientrealmId}/login`);
};

const redirectToUnauthorized = () => {
    props.history.push(`/${profile.realm}/unauthorized`);
};