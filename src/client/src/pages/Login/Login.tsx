import { SyntheticEvent, useContext, useState } from 'react';
import { FiUser, FiLock, FiEye } from 'react-icons/fi';
import { Link, Navigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

import PageWrapper from '../../components/Layout/PageWrapper';
import PageTitle from '../../components/Layout/PageTitle';
import Form from '../../components/Forms/Form';
import Input from '../../components/Inputs/Input';
import PasswordInput from '../../components/Inputs/PasswordInput';
import Button from '../../components/Buttons/Button';

const Login = () => {
	const { signin, loggedIn, setLoggedIn } = useContext(AuthContext);

	const [inputValue, setInputValue] = useState('');
	const [passwordInputValue, setPasswordInputValue] = useState('');

	const onChangeHandler = (handler: Function) => (e: SyntheticEvent) => {
		e.preventDefault();
		const target = e.target as HTMLInputElement;

		handler(() => target.value);
	}

	const handleInput = onChangeHandler(setInputValue);
	const handlePasswordInput = onChangeHandler(setPasswordInputValue);
	const handleSubmit = async (e: any) => { 
		e.preventDefault();

		const token = await signin(inputValue, passwordInputValue);
			
		if(token) setLoggedIn(true);

		return token;
	};

	const inputStyle = {
		color: 'gray',
		fontSize: '1.25rem',
	};

	return (
		loggedIn ? <Navigate to={{pathname: '/'}} /> :
		<PageWrapper>
			<PageTitle title='Login' />
			<article>
				<div className='max-w-sm my-10 mx-auto p-4 xs:p-10 flex flex-col gap-4 xs:border-2 border-gray-100 rounded-md'>
					<header>
						<h1 className='font-bold text-2xl'>Please log in to continue</h1>
						<span>
							or get an{' '}
							<Link className='text-blue-600' to='/signup'>
								account
							</Link>
							.
						</span>
					</header>
					<Form method="POST" handleSubmit={handleSubmit}>
						<Input handleInput={handleInput} value={inputValue} type='text' label='Username' id='username' iconLeft={<FiUser style={inputStyle} />} />
						<PasswordInput 
							handleInput={handlePasswordInput}
							value={passwordInputValue}
							label='Password'
							id='password'
							type="password"
							iconLeft={<FiLock style={inputStyle} />}
							iconRight={<FiEye style={{ cursor: 'pointer', ...inputStyle }} />}
						/>
						<Button text="Submit" />
					</Form>
				</div>
			</article>
		</PageWrapper>
	);
}

export default Login;
