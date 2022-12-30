import { createContext, PropsWithChildren } from "react";
import { getAllPosts } from '../api/services/blogService';

const BlogContext = createContext<any>([]);

const BlogContextProvider = (props: PropsWithChildren) => {

    const providerValue = {
        fetchBlogs: getAllPosts
    };

    return(
        <BlogContext.Provider value={providerValue}>
            {props.children}
        </BlogContext.Provider>
    );
}

export { BlogContext, BlogContextProvider };