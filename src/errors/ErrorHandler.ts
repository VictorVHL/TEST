import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/CustomError';
import { ErrorResponse } from '../responses/ErrorResponse';

export const errorHandler = (
    err: Error, 
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    let response: ErrorResponse;

    if (err instanceof CustomError) {
        response = new ErrorResponse(err.serializeErrors());
        return res.status(err.statusCode).send(response)
    }
    response = new ErrorResponse([{ message: err.message }]);
    return res.status(500).send(response);
};