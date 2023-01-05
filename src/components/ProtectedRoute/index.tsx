import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';

interface Props {
    middleware: string[];
    redirectPath?: string;
    children: any;
}

const ProtectedRoute = (props: Props) => {
    const authorization = useSelector((state: any) => state.authorization);
    const params = useParams();

    if (props.middleware.length > 0) {
        return <Navigate to={props.redirectPath || '/landing'} replace />;
    }

    return React.cloneElement(props.children, { ...params });
};

export default ProtectedRoute;