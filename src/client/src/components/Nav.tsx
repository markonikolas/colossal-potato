import { Link } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

const Nav = () => {
	const { isAuthenticated } = useAuth();

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
		</nav>
	);
};

export default Nav;
