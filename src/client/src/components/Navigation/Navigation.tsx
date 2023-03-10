import { FC, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

import { INavigationToggleProps } from './types';

const Navigation: FC<INavigationToggleProps> = ({ toggled, setToggled }) => {
	const { isAuthenticated, setIsAuthenticated, signout } = useAuth();

	const ref = useRef(null);

	const closeMenu = () => setToggled(false);

	useEffect(() => {
		const navigation = ref.current! as HTMLElement;

		if (toggled) {
			navigation.classList.replace('translate-x-full', 'translate-x-1/4');
			return;
		}

		navigation.classList.replace('translate-x-1/4', 'translate-x-full');
	}, [toggled]);

	return (
		<nav
			ref={ref}
			className='absolute flex z-10 flex-col md:flex-row gap-x-4 gap-y-4 px-12 py-24 md:p-0 md:shadow-none inset-0 bg-white translate-x-full md:static md:translate-x-0 transition-transform duration-700 shadow-2xl'>
			<Link onClick={closeMenu} className='text-sm font-bold py-2 px-4 rounded-lg hover:text-blue-600 transition-colors' to='/'>
				Home
			</Link>

			<Link onClick={closeMenu} className='text-sm font-bold py-2 px-4 rounded-lg hover:text-blue-600 transition-colors' to='/blog'>
				Blog
			</Link>

			{isAuthenticated ? (
				<Link onClick={closeMenu} className='text-sm font-bold py-2 px-4 rounded-lg hover:text-blue-600 transition-colors' to='/dashboard'>
					Dashboard
				</Link>
			) : (
				<Link onClick={closeMenu} className='text-sm font-bold py-2 px-4 rounded-lg hover:text-blue-600 transition-colors' to='/signup'>
					Sign up
				</Link>
			)}

			<div className='flex gap-x-4'>
				{!isAuthenticated ? (
					<Link
						onClick={closeMenu}
						to='/login'
						className='py-2 px-4 border-2 border-blue-600 bg-blue-600 text-white hover:bg-white hover:text-blue-600 hover:shadow-blue-200 hover:border-white tranition-colors duration-700 text-sm font-bold tracking-wide rounded-lg shadow-xl shadow-blue-100 focus:outline-none transition-colors cursor-pointer'>
						Log in
					</Link>
				) : (
					<span
						className='py-2 px-4 border-2 border-white text-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-blue-200 hover:border-blue-600 tranition-colors duration-700 text-sm font-bold tracking-wide rounded-lg shadow-xl shadow-blue-100 focus:outline-none transition-colors cursor-pointer'
						tabIndex={0}
						onClick={() => {
							closeMenu();
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
