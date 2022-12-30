import { FC } from 'react';
import { IFormProps } from './types';

const Form: FC<IFormProps> = ({ method, handleSubmit, children}) => {

  return (
        <form method={method} onSubmit={handleSubmit} autoComplete='off' className='flex flex-col gap-4'>
          {children}
        </form>
  );
}

export default Form;