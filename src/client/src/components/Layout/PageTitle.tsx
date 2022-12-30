import { FC } from 'react';
import { IPageTitleProps } from './types';

const PageTitle: FC<IPageTitleProps>= ({ title, desc }) => {
	return (
		<div className='text-left'>
			<h1 className='text-7xl text-gray-800 font-semibold'>{title}</h1>
			<p className='mt-3 text-xl text-gray-500'>{desc}</p>
		</div>
	);
}

export default PageTitle;
