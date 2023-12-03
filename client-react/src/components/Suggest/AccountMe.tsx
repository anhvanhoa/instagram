import AccountItem from '~/components/AccountItem';
import SkeletonUser from '~/components/SkeletonUser';
import httpGetUser from '~/apis/httpGetUser';
import { useEffect, useState } from 'react';
import { User } from '~/types/auth';
import { useDispatch } from 'react-redux';
import { update } from '~/store/auth.slice';
import { initialUser } from '~/types/auth';

const AccountMe = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState<User>(initialUser);
    useEffect(() => {
        httpGetUser()
            .then((res) => {
                setUser(res);
                dispatch(update(res));
            })
            .catch((error) => {
                console.log(error);
            });
    }, [dispatch]);
    return (
        <div className="mt-4 mb-3 h-16 flex flex-col justify-center ">
            {!user._id && <SkeletonUser />}
            {user._id && <AccountItem data={user} textBtn="view" description="name" />}
        </div>
    );
};

export default AccountMe;
