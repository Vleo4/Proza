import '../Posts/Posts.scss';
import React, { useState } from 'react';
import addPost from '../../../assets/images/Posts/addPost.png';
import AlertAddPost from '../AlertAddPost/AlertAddPost';
import useResizer from '../../../utils/utils';
const PostsAdd = () => {
    const isMobile = useResizer();
    const [alert, setAlert] = useState(false);
    const toggleAlert = () => {
        setAlert(!alert);
    };
    return (
        <>
            <AlertAddPost toggleAlert={toggleAlert} alert={alert} className='complaintAlert' />
            <div className={isMobile ? 'postsAddJsxMobile' : 'postsAddJsx'}>
                <div className='text-parent'>
                    <img src={addPost} className='addPost' onClick={toggleAlert} />
                </div>
            </div>
        </>
    );
};

export default PostsAdd;
