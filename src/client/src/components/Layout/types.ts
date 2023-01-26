
export interface IPageTitleProps {
    title: string,
    desc?: string
}

export interface IHeaderProps {
    logo: string
}

export interface IPageWrapperProps {
    children: JSX.Element | JSX.Element[];
    className?: string
}