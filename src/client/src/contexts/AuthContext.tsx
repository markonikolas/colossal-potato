import { createContext, PropsWithChildren, useState, useEffect } from 'react';

import { signin, signout, signup } from '../api/services/authService';

const AuthContext = createContext<any>([]);

const AuthContextProvider = (props: PropsWithChildren) => {
	const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false);

	useEffect(() => {
		const isUserAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

		setIsAuthenticated(isUserAuthenticated);
	}, []);

	const providerValue = {
		signin,
		signout,
		signup,
		setIsAuthenticated,
		isAuthenticated,
	};

	return <AuthContext.Provider value={providerValue}>{props.children}</AuthContext.Provider>;
};

export { AuthContext, AuthContextProvider };
