import { randomUUID } from 'crypto'
import multer from 'multer'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/../../public/images`)
    },
    filename: async (req, file, cb) => {
        const name = randomUUID()
        const start = file.mimetype.indexOf('image/') + 6
        const extension = file.mimetype.slice(start)
        cb(null, `${name}.${extension}`)
    },
})
const saveImage = multer({
    storage,
    fileFilter(req, file, callback) {
        if (!file.mimetype.includes('image/')) return callback(null, false)
        callback(null, true)
    },
}).single('images')
export default saveImage
