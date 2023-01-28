import { Link } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

const Navigation = () => {
	const { isAuthenticated, setIsAuthenticated, signout } = useAuth();

	return (
		<nav className='flex gap-x-4'>
			<Link className='text-sm font-bold py-2 px-4 rounded-lg hover:text-blue-500 transition-colors' to='/'>
				Home
			</Link>
			<Link className='text-sm font-bold py-2 px-4 rounded-lg hover:text-blue-500 transition-colors' to='/blog'>
				Blog
			</Link>
			{isAuthenticated ? (
				<Link className='text-sm font-bold py-2 px-4 rounded-lg hover:text-blue-500 transition-colors' to='/dashboard'>
					Dashboard
				</Link>
			) : (
				<Link className='text-sm font-bold py-2 px-4 rounded-lg hover:text-blue-500 transition-colors' to='/signup'>
					Sign up
				</Link>
			)}

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
		</nav>
	);
};

export default Navigation;
