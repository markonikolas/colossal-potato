import { RawAxiosRequestConfig } from 'axios'

export const hashingInstanceConfig: RawAxiosRequestConfig = {
    baseURL: process.env.HASHING_API_URL,
}

export const saltingInstanceConfig: RawAxiosRequestConfig = {
    baseURL: process.env.SALTING_API_URL,
}