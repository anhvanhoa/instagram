import { createLogger, transports, format } from 'winston'
import envConfig from './env'

const myFormat = format.printf((format) => {
    return `[ ${format.level} ]  ${format.label}  ${format.status}  ${format.message}  ${format.timestamp}`
})

const logger = createLogger({
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        verbose: 4,
        debug: 5,
        silly: 6,
    },
    format: format.combine(format.timestamp(), myFormat),
    transports: [
        new transports.Console({
            format: format.combine(format.colorize(), myFormat),
            silent: envConfig.LOGGER_FILE,
        }),
        new transports.File({
            filename: 'src/error.log',
            level: 'error',
            silent: !envConfig.LOGGER_FILE,
        }),
    ],
})

export default logger
