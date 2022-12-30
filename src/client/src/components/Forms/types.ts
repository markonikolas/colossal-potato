import { FormEventHandler, PropsWithChildren } from 'react';

export type Method = "GET" | "POST" | "PUT" | "DELETE";

export interface IFormProps {
    method: Method,
    handleSubmit: FormEventHandler,
    children: PropsWithChildren['children']
}
