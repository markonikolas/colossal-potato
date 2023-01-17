import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

import { hashingInstanceConfig, saltingInstanceConfig } from '../config/http';

const httpInstance = (config: AxiosRequestConfig): AxiosInstance => axios.create(config);

export const hashingInstance = httpInstance(hashingInstanceConfig)
export const saltingInstance = httpInstance(saltingInstanceConfig)