import './PostsMobile.scss';
import dots from '../../../assets/images/Posts/dots.png';
import likes from '../../../assets/images/Posts/likes.png';
import noLikes from '../../../assets/images/Posts/nolikes.png';
import comments from '../../../assets/images/Posts/comments.png';
import noSaves from '../../../assets/images/Posts/nosaves.png';
import saves from '../../../assets/images/Posts/saves.png';
import share from '../../../assets/images/Posts/share.png';
import model from '../../../assets/images/Users/model.png';
import { useState } from 'react';

const PostsMobile = (props) => {
    const regex = /\\n|\\r\\n|\\n\\r|\\r/g;
    const content = () => {
        return props.content.replace(regex, '\n');
    };
    const alertMessage = () => {
        alert('NO NAME');
    };
    const [isLike, setIsLike] = useState(false);
    const onLikes = () => {
        setIsLike(!isLike);
    };
    const [isSave, setIsSave] = useState(false);
    const onSaves = () => {
        setIsSave(!isSave);
    };
    return (
        <div className='postsMobile'>
            <div className='header-postMobile'>
                <img src={model} className='avatarMobile' alt='avatar' />
                <a>{props.author}</a>
                <img src={dots} className='dots' onClick={alertMessage} alt='dots'></img>
            </div>
            <div className='textMobile'>{content()}</div>
            <div className='footer-post-mobile'>
                <img
                    src={isLike ? likes : noLikes}
                    className='first'
                    onClick={onLikes}
                    alt='likes'></img>
                <img src={comments} className='next' onClick={alertMessage} alt='comments'></img>
                <img
                    src={isSave ? saves : noSaves}
                    className='next'
                    onClick={onSaves}
                    alt='saves'></img>
                <img src={share} className='last' onClick={alertMessage} alt='share'></img>
            </div>
        </div>
    );
};

export default PostsMobile;
