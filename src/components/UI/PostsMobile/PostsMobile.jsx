import './PostsMobile.scss';
import dots from '../../../assets/images/Posts/dots.png';
import likes from '../../../assets/images/Posts/likes.png';
import noLikes from '../../../assets/images/Posts/nolikes.png';
import comments from '../../../assets/images/Posts/comments.png';
import noSaves from '../../../assets/images/Posts/nosaves.png';
import saves from '../../../assets/images/Posts/saves.png';
import share from '../../../assets/images/Posts/share.png';
import model from '../../../assets/images/Users/model.png';
import React, { useState } from 'react';
import ShowMoreText from 'react-show-more-text';

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
    const executeOnClick = () => {
        alert(content());
    };
    const onShare = () => {
        navigator.clipboard.writeText('https://prozaapp.art/article/' + props.id);
    };
    return (
        <div className='postsMobile'>
            <div className='header-postMobile'>
                <img src={model} className='avatarMobile' alt='avatar' />
                <a>{props.author}</a>
                <img src={dots} className='dots' onClick={alertMessage} alt='dots'></img>
            </div>
            <div>
                {
                    <ShowMoreText
                        className='textMobile'
                        id='element-id'
                        width={300}
                        lines={
                            window.innerHeight / window.innerWidth > 1.7
                                ? parseInt((window.innerHeight / window.innerWidth) * 7.5)
                                : parseInt((window.innerHeight / window.innerWidth) * 5.5)
                        }
                        more='Читати далі'
                        keepNewLines={true}
                        anchorClass='textNext'
                        onClick={executeOnClick}
                        expandByClick={false}
                        expanded={false}>
                        {content()}
                    </ShowMoreText>
                }
            </div>
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
                <img src={share} className='last' onClick={onShare} alt='share'></img>
            </div>
        </div>
    );
};

export default PostsMobile;
