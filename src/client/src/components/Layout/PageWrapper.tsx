import { PropsWithChildren } from 'react';

const PageWrapper = (props: PropsWithChildren) => {
	return <main className='my-10 mx-auto p-4 max-w-7xl lg:px-8 grid gap-5'>{props.children}</main>;
}

export default PageWrapper;
