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
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getFromLocalStorage, getFromSessionStorage } from '../../../utils/storage';
import { ACCESS_TOKEN } from '../../../constants/localStorageKeys';
import ComplaintAlert from '../ComplaintAlert/ComplaintAlert';
import AlertCopy from '../AlertCopy/AlertCopy';

const PostsMobile = (props) => {
    const { isAuthentificated } = useAuthContext();
    const navigate = useNavigate();
    const accessToken = getFromSessionStorage(ACCESS_TOKEN) ?? getFromLocalStorage(ACCESS_TOKEN);
    const [reviews, setReviews] = useState({ items: [] });
    const getReview = () => {
        axios
            .get(apiURL + 'getarticlereviews/' + props.id + '/?format=json', {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            })
            .then((response) => {
                setReviews({ items: response.data });
            });
    };
    const [text, setText] = useState(null);
    const handleTextChange = (event) => {
        setText(event.target.value);
    };
    const publishReview = () => {
        if (isAuthentificated) {
            const token = jwtDecode(accessToken);
            axios
                .post(
                    apiURL + 'reviewcreate/',
                    {
                        headers: {
                            Authorization: 'Bearer ' + accessToken,
                            'Content-Type': 'application/json'
                        },
                        user: token.user_id,
                        content: text,
                        article: props.id
                    },
                    {
                        headers: {
                            Authorization: 'Bearer ' + accessToken
                        }
                    }
                )
                .then(function () {})
                .catch(function (error) {
                    console.log(error);
                });
        }
    };
    const [isLike, setIsLike] = useState(false);
    const apiURL = 'https://prozaapp.art/api/v1/';
    const onLikes = () => {
        if (isAuthentificated) {
            axios
                .put(
                    apiURL + 'like/' + props.id + '/',
                    {},
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + accessToken
                        }
                    }
                )
                .then(function () {
                    setIsLike(!isLike);
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            navigate('/login');
        }
    };
    const [isSave, setIsSave] = useState(false);
    const onSaves = () => {
        if (isAuthentificated) {
            axios
                .put(
                    apiURL + 'save/' + props.id + '/',
                    {},
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + accessToken
                        }
                    }
                )
                .then(function () {
                    setIsSave(!isSave);
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            navigate('/login');
        }
    };
    React.useEffect(() => {
        if (isAuthentificated) {
            axios
                .get(apiURL + 'savedarticles/?format=json', {
                    headers: {
                        Authorization: 'Bearer ' + accessToken
                    }
                })
                .then((response) => {
                    response.data.map((index) => {
                        if (index.id === props.id) {
                            setIsSave(true);
                        }
                    });
                });
        }
    }, [isSave]);
    React.useEffect(() => {
        if (isAuthentificated) {
            const token = jwtDecode(accessToken);
            axios
                .get(apiURL + 'article/' + props.id + '/?format=json', {
                    headers: {
                        Authorization: 'Bearer ' + accessToken
                    }
                })
                .then((response) => {
                    if (response.data.likes) {
                        response.data.likes.map((index) => {
                            if (index === token.user_id) {
                                setIsLike(true);
                            }
                        });
                    }
                });
        }
    }, [isLike]);
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

    const regex = /\\n|\\r\\n|\\n\\r|\\r/g;
    const content = () => {
        return props.content.replace(regex, '\n');
    };
    const [state, setState] = useState({
        showAlert: false,
        complaintAlert: false,
        alertCopy: false
    });
    const toggleAlert = () => {
        setState({ showAlert: !state.showAlert });
    };
    const toggleComplaintAlert = () => {
        if (isAuthentificated) {
            setState({ showAlert: false, complaintAlert: !state.complaintAlert, alertCopy: false });
        } else {
            navigate('/login');
        }
    };
    const onShare = () => {
        navigator.clipboard.writeText('https://prozaapp.art/article/' + props.id).then();
        toggleCopyAlert();
    };
    const toggleCopyAlert = () => {
        setState({ showAlert: false, complaintAlert: false, alertCopy: !state.alertCopy });
    };
    return (
        <>
            <AlertCopy toggleCopyAlert={toggleCopyAlert} state={state} className='copyAlert' />
            <ComplaintAlert
                state={state}
                toggleComplaintAlert={toggleComplaintAlert}
                className='complaintAlert'
                id={props.id}
            />
            <AlertMobile
                state={state}
                useState={useState()}
                toggleAlert={toggleAlert}
                content={content}
                posts={props}
                className='fullAlert'
            />
            <div className={props.comment ? 'postsMobileComment' : 'postsMobile'}>
                <div className='header-postMobile'>
                    <img src={model} className='avatarMobile' alt='avatar' />
                    <a>{props.author}</a>
                    <img
                        src={dots}
                        className='dots'
                        onClick={toggleComplaintAlert}
                        alt='dots'></img>
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
                        onClick={() => {
                            if (isAuthentificated) {
                                getReview();
                                props.setComment(props.index);
                            } else {
                                navigate('/login');
                            }
                        }}
                        alt='comments'></img>
                    <img
                        src={isSave ? saves : noSaves}
                        className='next'
                        onClick={onSaves}
                        alt='saves'></img>
                    <img src={share} className='last' onClick={onShare} alt='share'></img>
                </div>
                {props.comment ? (
                    <div className={reviews.items[0] ? 'comments' : 'commentsSolo'}>
                        <textarea
                            className='text-input'
                            onChange={handleTextChange}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter' && !event.shiftKey) {
                                    event.preventDefault();
                                    publishReview();
                                    event.target.value = '';
                                }
                                getReview();
                            }}
                            placeholder='Напишіть коментар'></textarea>
                        {reviews ? (
                            reviews.items.map((p, index) => (
                                <div key={index} className='fullComment'>
                                    <div className='fullUser'>
                                        {p.user}:{'  '}
                                    </div>
                                    <div className='fullTxt'>{p.content}</div>
                                </div>
                            ))
                        ) : (
                            <></>
                        )}
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </>
    );
};

export default PostsMobile;
