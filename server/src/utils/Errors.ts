import { MongoServerError } from 'mongodb'

export function isMongoServerError(error: any): error is MongoServerError {
    return error.name === 'MongoServerError'
}
