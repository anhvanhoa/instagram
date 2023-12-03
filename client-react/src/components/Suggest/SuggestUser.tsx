import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User } from '~/types/auth';
import SkeletonUser from '~/components/SkeletonUser';
import AccountItem from '~/components/AccountItem';
import { useSelector } from 'react-redux';
import { RootType } from '~/store';
import httpSuggestUser from '~/apis/httpSuggestUser';
const SuggestUser = () => {
    const id = useSelector((state: RootType) => state.auth.user._id);
    const [suggest, setSuggest] = useState<User[]>([]);
    const apiSuggestUser = async (id: string) => {
        try {
            const res = await httpSuggestUser(id, 5);
            if (!res.length) {
                res.length = 1;
            }
            setSuggest(res);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        apiSuggestUser(id);
    }, [id]);
    return (
        <div>
            <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 font-semibold">Gợi ý cho bạn</span>
                <Link to="/" className="text-xs font-semibold">
                    Xem tất cả
                </Link>
            </div>
            <div className="py-2">
                {!suggest.length && (
                    <>
                        <SkeletonUser />
                        <SkeletonUser />
                        <SkeletonUser />
                    </>
                )}
                {suggest.map((element) => (
                    <div key={element._id} className="py-2">
                        <AccountItem data={element} textBtn="follow" dropDow description="suggest" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SuggestUser;
