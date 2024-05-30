import { useEffect, useState } from 'react'
const useResize = () => {
    /**
     * @returns {boolean}
     * true: window.innerWidth < 768
     * false: window.innerWidth >= 768
     */
    const [navbar, setNavbar] = useState(() => window.innerWidth > 768 || false)
    const resize = () => (window.innerWidth < 768 ? setNavbar(false) : setNavbar(true))
    useEffect(() => {
        window.addEventListener('resize', resize)
        return () => {
            window.removeEventListener('resize', resize)
        }
    }, [])
    return navbar
}

export default useResize
