import React from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { currentRealmEventSubject } from '../../events/CurrentRealmEvent';
import { sendMessage } from '../../events/MessageService';
import { addAuth } from '../../store/actions/AuthActions';
import { httpGet, httpPost } from '../Lib/RestTemplate';

interface Props {
    middleware: string[];
    redirectPath?: string;
    children?: any;
    component?: any;
}

const ProtectedRoute = (props: Props) => {
    const authorization = useSelector((state: any) => state.authorization);
    const profile = useSelector((state: any) => state.profile);
    const dispatch: any = useDispatch();
    const params = useParams();
    const history: any = useNavigate();
    const [cookies, setCookies]: any = useCookies();

    const getRealm = () => {
        const _realm = params.realm
            ? Number(params.realm)
            : 100;
        return _realm;
    }

    const applyMiddlewares = () => {
        // if (props.profile.clientStatus === 'authenticated') {
        props.middleware?.forEach((middlewareName) => {
            if (!applyMidleware(middlewareName)) {
                return false;
            }
        });
        return true;
        // }
    };

    const applyMidleware = (middlewareName: string) => {
        // sendMessage('realmChange', true, '');
        switch (middlewareName) {
            case 'readRealm':
                return readRealm();
            case 'authenticate':
                return authenticateRealm();
            case 'readAuthentication':
                return readAuthenticationRealm();
            case 'authenticateClientrealm':
                return authenticateClientrealm();
            case 'readAuthenticationClientrealm':
                return readAuthenticationClientrealm();
            default:
                return true;
        }
    };

    const readRealm = () => {
        const _realm = getRealm();
        if (currentRealmEventSubject.value?.realm !== _realm) {
            httpGet(`/realm/${_realm}`, null).then((response) => {
                currentRealmEventSubject.next(response.data);
            });
        }
        setTimeout(() => {
            sendMessage(
                'realmChange',
                true,
                _realm
            );
        }, 0);
    };

    const authenticateRealm = () => {
        return authenticate('realm');
    };
    const authenticateClientrealm = () => {
        return authenticate('clientrealm');
    };
    const readAuthenticationRealm = () => {
        return authenticate('realm', false);
    };
    const readAuthenticationClientrealm = () => {
        return authenticate('clientrealm', false);
    };

    const authenticate = (type: string, redirect = true) => {
        const realm = getRealm();
        console.log(authorization, realm, typeof authorization.realm, typeof realm)
        if (authorization.isAuth && authorization.realm === realm) {
            return true;
        }
        const accessToken = cookies[`${realm}-access_token`];
        const refreshToken = cookies[`${realm}-refresh_token`];
        console.log("*", accessToken, "100-access_token", `${realm}-access_token`);
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
        console.log("interpret")
        httpGet('/auth/token/decode', {
            headers: {
                authorization: accessToken,
            },
        })
            .then((decodedResponse) => {
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
                            realm
                        })
                    );
                    if (type === 'clientrealm') {
                        sendMessage('clientrealmChange', true, getRealm());
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
                    cookies.remove(`${realm}-access_token`);
                    cookies.remove(`${realm}-refresh_token`);
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
                                cookies.set(
                                    `${realm}-access_token`,
                                    refreshTokenResponse.data.access_token
                                );
                            } else {
                                cookies.remove(`${realm}-access_token`);
                                cookies.remove(`${realm}-refresh_token`);
                            }
                        })
                        .catch((error) => {
                            cookies.remove(`${realm}-access_token`);
                            cookies.remove(`${realm}-refresh_token`);
                        });
                } else {
                    cookies.remove(`${realm}-access_token`);
                    cookies.remove(`${realm}-refresh_token`);
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
                redirectToClientrealmLogin(params.clientrealm || '');
                break;
            default:
                redirectToOaLogin();
        }
    };

    const redirectToOaLogin = () => {
        // window.location.href = `http://localhost:3010/#/login`;
        history(`/realm/100/login/oneauth`);
    };

    const redirectToRealmLogin = (realm: number) => {
        // window.location.href = `http://localhost:3010/#/realm/${realmId}/login`;
        if (realm === 100) {
            history(`/realm/100/login/oneauth`);
        } else {
            history(`/realm/${realm}/login/oneauth`);
        }
    };

    const redirectToClientrealmLogin = (clientrealmId: string) => {
        // window.location.href = `http://localhost:3010/#/clientrealm/${clientrealmId}/login`;
        history(`/clientrealm/${clientrealmId}/login`);
    };

    if (!applyMiddlewares()) {
        return <Navigate to={props.redirectPath || '/landing'} replace />;
    }

    if (props.children) {
        return React.cloneElement(props.children, { ...params });
    }
    else {
        return <props.component  {...params} />;
    }
};

export default ProtectedRoute;