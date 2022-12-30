import { FC, useContext, useState, memo } from 'react';

import { Link } from 'react-router-dom';
import { Navbar } from '@material-tailwind/react';

import { IHeaderProps } from './types';

import { AuthContext } from '../../contexts/AuthContext';

const Header: FC<IHeaderProps> = ({ logo }) => {
	const [state, setState] = useState(false);
	const { loggedIn, setLoggedIn, signout } = useContext(AuthContext);

	const handleSignout = () => {
		signout();
		setLoggedIn(false);
	}

	return (
		<header>
			<Navbar className='justify-between items-center px-4 py-6 max-w-screen-xl mx-auto lg:flex lg:px-8'>
				<Link to='/'>
					<span className='text-gray-600 font-bold text-xl'>{logo}</span>
				</Link>
				<div className='lg:hidden'>
					<button className='text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border' onClick={() => setState(!state)}>
						{state ? (
							<svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' viewBox='0 0 20 20' fill='currentColor'>
								<path
									fillRule='evenodd'
									d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
									clipRule='evenodd'
								/>
							</svg>
						) : (
							<svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 8h16M4 16h16' />
							</svg>
						)}
					</button>
				</div>
				<div
					className={`justify-between flex-row-reverse lg:overflow-visible lg:flex lg:pb-0 lg:pr-0 lg:h-auto ${
						state ? 'h-screen pb-20 overflow-auto pr-4' : 'hidden'
					}`}>
					<div>
						<ul className='flex flex-col-reverse space-x-0 lg:space-x-6 lg:flex-row'>
							{
							loggedIn &&
								<Link
									to='/login'
									onClick={handleSignout}
									className='py-3 px-4 text-center border text-gray-600 hover:text-indigo-600 rounded-md block lg:inline lg:border-0'>
									Log out
								</Link>

							}

							{ loggedIn ||
							<li className='mt-4 lg:mt-0'>
								  <Link
									to='/login'
									onClick={() => setState(false)}
									className='py-3 px-4 text-center border text-gray-600 hover:text-indigo-600 rounded-md block lg:inline lg:border-0'>
									Log in
								</Link>
							</li>
							}

							{ loggedIn || 
							<li className='mt-8 lg:mt-0'>
								<Link
									to='/signup'
									onClick={() => setState(false)}
									className='py-3 px-4 text-center text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow block lg:inline'>
									Sign Up
								</Link>
							</li>
								}
						</ul>
					</div>
				</div>
			</Navbar>
		</header>
	);
}

export default memo(Header);
