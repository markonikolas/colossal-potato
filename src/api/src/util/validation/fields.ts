import HTTP_STATUS from '../../enum/HttpStatus';
import ExtError from '../errors/ExtError';

export const isCredentialEmpty = (code: HTTP_STATUS) => (fieldName: string) => (field: string | Buffer) => {
    if (!field) {
        throw new ExtError(code, `${fieldName} can\'t be empty.`);
    }
}