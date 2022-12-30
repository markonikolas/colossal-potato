import { FC } from 'react';
import { ButtonProps } from './types';

const Button: FC<ButtonProps>= ({text, disabled}) => {
  return (
	  <button
        disabled={disabled}
        className='p-3 mt-6 text-white duration-100 bg-blue-600 rounded-md shadow-md focus:shadow-none ring-offset-2 ring-blue-600 focus:ring-2 hover:bg-blue-700 font-bold text-md uppercase tracking-wide disabled:hover:bg-blue-400 disabled:bg-blue-400'>
        {text}
    </button>
  )
}

export default Button;