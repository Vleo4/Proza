import '../Posts/Posts.scss';
import React, { useState } from 'react';
import addPost from '../../../assets/images/Posts/addPost.png';
import AlertAddPost from '../AlertAddPost/AlertAddPost';
import useResizer from '../../../utils/utils';
import AlertAddPostMobile from '../AlertAddPostMobile/AlertAddPostMobile';
const PostsAdd = () => {
    const isMobile = useResizer();
    const [alert, setAlert] = useState(false);
    const [alertMobile, setAlertMobile] = useState(false);
    const toggleAlert = () => {
        setAlert(!alert);
    };
    const toggleAlertMobile = () => {
        setAlertMobile(!alertMobile);
    };
    return (
        <>
            <AlertAddPostMobile
                toggleAlert={toggleAlertMobile}
                alert={alertMobile}
                className={'complaintAlert'}
            />
            <AlertAddPost toggleAlert={toggleAlert} alert={alert} className='complaintAlert' />
            <div className={isMobile ? 'postsAddJsxMobile' : 'postsAddJsx'}>
                <div className='text-parent'>
                    <img
                        src={addPost}
                        className='addPost'
                        onClick={() => {
                            isMobile ? toggleAlertMobile() : toggleAlert();
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default PostsAdd;
