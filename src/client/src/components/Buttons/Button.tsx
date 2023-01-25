import { FC } from 'react';
import { ButtonProps } from './types';

const Button: FC<ButtonProps> = ({ text, disabled }) => {
	return (
		<button
			disabled={disabled}
			className='py-2 px-4 text-white text-sm font-bold tracking-wide rounded-lg shadow-md bg-blue-500 ring-blue-500 focus:ring-2 hover:shadow-lg hover:shadow-blue-500/40 disabled:hover:bg-blue-400 disabled:bg-blue-300 transition-colors'>
			{text}
		</button>
	);
};

export default Button;
