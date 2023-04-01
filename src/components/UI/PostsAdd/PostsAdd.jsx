import './PostsAdd.scss';
import addPost from '../../../assets/images/Posts/addPost.png';
import AlertAddPost from '../AlertAddPost/AlertAddPost';
import useResizer from '../../../utils/utils';
import AlertAddPostMobile from '../AlertAddPostMobile/AlertAddPostMobile';
import { useState } from 'react';
const PostsAdd = () => {
    const [alert, setAlert] = useState(false);
    const [alertMobile, setAlertMobile] = useState(false);
    const toggleAlert = () => {
        setAlert(!alert);
    };
    const toggleAlertMobile = () => {
        setAlertMobile(!alertMobile);
    };
    const isMobile = useResizer();
    return (
        <>
            <AlertAddPostMobile toggleAlert={toggleAlertMobile} alert={alertMobile} />
            <AlertAddPost toggleAlert={toggleAlert} alert={alert} />
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
