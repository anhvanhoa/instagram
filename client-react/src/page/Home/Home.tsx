import cln from 'classnames';
import { Icon } from '@iconify/react';
import StoryItem from '~/components/StoryItem';
import Suggest from '~/components/Suggest';
import EndPosts from '~/components/EndPosts/EndPosts';
import Posts from '~/components/Posts/Posts';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootType } from '~/store';
import httpListPosts from '~/apis/httpListPosts';
import { Posts as TypePosts } from '~/types/posts';
import SkeletonPosts from '~/components/SkeletonPosts';
import ListPosts from '~/components/ListPosts';
const Home = () => {
    // const [listPosts, setListPosts] = useState<TypePosts[]>([]);
    // const id = useSelector((state: RootType) => state.auth.user._id);
    // useEffect(() => {
    //     httpListPosts({ id }).then((res) => {
    //         setListPosts(res);
    //     });
    // }, [id]);
    return (
        <main className="flex-1">
            <div className={cln('flex', 'justify-center', 'mx-auto', 'pt-1')}>
                <div className={cln('mr-8', 'max-w-[630px]', 'w-full')}>
                    <div className="p-2">
                        <Icon className="mx-auto text-3xl text-gray-500 animate-spin hidden" icon="lucide:loader" />
                    </div>
                    <div className={cln('mt-4', 'py-4', 'bg-white', 'rounded-md')}>
                        <div className={cln('flex', 'gap-x-4')}>
                            <StoryItem
                                avatar="https://anhvanhoa.com/image/avatar.jpg"
                                userName="Tin của bạn"
                                isStory={false}
                                to="/story/anhvhoa"
                            />
                        </div>
                    </div>
                    <div className="w-[470px] mx-auto">
                        <ListPosts />
                        <div>
                            <EndPosts />
                        </div>
                        <div>
                            <h4 className="mt-3 text-xl">Bài viết gợi ý</h4>
                        </div>
                        <div>{/* <Posts /> */}</div>
                    </div>
                </div>
                <div className="pl-16">
                    <Suggest />
                </div>
            </div>
        </main>
    );
};

export default Home;
