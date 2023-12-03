import dataMenu from '~/dataDefault/dataMenu';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import httpLogout from '~/apis/httpLogout';
import { useDispatch } from 'react-redux';

const BoxMenu = () => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        httpLogout().then(() => dispatch({ type: 'auth/logout' }));
    };
    return (
        <div className={classNames('w-[268px] overflow-hidden rounded-2xl bg-[#F4F4F4]')}>
            <ul className={classNames('bg-white list-none p-2 rounded-t-2xl')}>
                {dataMenu.map((element, index) => {
                    if (element.to) {
                        return (
                            <li key={index}>
                                <Link
                                    to={element.to}
                                    className={classNames(
                                        'flex items-center p-4 hover:bg-hovSidebar rounded-xl transition-all',
                                    )}
                                >
                                    <span>
                                        <img src={element.icon} alt={element.name} />
                                    </span>
                                    <span className={classNames('mb-[3px] pl-3')}>{element.name}</span>
                                </Link>
                            </li>
                        );
                    } else {
                        return (
                            <li key={index}>
                                <div
                                    className={classNames(
                                        'flex items-center p-4 hover:bg-hovSidebar rounded-xl transition-all',
                                    )}
                                >
                                    <span>
                                        <img src={element.icon} alt={element.name} />
                                    </span>
                                    <span className={classNames('mb-[3px] pl-3')}>{element.name}</span>
                                </div>
                            </li>
                        );
                    }
                })}
            </ul>
            <ul className={classNames('bg-white list-none p-2 rounded-b-2xl mt-2')}>
                <li onClick={handleLogout} className={classNames('p-4 cursor-pointer hover:bg-hovSidebar rounded-xl')}>
                    <p>Đăng xuất</p>
                </li>
            </ul>
        </div>
    );
};

export default BoxMenu;
