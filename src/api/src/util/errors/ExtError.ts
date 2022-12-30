import HTTP_STATUS from '../../enum/HttpStatus';

class ExtError extends Error {

    public status: HTTP_STATUS;
    public reason: string;

    constructor(status: HTTP_STATUS, reason: string) {
        super();

        this.status = status;
        this.reason = reason;
    }

}

export default ExtError;