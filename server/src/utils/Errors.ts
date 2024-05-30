import { JsonWebTokenError } from 'jsonwebtoken'
import { MongoServerError } from 'mongodb'
import mongoose from 'mongoose'
import logger from '~/config/logger'
import { HttpStatus } from '~/http-status.enum'

export function isMongoServerError(error: any): error is MongoServerError {
    return error.name === 'MongoServerError'
}

export function isJsonWebTokenError(error: any): error is JsonWebTokenError {
    return error instanceof JsonWebTokenError
}
export function isCastError(error: any): error is mongoose.Error.CastError {
    return error instanceof mongoose.Error.CastError
}

export function isRequestError(error: any): error is RequestError {
    return error instanceof RequestError
}

export function isError(error: any): RequestError {
    if (isRequestError(error)) {
        logger.log({
            level: 'error',
            message: error.message,
            label: error.name,
            status: error.httpStatus,
        })
        return error
    }
    if (isJsonWebTokenError(error)) {
        const unauthorizedError = new UnauthorizedError({ message: error.message })
        logger.log({
            level: 'error',
            message: unauthorizedError.message,
            label: unauthorizedError.name,
            status: unauthorizedError.httpStatus,
        })
        return unauthorizedError
    }
    if (isCastError(error)) {
        const castError = new NotFoundError({ message: error.message })
        logger.log({
            level: 'error',
            message: castError.message,
            label: castError.name,
            status: castError.httpStatus,
        })
        return castError
    }
    const errorUnknown = new ServerRequestError({
        message: error.message || 'Unknown error',
        errors: error,
    })
    logger.log({
        level: 'error',
        message: errorUnknown.message,
        label: errorUnknown.name,
        status: errorUnknown.httpStatus,
    })
    return errorUnknown
}

export class RequestError extends Error {
    httpStatus: number
    message: string
    errors?: any
    constructor(
        name: string,
        {
            message,
            httpStatus,
            errors,
        }: {
            message: string
            httpStatus: number
            errors?: any
        },
    ) {
        super(name)
        this.errors = errors
        this.message = message
        this.httpStatus = httpStatus
    }
}

export class BadRequestError<T> extends RequestError {
    httpStatus: 400
    name: 'BadRequestError'
    constructor({ message, errors }: { message: string; errors?: T }) {
        const nameError = 'BadRequestError'
        super(nameError, { message, httpStatus: HttpStatus.BAD_REQUEST, errors })
        this.httpStatus = HttpStatus.BAD_REQUEST
        this.message = message
        this.name = nameError
    }
}

export class UnauthorizedError extends RequestError {
    httpStatus: 401
    name: 'UnauthorizedError'
    constructor({ message, errors }: { message: string; errors?: any }) {
        const nameError = 'UnauthorizedError'
        super(nameError, {
            message,
            httpStatus: HttpStatus.UNAUTHORIZED,
            errors,
        })
        this.httpStatus = HttpStatus.UNAUTHORIZED
        this.name = nameError
    }
}
export class NotFoundError extends RequestError {
    httpStatus: 404
    name: 'NotFoundError'
    constructor({ message, errors }: { message: string; errors?: any }) {
        const nameError = 'NotFoundError'
        super(nameError, {
            message,
            httpStatus: HttpStatus.NOT_FOUND,
            errors,
        })
        this.httpStatus = HttpStatus.NOT_FOUND
        this.name = nameError
    }
}

export class ServerRequestError extends RequestError {
    httpStatus: 500
    name: 'ServerRequestError'
    constructor({ message, errors }: { message: string; errors?: any }) {
        const nameError = 'ServerRequestError'
        super(nameError, {
            message,
            httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
            errors,
        })
        this.httpStatus = HttpStatus.INTERNAL_SERVER_ERROR
        this.name = nameError
    }
}
