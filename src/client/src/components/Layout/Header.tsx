import { FC } from 'react';

import useAuth from '../../hooks/useAuth';

import { IHeaderProps } from './types';

import { Link } from 'react-router-dom';
import Nav from '../Nav';

const Header: FC<IHeaderProps> = () => {
	const { setIsAuthenticated, isAuthenticated, signout } = useAuth();

	return (
		<header className='grid'>
			<div className='flex justify-self-center justify-between items-center max-w-7xl w-full p-8'>
				<div id='logo'>
					<Link to='/' className='text-sm font-bold tracking-wide rounded-lg py-2 px-4 ring-blue-500  transition-colors'>
						MyBlog
					</Link>
				</div>

				<Nav />

				<div className='flex gap-x-4'>
					{!isAuthenticated ? (
						<Link
							to='/login'
							className='py-2 px-4 text-white text-sm font-bold tracking-wide rounded-lg border-1 border-blue-500 shadow-md bg-blue-500 ring-blue-500 focus:ring-2 hover:shadow-lg hover:shadow-blue-500/40 focus:outline-none transition-colors'>
							Log in
						</Link>
					) : (
						<span
							className='py-2 px-4 text-blue-600 text-sm font-bold tracking-wide rounded-lg shadow-md ring-blue-500 focus:ring-2 hover:shadow-lg hover:shadow-blue-500/40 focus:outline-none transition-colors cursor-pointer'
							tabIndex={0}
							onClick={() => {
								setIsAuthenticated(false);
								signout();
							}}>
							Log out
						</span>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
