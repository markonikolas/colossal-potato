import { Response } from "express";

export function processError(error: any, res: Response) {
    console.error(error)
    if (error.status && error.status < 500)
        return res.status(error.status).json({ message: error.reason });

    return res.status(500).json({ message: 'An error occured during your request.' });
};
