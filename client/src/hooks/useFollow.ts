import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootType } from '~/store';
import httpFollowing from '~/apis/httpFollowing';
import httpUnFollow from '~/apis/httpUnFollow';
import httpCheckFollow from '~/apis/httpCheckFollow';
const useFollow = () => {
    const id = useSelector((state: RootType) => state.auth.user._id);
    const [isFollow, setFollow] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const apiCheckFollow = (idFollower: string) => {
        if (idFollower === id) return;
        httpCheckFollow({
            idFollowing: id,
            idFollower,
        }).then((res) => {
            setFollow(res.isFollowing);
        });
    };
    const apiFollow = (idFollower: string) => {
        setLoading(true);
        if (idFollower === id) return;
        httpFollowing({
            idFollowing: id,
            idFollower,
        }).then(() => {
            setFollow(true);
            setLoading(false);
        });
    };
    const apiUnFollow = (idFollower: string) => {
        setLoading(true);
        if (idFollower === id) return;
        httpUnFollow({
            idFollowing: id,
            idFollower,
        }).then(() => {
            setFollow(false);
            setLoading(false);
        });
    };

    return { loading, isFollow, apiFollow, apiUnFollow, apiCheckFollow };
};

export default useFollow;
