import { Link } from 'react-router-dom'
const NotFound = () => {
    return (
        <div className='w-full px-8'>
            <div className='text-center'>
                <h2 className='font-semibold text-2xl py-8'>Sorry, this page isn't available.</h2>
                <p>
                    The link you followed may be broken, or the page may have been removed.
                    <Link className='text-primary font-medium' to='/'>
                        Go back to Instagram.
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default NotFound
