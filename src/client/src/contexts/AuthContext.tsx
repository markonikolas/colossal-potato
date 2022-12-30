import { createContext, PropsWithChildren, useState, useEffect } from "react";

import { signin, signout, signup } from '../api/services/authService';

const AuthContext = createContext<any>([]);

const AuthContextProvider = (props: PropsWithChildren) => {

    const [loggedIn, setLoggedIn] = useState<Boolean>(false);
   
    useEffect(() => {
        const isUserLoggedIn = localStorage.getItem('loggedIn') === 'true' ? true : false;
        
        setLoggedIn(isUserLoggedIn);

    }, [loggedIn])
    
    const providerValue = {
        signin,
        signout,
        signup,
        setLoggedIn,
        loggedIn,
    };

    return(
        <AuthContext.Provider value={providerValue}>
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthContextProvider };