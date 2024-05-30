const copyLinkPost = (id: string) => {
    const url = `${location.origin}/p/${id}`
    navigator.clipboard.writeText(url)
}

const stopPropagation =
    (isStopPropagation?: boolean) =>
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        /**
         * @param {boolean} isStopPropagation
         * @param {React.MouseEvent<HTMLDivElement, MouseEvent>} e
         */
        isStopPropagation && e.stopPropagation()
    }

const darkMode = () => {
    const html = window.document.lastElementChild
    const theme = localStorage.getItem('theme')
    html?.classList.toggle('dark')
    if (theme === 'dark') localStorage.removeItem('theme')
    else localStorage.setItem('theme', 'dark')
}

const convertBioToHtml = (bio: string) => {
    return bio.replace(/\n/g, '<br/>')
}

export { copyLinkPost, stopPropagation, darkMode, convertBioToHtml }
