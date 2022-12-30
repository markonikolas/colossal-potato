import { PropsWithChildren } from 'react';
import { BlogContextProvider } from "./BlogContext";
import { AuthContextProvider } from './AuthContext';

const GlobalContextProvider = (props: PropsWithChildren) => {
    return(
        <BlogContextProvider> 
            <AuthContextProvider>
                {props.children}
            </AuthContextProvider>
        </BlogContextProvider>
    );
}

export default GlobalContextProvider;