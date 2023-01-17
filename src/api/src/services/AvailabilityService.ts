import { AxiosInstance } from 'axios'
import { hashingInstance, saltingInstance } from '../http/instance';

const isServiceAlive = (instance: AxiosInstance) => 
    instance.get('/availability');

export const isHashingServiceAlive = () => isServiceAlive(hashingInstance)

export const isSaltingServiceAlive = () => isServiceAlive(saltingInstance)
