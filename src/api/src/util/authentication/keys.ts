import fs from 'fs';
import { IKeys } from './types';

const ESDCA_A_PUBLIC_KEY = fs.readFileSync('/api/src/keys/public-a.pem');
const ESDCA_A_PRIVATE_KEY = fs.readFileSync('/api/src/keys/private-a.key');
const ESDCA_R_PUBLIC_KEY = fs.readFileSync('/api/src/keys/public-r.pem');
const ESDCA_R_PRIVATE_KEY = fs.readFileSync('/api/src/keys/private-r.key');

const ACCESS: IKeys = {
    PUBLIC: ESDCA_A_PUBLIC_KEY,
    PRIVATE: ESDCA_A_PRIVATE_KEY
}

const REFRESH: IKeys = {
    PUBLIC: ESDCA_R_PUBLIC_KEY,
    PRIVATE: ESDCA_R_PRIVATE_KEY
}

export { ACCESS, REFRESH };