import '../Posts/Posts.scss';
import React, { useState } from 'react';
import addPost from '../../../assets/images/Posts/addPost.png';
import AlertAddPost from '../AlertAddPost/AlertAddPost';
const PostsAdd = () => {
    const [alert, setAlert] = useState(false);
    const toggleAlert = () => {
        setAlert(!alert);
    };
    return (
        <>
            <AlertAddPost toggleAlert={toggleAlert} alert={alert} className='complaintAlert' />
            <div className='postsAddJsx'>
                <div className='text-parent'>
                    <img src={addPost} className='addPost' onClick={toggleAlert} />
                </div>
            </div>
        </>
    );
};

export default PostsAdd;
