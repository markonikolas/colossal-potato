import { AxiosRequestConfig } from 'axios'

export const hashingInstanceConfig: AxiosRequestConfig = {
    baseURL: process.env.HASHING_API_URL,
}

export const saltingInstanceConfig: AxiosRequestConfig = {
    baseURL: process.env.SALTING_API_URL,
}