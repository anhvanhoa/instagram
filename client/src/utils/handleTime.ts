function formatTimeAgo(isoDateString: string) {
    const currentDate = Date.now()
    const providedDate = Date.parse(isoDateString)
    const timeDifferenceInSeconds = Math.floor((currentDate - providedDate) / 1000)
    if (timeDifferenceInSeconds < 60) {
        return `${timeDifferenceInSeconds}s`
    } else if (timeDifferenceInSeconds < 3600) {
        const minutes = Math.floor(timeDifferenceInSeconds / 60)
        return `${minutes}m`
    } else if (timeDifferenceInSeconds < 86400) {
        const hours = Math.floor(timeDifferenceInSeconds / 3600)
        return `${hours}h`
    } else {
        const days = Math.floor(timeDifferenceInSeconds / 86400)
        return `${days}d`
    }
}

function formatTime(isoDateString: string) {
    const date = new Date(isoDateString)
    return date.toLocaleString('en', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    })
}
export { formatTime, formatTimeAgo }
