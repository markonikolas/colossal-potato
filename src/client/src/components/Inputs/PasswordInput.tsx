import { useState } from 'react';
import { FiEyeOff } from 'react-icons/fi';
import { InputProps } from '../../types/PropTypes';

function PasswordInput({ id, label, iconLeft, iconRight, handleInput, value }: InputProps) {
	const [visible, setVisible] = useState(false);

	const handleVisibility = () => {
		setVisible(!visible);
	};

	return (
		<div>
			<label htmlFor={id} className='block py-3 text-sm font-bold tracking-wide text-gray-500'>
				{label}
			</label>
			<div className='flex items-center p-2 px-4 border border-gray-300 rounded-md'>
				{iconLeft}
				<input
					onChange={handleInput}
					value={value}
					type={visible ? 'text' : 'password'}
					id={id}
					className='w-full p-1 ml-2 text-gray-500 outline-none focus-visible:outline-none bg-transparent'
				/>
				<span onClick={handleVisibility}>{visible ? iconRight : <FiEyeOff style={{ cursor: 'pointer' }} />}</span>
			</div>
		</div>
	);
}

export default PasswordInput;
