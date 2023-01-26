import { FC } from 'react';
import { IPageWrapperProps } from './types';

const PageWrapper: FC<IPageWrapperProps> = ({ children, className }) => {
	return <main className={`my-10 mx-auto p-4 max-w-7xl lg:px-8 grid gap-5 ${className}`}>{children}</main>;
};

export default PageWrapper;
