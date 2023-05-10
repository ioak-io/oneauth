import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getSessionValue, removeSessionValue, setSessionValue } from '../../utils/SessionUtils';
import { sendMessage } from '../../events/MessageService';
import { addAuth } from '../../store/actions/AuthActions';
import { httpGet, httpPost } from '../Lib/RestTemplate';

interface Props {
    middleware: string[];
    redirectPath?: string;
    children?: any;
    component?: any;
}

const appRealm = process.env.REACT_APP_ONEAUTH_APPSPACE_ID || '';

const ProtectedRouteApp = (props: Props) => {
    const authorization = useSelector((state: any) => state.authorization);
    const profile = useSelector((state: any) => state.profile);
    const dispatch: any = useDispatch();
    const params = useParams();
    const navigate: any = useNavigate();

    const applyMiddlewares = () => {
        props.middleware?.forEach((middlewareName) => {
            if (!applyMidleware(middlewareName)) {
                return false;
            }
        });
        return true;
    };

    const applyMidleware = (middlewareName: string) => {
        console.log(process.env.REACT_APP_ONEAUTH_APPSPACE_ID, "---", appRealm)
        sendMessage('spaceChange', true, '');
        // sendMessage('realmChange', true, '');
        switch (middlewareName) {
            case 'readAuthentication':
                return readAuthenticationSpace();
            case 'authenticate':
                return authenticateSpace();
            case 'isAdmin':
                return isAdmin();
            default:
                return true;
        }
    };

    const authenticateSpace = () => {
        return authenticate('space');
    };
    const readAuthenticationSpace = () => {
        return authenticate('space', false);
    };
    const readSpace = () => {
        sendMessage('spaceChange', true, params.space);
    };

    const authenticate = async (type: string, redirect = true) => {
        sendMessage('spaceChange', true, params.space);
        if (authorization.isAuth) {
            if (
                params.space &&
                !authorization.space.includes(parseInt(params.space, 10))
            ) {
                console.log(
                    '**redirect to unauthorized page',
                    params.space
                );
                redirectToUnauthorized();
            }
            return true;
        }
        const accessToken = getSessionValue(`oneauth-access_token`);
        const refreshToken = getSessionValue(`oneauth-refresh_token`);
        if (accessToken && refreshToken) {
            httpPost(
                `/api-internal/auth/token`,
                { grant_type: 'refresh_token', refresh_token: refreshToken },
                null,
                process.env.REACT_APP_ONEAUTH_API_URL
            )
                .then((response: any) => {
                    if (response.status === 200) {
                        let newAccessToken = accessToken;
                        if (response.access_token) {
                            newAccessToken = response.access_token;
                            setSessionValue(`oneauth-access_token`, newAccessToken);
                        }
                        dispatch(
                            addAuth({
                                isAuth: true,
                                ...response.data.claims,
                                access_token: newAccessToken,
                                refresh_token: refreshToken,
                                space: response.data.space,
                            })
                        );
                    }
                })
                .catch((error: any) => {
                    removeSessionValue(`oneauth-access_token`);
                    removeSessionValue(`oneauth-refresh_token`);
                    redirectToLogin(appRealm);
                });
        } else if (redirect) {
            redirectToLogin(appRealm);
        } else {
            return true;
        }
    };

    const isAdmin = () => {
        redirectToUnauthorized();
        return false;
    };

    const redirectToLogin = (space: string) => {
        // window.location.href = `${process.env.REACT_APP_ONEAUTH_URL}/#/realm/${appRealm}/login/${process.env.REACT_APP_ONEAUTH_APP_ID}`;
        navigate(`/login`);
    };

    const redirectToUnauthorized = () => {
        navigate(`/${params.space}/unauthorized`);
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

export default ProtectedRouteApp;