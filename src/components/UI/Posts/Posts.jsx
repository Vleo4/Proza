import './Posts.scss';
import dots from '../../../assets/images/Posts/dots.png';
import likes from '../../../assets/images/Posts/likes.png';
import noLikes from '../../../assets/images/Posts/nolikes.png';
import comments from '../../../assets/images/Posts/comments.png';
import noSaves from '../../../assets/images/Posts/nosaves.png';
import saves from '../../../assets/images/Posts/saves.png';
import share from '../../../assets/images/Posts/share.png';
import ShowMoreText from 'react-show-more-text';
import React, { useState } from 'react';
import AlertPost from '../Alert/Alert';
import ComplaintAlert from '../ComplaintAlert/ComplaintAlert';

const Posts = (props) => {
    const [state, setState] = useState({ showAlert: false, complaintAlert: false });
    const toggleAlert = () => {
        setState({ showAlert: !state.showAlert, complaintAlert: false });
    };
    const toggleComplaintAlert = () => {
        setState({ showAlert: false, complaintAlert: !state.complaintAlert });
    };
    const regex = /\\n|\\r\\n|\\n\\r|\\r/g;
    const content = () => {
        return props.content.replace(regex, '\n');
    };
    const alertMessage = () => {
        alert('abc');
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
    const handleMouseOver = () => {
        props.setAuthor(props.user);
    };
    return (
        <>
            <ComplaintAlert
                state={state}
                toggleComplaintAlert={toggleComplaintAlert}
                className='complaintAlert'
            />
            <AlertPost
                state={state}
                useState={useState()}
                toggleAlert={toggleAlert}
                content={content}
                posts={props}
                className='fullAlert'
            />
            <div className='posts' onMouseOver={handleMouseOver}>
                <div className='header-post'>
                    {props.tittle}
                    <img src={dots} onClick={toggleComplaintAlert} alt='dots'></img>
                </div>
                <div className='text-parent'>
                    {
                        <ShowMoreText
                            truncatedEndingComponent=''
                            className='text'
                            width={300}
                            lines={parseInt(window.outerHeight / 45)}
                            more='Читати далі'
                            keepNewLines={true}
                            anchorClass='textNext'
                            onClick={toggleAlert}
                            expandByClick={false}
                            expanded={false}>
                            {content()}
                        </ShowMoreText>
                    }{' '}
                </div>
                <div className='footer-post'>
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

export default Posts;
