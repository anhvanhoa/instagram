import Posts from '~/components/Posts';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootType } from '~/store';
import httpListPosts from '~/apis/httpListPosts';
import { Posts as TypePosts } from '~/types/posts';
import SkeletonPosts from '~/components/SkeletonPosts';
const ListPosts = () => {
    const [listPosts, setListPosts] = useState<TypePosts[]>([]);
    const id = useSelector((state: RootType) => state.auth.user._id);
    useEffect(() => {
        httpListPosts({ id }).then((res) => {
            setListPosts(res);
        });
    }, [id]);
    return (
        <div>
            {!listPosts.length && (
                <>
                    <SkeletonPosts />
                    <SkeletonPosts />
                </>
            )}
            {listPosts.map((element) => (
                <Posts
                    key={element._id}
                    _id={element._id}
                    author={element.author}
                    comments={element.comments}
                    contents={element.contents}
                    description={element.description}
                    likes={element.likes}
                    tags={element.tags}
                />
            ))}
        </div>
    );
};

export default ListPosts;
