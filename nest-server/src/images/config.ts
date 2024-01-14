import { randomUUID } from 'crypto'
import { Request } from 'express'
import { diskStorage } from 'multer'

export const storage = diskStorage({
    filename(_, file, callback) {
        const name = randomUUID()
        const start = file.mimetype.indexOf('/') + 1
        const extension = file.mimetype.slice(start)
        callback(null, `${name}.${extension}`)
    },
    destination: './public/images',
})

export const filter = function (
    _: Request,
    file: Express.Multer.File,
    callback: (error: Error, acceptFile: boolean) => void,
) {
    const size = 4 * 1024 * 1024
    if (file.size > size) return callback(null, false)
    if (!file.mimetype.includes('image/')) return callback(null, false)
    callback(null, true)
}
