import { ChangeEventHandler, ReactElement } from 'react';

export type InputProps = {
	id: string,
	type: string,
	label: string,
	iconLeft?: string | ReactElement,
	iconRight?: string | ReactElement,
	handleInput: ChangeEventHandler,
	value: string
}

export type UserLogin = {
	username: string,
	password: string
}
