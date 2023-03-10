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
import AlertMobile from '../AlertMobile/AlertMobile';

const PostsMobile = (props) => {
    const moreRead = () => {
        const a = Math.round((window.innerHeight / window.innerWidth) * 10) / 10;
        switch (a) {
            case 0.3:
                return parseInt(window.innerHeight / 60 + 2);
            case 0.4:
                return parseInt(window.innerHeight / 60 + 1);
            case 0.5:
                return parseInt(window.innerHeight / 60);
            case 0.6:
                return parseInt(window.innerHeight / 59 + 1);
            case 0.7:
                return parseInt(window.innerHeight / 59 + 1);
            case 0.8:
                return parseInt(window.innerHeight / 59 + 1);
            case 0.9:
                return parseInt(window.innerHeight / 50);
            case 1:
                return parseInt(window.innerHeight / 50);
            case 1.1:
                return parseInt(window.innerHeight / 50);
            case 1.2:
                return parseInt(window.innerHeight / 60);
            case 1.3:
                return parseInt(window.innerHeight / 50);
            case 1.4:
                return parseInt(window.innerHeight / 50);
            case 1.5:
                return parseInt(window.innerHeight / 50);
            case 1.6:
                return parseInt(window.innerHeight / 55);
            case 1.7:
                return parseInt(window.innerHeight / 55);
            case 1.8:
                return parseInt(window.innerHeight / 55);
            case 1.9:
                return parseInt(window.innerHeight / 55);
            case 2:
                return parseInt(window.innerHeight / 60);
            case 2.1:
                return parseInt(window.innerHeight / 55);
            case 2.2:
                return parseInt(window.innerHeight / 52);
            case 2.3:
                return parseInt(window.innerHeight / 52);
            case 2.4:
                return parseInt(window.innerHeight / 55);
            case 2.5:
                return parseInt(window.innerHeight / 55);
        }
    };
    const [state, setState] = useState({ showAlert: false });
    const toggleAlert = () => {
        setState({ showAlert: !state.showAlert });
    };
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
    const onShare = () => {
        navigator.clipboard.writeText('https://prozaapp.art/article/' + props.id).then();
    };
    return (
        <>
            <AlertMobile
                state={state}
                useState={useState()}
                toggleAlert={toggleAlert}
                content={content}
                posts={props}
                className='fullAlert'
            />
            <div className='postsMobile'>
                <div className='header-postMobile'>
                    <img src={model} className='avatarMobile' alt='avatar' />
                    <a>{props.author}</a>
                    <img src={dots} className='dots' onClick={alertMessage} alt='dots'></img>
                </div>
                <div>
                    {
                        <ShowMoreText
                            truncatedEndingComponent=''
                            className='textMobile'
                            id='element-id'
                            width={300}
                            lines={moreRead()}
                            more='Читати далі'
                            keepNewLines={true}
                            anchorClass='textNext'
                            onClick={toggleAlert}
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
                    <img
                        src={comments}
                        className='next'
                        onClick={alertMessage}
                        alt='comments'></img>
                    <img
                        src={isSave ? saves : noSaves}
                        className='next'
                        onClick={onSaves}
                        alt='saves'></img>
                    <img src={share} className='last' onClick={onShare} alt='share'></img>
                </div>
            </div>
        </>
    );
};

export default PostsMobile;
