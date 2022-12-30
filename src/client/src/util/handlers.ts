import { SyntheticEvent } from 'react';

export const setValueForInputElement = (handler: Function) => (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;

    handler(target.value);
}