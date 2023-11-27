import { Link } from 'react-router-dom';
const NotFound = () => {
    return (
        <div className="w-full">
            <div className="text-center">
                <h2 className="font-semibold text-2xl py-8">Rất tiếc, trang này hiện không khả dụng.</h2>
                <p>
                    Liên kết bạn theo dõi có thể bị hỏng hoặc trang này có thể đã bị gỡ.{' '}
                    <Link to="/">Quay lại Instagram.</Link>
                </p>
            </div>
        </div>
    );
};

export default NotFound;
