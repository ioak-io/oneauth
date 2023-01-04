import React from 'react';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';

interface Props {
    middleware: string[];
    redirectPath?: string;
    children: any;
}

const ProtectedRoute = (props: Props) => {
    const params = useParams();

    if (props.middleware.length > 0) {
        return <Navigate to={props.redirectPath || '/landing'} replace />;
    }

    return React.cloneElement(props.children, { ...params });
};

export default ProtectedRoute;