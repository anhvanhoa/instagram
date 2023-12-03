import { Link } from 'react-router-dom';

const dataFooterSuggest = [
    {
        id: 1,
        title: 'Giới thiệu',
        to: '/',
    },
    {
        id: 2,
        title: 'Trợ giúp',
        to: '/a',
    },
    {
        id: 3,
        title: 'Báo chí',
        to: '/a',
    },
    {
        id: 4,
        title: 'API',
        to: '/api',
    },
    {
        id: 5,
        title: 'Việc làm',
        to: '/a',
    },
    {
        id: 6,
        title: 'Quyền riêng tư',
        to: '/a',
    },
    {
        id: 7,
        title: 'Điều khoản',
        to: '/a',
    },
    {
        id: 8,
        title: 'Vị trí',
        to: '/a',
    },
    {
        id: 9,
        title: 'Ngôn ngữ',
    },
    {
        id: 10,
        title: 'Mate đã xác minh',
        to: '/a',
    },
];

const Footer = () => {
    return (
        <div className="mt-3 pb-9">
            <div className="mb-4">
                <ul className={'flex items-center gap-x-3 mb-1 flex-wrap'}>
                    {dataFooterSuggest.map((element) => {
                        return element.to ? (
                            <li key={element.id}>
                                <Link to={element.to} className="text-xs text-[#c7c7c7]">
                                    {element.title}
                                </Link>
                            </li>
                        ) : (
                            <li key={element.id}>
                                <div className={'text-xs text-[#c7c7c7]'}>{element.title}</div>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <p className="text-xs text-[#c7c7c7]">© 2023 INSTAGRAM FROM META</p>
        </div>
    );
};

export default Footer;
