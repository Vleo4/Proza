import './PostsAdd.scss';
import addPost from '../../../assets/images/Posts/addPost.png';
import AlertAddPost from '../AlertAddPost/AlertAddPost';
import useResizer from '../../../utils/utils';
import AlertAddPostMobile from '../AlertAddPostMobile/AlertAddPostMobile';
const PostsAdd = (props) => {
    const isMobile = useResizer();
    return (
        <>
            <AlertAddPostMobile toggleAlert={props.toggleAlertMobile} alert={props.alertMobile} />
            <AlertAddPost toggleAlert={props.toggleAlert} alert={props.alert} />
            <div className={isMobile ? 'postsAddJsxMobile' : 'postsAddJsx'}>
                <div className='text-parent'>
                    <img
                        src={addPost}
                        className='addPost'
                        onClick={() => {
                            isMobile ? props.toggleAlertMobile() : props.toggleAlert();
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default PostsAdd;
