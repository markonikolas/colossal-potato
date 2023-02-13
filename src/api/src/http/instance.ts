import axios, { AxiosInstance, RawAxiosRequestConfig } from 'axios'

import { hashingInstanceConfig, saltingInstanceConfig } from '../config/http';

const httpInstance = (config: RawAxiosRequestConfig): AxiosInstance => axios.create(config);

export const hashingInstance = httpInstance(hashingInstanceConfig)
export const saltingInstance = httpInstance(saltingInstanceConfig)