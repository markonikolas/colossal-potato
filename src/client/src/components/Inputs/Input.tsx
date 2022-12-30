import { InputProps } from '../../types/PropTypes';

function Input({ id, type, label, iconLeft, iconRight, handleInput, value }: InputProps) {
	return (
		<>
			<label htmlFor={id} className='block py-3 text-sm font-bold tracking-wide text-gray-500'>
				{label}
			</label>
			<div className='flex items-center p-2 px-4 border border-gray-300 rounded-md'>
				{iconLeft}
				<input
					onChange={handleInput}
					type={type}
					id={id}
					className='w-full p-1 ml-2 text-gray-500 outline-none focus-visible:outline-none bg-transparent'
					value={value}
				/>
				<span>{iconRight}</span>
			</div>
		</>
	);
}

export default Input;
