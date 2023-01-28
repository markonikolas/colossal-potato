import { FC } from 'react';

import { IHeaderProps } from './types';

import { Link } from 'react-router-dom';
import Navigation from '../Navigation';

const Header: FC<IHeaderProps> = () => {
	return (
		<header className='grid'>
			<div className='flex justify-self-center justify-between items-center max-w-7xl w-full p-8'>
				<div id='logo'>
					<Link to='/' className='text-sm font-bold tracking-wide rounded-lg py-2 px-4 ring-blue-500  transition-colors'>
						MyBlog
					</Link>
				</div>

				<Navigation />
			</div>
		</header>
	);
};

export default Header;
