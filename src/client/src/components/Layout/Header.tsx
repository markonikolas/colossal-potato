import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { IHeaderProps } from './types';

import Navigation from '../Navigation/Navigation';
import NavigationToggle from '../Navigation/NavigationToggle';

const Header: FC<IHeaderProps> = () => {
	const [toggled, setToggled] = useState(false);

	return (
		<header className='grid overflow-hidden'>
			<div className='flex justify-self-center justify-between items-center max-w-7xl w-full p-8'>
				<div id='logo'>
					<Link to='/' className='-ml-4 text-sm font-bold tracking-wide rounded-lg py-2 px-4 ring-blue-500  transition-colors'>
						MyBlog
					</Link>
				</div>

				<Navigation toggled={toggled} setToggled={setToggled} />

				<NavigationToggle toggled={toggled} setToggled={setToggled} />
			</div>
		</header>
	);
};

export default Header;
