import { Link } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

const Navigation = () => {
	const { isAuthenticated, setIsAuthenticated, signout } = useAuth();

	return (
		<nav className='absolute flex flex-col md:flex-row gap-x-4 right-0 translate-x-full md:static md:translate-x-0'>
			<Link className='text-sm font-bold py-2 px-4 rounded-lg hover:text-blue-600 transition-colors' to='/'>
				Home
			</Link>

			<Link className='text-sm font-bold py-2 px-4 rounded-lg hover:text-blue-600 transition-colors' to='/blog'>
				Blog
			</Link>

			{isAuthenticated ? (
				<Link className='text-sm font-bold py-2 px-4 rounded-lg hover:text-blue-600 transition-colors' to='/dashboard'>
					Dashboard
				</Link>
			) : (
				<Link className='text-sm font-bold py-2 px-4 rounded-lg hover:text-blue-600 transition-colors' to='/signup'>
					Sign up
				</Link>
			)}

			<div className='flex gap-x-4'>
				{!isAuthenticated ? (
					<Link
						to='/login'
						className='py-2 px-4 border-2 border-blue-600 bg-blue-600 text-white hover:bg-white hover:text-blue-600 hover:shadow-blue-200 hover:border-white tranition-colors duration-700 text-sm font-bold tracking-wide rounded-lg shadow-xl shadow-blue-100 focus:outline-none transition-colors cursor-pointer'>
						Log in
					</Link>
				) : (
					<span
						className='py-2 px-4 border-2 border-white text-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-blue-200 hover:border-blue-600 tranition-colors duration-700 text-sm font-bold tracking-wide rounded-lg shadow-xl shadow-blue-100 focus:outline-none transition-colors cursor-pointer'
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
