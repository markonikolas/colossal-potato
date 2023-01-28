import { FC } from 'react';
import { FcMenu, FcPrevious } from 'react-icons/fc';

import { INavigationToggleProps } from './types';

const NavigationToggle: FC<INavigationToggleProps> = ({ toggled, setToggled }) => {
	return (
		<div className='relative z-20 flex justify-center items-center md:hidden cursor-pointer p-3 w-12 h-12' onClick={() => setToggled(!toggled)}>
			{!toggled ? <FcMenu className='h-5 w-5' /> : <FcPrevious className='h-5 w-5' />}
		</div>
	);
};

export default NavigationToggle;
