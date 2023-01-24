import { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

const RequireAuth = ({ children }: PropsWithChildren) => {
	const { isAuthenticated } = useAuth();
	let location = useLocation();

	if (!isAuthenticated) {
		return <Navigate to='/login' state={{ from: location }} />;
	}

	return <>{children}</>;
};

export default RequireAuth;
