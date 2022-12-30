import { SyntheticEvent, useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiLock, FiUnlock, FiUser, FiEye } from 'react-icons/fi';

import { setValueForInputElement } from '../../util/handlers';

import { AuthContext } from '../../contexts/AuthContext';

import PageWrapper from '../../components/Layout/PageWrapper';
import PageTitle from '../../components/Layout/PageTitle';
import Form from '../../components/Forms/Form';
import Input from '../../components/Inputs/Input';
import PasswordInput from '../../components/Inputs/PasswordInput';
import Button from '../../components/Buttons/Button';

const Signup = () => {

	const { signup } = useContext(AuthContext);

	const [usernameInput, setUsernameInput] = useState('');
	const [emailInput, setEmailInput] = useState('');
	const [passwordInput, setPasswordInput] = useState('');
	const [repeatPasswordInput, setRepeatPasswordInput] = useState('');

	const handleUsernameInput = setValueForInputElement(setUsernameInput);
	const handleEmailInput = setValueForInputElement(setEmailInput);
	const handlePasswordInput = setValueForInputElement(setPasswordInput);
	const handleRepeatPasswordInput = setValueForInputElement(setRepeatPasswordInput);

	const handleSubmit = async (event: SyntheticEvent) => {
		event.preventDefault();
		
		const register = await signup(usernameInput, emailInput, passwordInput);
	
		console.log(register);
	}

	return (
		<PageWrapper>
			<PageTitle title='Signup' />
			<article>
				<div className='max-w-sm my-10 mx-auto p-4 xs:p-10 flex flex-col gap-4 xs:border-2 border-gray-100 rounded-md'>
					<header>
						<h1 className='font-bold text-2xl'>Create an account</h1>
						<span>
							or log in{' '}
							<Link className='text-blue-600' to='/login'>
								here
							</Link>
							.
						</span>
					</header>

					<Form method="POST" handleSubmit={handleSubmit}>

						<Input 
							id='username' 
							type='text' 
							label='Username' 
							iconLeft={<FiUser />} 
							value={usernameInput} 
							handleInput={handleUsernameInput} 
						/>

						<Input 
							id='email' 
							type='text' 
							label='Email' 
							iconLeft={<FiMail />}
							value={emailInput} 
							handleInput={handleEmailInput} 
						 />

						<PasswordInput
							id='password'
							type='password'
							label='Password'
							iconLeft={<FiUnlock />}
							iconRight={<FiEye style={{ cursor: 'pointer' }}/>}
							value={passwordInput}
							handleInput={handlePasswordInput}
						/>

						<PasswordInput
							id='repeat-password'
							type='password'
							label='Repeat Password'
							iconLeft={<FiLock />}
							iconRight={<FiEye style={{ cursor: 'pointer' }} />}
							value={repeatPasswordInput}
							handleInput={handleRepeatPasswordInput}
						/>	

						<Button text="Submit" />
					</Form>
				</div>
			</article>
		</PageWrapper>
	);
}

export default Signup;
