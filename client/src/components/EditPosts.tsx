import { Posts } from '~/types/posts'
import AccountItem from './AccountItem'
import OverLay from './OverLay'
import classNames from 'classnames'
import Slider from './Slider'
import Img from './Img'
import Button from './Button'
import { useMutation } from '@tanstack/react-query'
import editPostRequest from '~/apis/editPostRequest'
import { useState } from 'react'
interface Props {
    posts: Posts
    onClose: () => void
    onSuccess: () => void
}
const EditPosts: React.FC<Props> = ({ posts, onClose, onSuccess }) => {
    const [title, setTitle] = useState(posts.title)
    const editPost = useMutation({
        mutationFn: (title: string) =>
            editPostRequest({
                _id: posts._id,
                title,
            }),
        onSuccess: () => {
            onSuccess()
            onClose()
        },
    })
    const handleEditPost = () => editPost.mutate(title)
    return (
        <div>
            <OverLay onClose={editPost.isPending ? () => {} : onClose} className='px-4'>
                <div className='flex py-2 px-4 justify-between bg-white rounded-t-xl'>
                    <Button disable={editPost.isPending} onClick={onClose} type='text' className='text-red-500'>
                        Cancel
                    </Button>
                    <h3 className='leading-8 font-semibold text-lg'>Edit posts</h3>
                    <Button
                        className='w-8'
                        disable={editPost.isPending}
                        loading={editPost.isPending}
                        onClick={handleEditPost}
                        type='text'
                    >
                        Next
                    </Button>
                </div>
                <div className='justify-center overflow-hidden flex flex-col md:flex-row'>
                    <div
                        className={classNames(
                            'bg-white md:min-w-[350px] md:max-w-[550px] md:max-h-[550px] flex items-center border border-r-0 border-r-transparent',
                        )}
                    >
                        <Slider maxElemnt={posts.contents.length}>
                            {posts.contents.map((img, index) => (
                                <div key={index} className='flex-shrink-0 w-full'>
                                    <Img
                                        src={img}
                                        className='rounded-sm md:rounded-none h-[400px] md:max-h-[550px] md:min-h-[500px] object-contain w-full'
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                    <div
                        className={classNames(
                            'flex-shrink-0 md:w-72 border relative overflow-y-auto bg-white',
                            'h-52 md:h-[550px] flex flex-col',
                        )}
                    >
                        <div className='sticky top-0 bg-white'>
                            <div className='flex justify-between items-center px-4 py-3 border-b'>
                                <AccountItem user={posts.author} size='small' />
                            </div>
                        </div>
                        <div className='pb-4 flex-1'>
                            <div className='mt-2 px-2'>
                                <textarea
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder='What are you thinking ?'
                                    className='w-full h-28 md:h-52 resize-none p-1 text-gray-500 outline-none focus:text-black/80'
                                    defaultValue={posts.title}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </OverLay>
        </div>
    )
}

export default EditPosts
