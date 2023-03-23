import './Posts.scss';
import dots from '../../../assets/images/Posts/dots.png';
import likes from '../../../assets/images/Posts/likes.png';
import noLikes from '../../../assets/images/Posts/nolikes.png';
import comments from '../../../assets/images/Posts/comments.png';
import noSaves from '../../../assets/images/Posts/nosaves.png';
import saves from '../../../assets/images/Posts/saves.png';
import share from '../../../assets/images/Posts/share.png';
import portrait from '../../../assets/images/portrait.svg';
import React, { useState } from 'react';
import AlertPost from '../Alert/Alert';
import ComplaintAlert from '../ComplaintAlert/ComplaintAlert';
import { useNavigate, useParams } from 'react-router-dom';
import AlertCopy from '../AlertCopy/AlertCopy';
import axios from 'axios';
import { getFromLocalStorage, getFromSessionStorage } from '../../../utils/storage';
import { ACCESS_TOKEN } from '../../../constants/localStorageKeys';
import { useAuthContext } from '../../../contexts/AuthContext';
import jwtDecode from 'jwt-decode';
import ShowMoreText from 'react-show-more-text';

const Posts = (props) => {
    const { isAuthentificated } = useAuthContext();
    const navigate = useNavigate();
    const accessToken = getFromSessionStorage(ACCESS_TOKEN) ?? getFromLocalStorage(ACCESS_TOKEN);
    let { id } = useParams();
    const [state, setState] = useState({
        showAlert: false,
        complaintAlert: false,
        alertCopy: false
    });
    const toggleAlert = () => {
        setState({ showAlert: !state.showAlert, complaintAlert: false, alertCopy: false });
    };
    const toggleComplaintAlert = () => {
        if (isAuthentificated) {
            setState({ showAlert: false, complaintAlert: !state.complaintAlert, alertCopy: false });
        } else {
            navigate('/login');
        }
    };
    const toggleCopyAlert = () => {
        setState({ showAlert: false, complaintAlert: false, alertCopy: !state.alertCopy });
    };
    const regex = /\\n|\\r\\n|\\n\\r|\\r/g;
    const content = () => {
        if (!props.content) {
            return '';
        }
        return props.content.replace(regex, '\n');
    };
    const divBig = () => {
        if (comment) return 'postsComments';
        else {
            if (id) {
                return 'postsArticle';
            } else {
                return 'posts';
            }
        }
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
                .then(function (response) {
                    if (response.data.status_code === 0) {
                        alert(response.data.massage);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };
    const [isLike, setIsLike] = useState(false);
    const [comment, setComment] = useState(false);
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
    const onShare = () => {
        navigator.clipboard.writeText('https://prozaapp.art/article/' + props.id).then();
        toggleCopyAlert();
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
                    setIsSave(false);
                    response.data.map((index) => {
                        if (index.id === props.id) {
                            setIsSave(true);
                        }
                    });
                });
        }
    }, [props]);
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
                    setIsLike(false);
                    if (response.data.likes) {
                        response.data.likes.map((index) => {
                            if (index === token.user_id) {
                                setIsLike(true);
                            }
                        });
                    }
                });
        }
    }, [props]);

    const [reviews, setReviews] = useState({ items: [] });
    React.useEffect(() => {
        if (isAuthentificated) {
            axios
                .get(apiURL + 'getarticlereviews/' + props.id + '/?format=json', {
                    headers: {
                        Authorization: 'Bearer ' + accessToken
                    }
                })
                .then((response) => {
                    setReviews({ items: response.data });
                });
        }
    }, [props]);

    const [isSubscribe, setIsSubscribe] = useState(false);
    const onSubscribe = () => {
        if (isAuthentificated && location.pathname !== '/profile') {
            axios
                .put(
                    apiURL + 'subscription/' + props.author + '/',
                    {},
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + accessToken
                        }
                    }
                )
                .then(function () {
                    setIsSubscribe(!isSubscribe);
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            navigate('/login');
        }
    };
    const [jpg, setJpg] = useState(null);
    React.useEffect(() => {
        if (props.author) {
            setIsSubscribe(false);
            axios
                .get(apiURL + 'prozauserprofile/' + props.author + '/?format=json')
                .then((response) => {
                    setJpg(response.data.photo);
                    if (isAuthentificated && location.pathname !== '/profile') {
                        const accessToken =
                            getFromSessionStorage(ACCESS_TOKEN) ??
                            getFromLocalStorage(ACCESS_TOKEN);
                        const token = jwtDecode(accessToken);
                        response.data.subscribers.map((index) => {
                            if (index === token.user_id) {
                                setIsSubscribe(true);
                            }
                        });
                    }
                });
        }
    }, [props.author]);
    const [current, setCurrent] = useState(null);
    React.useEffect(() => {
        if (isAuthentificated) {
            axios
                .get(apiURL + 'prozauserprofile/?format=json', {
                    headers: {
                        Authorization: 'Bearer ' + accessToken
                    }
                })
                .then((response) => {
                    setCurrent(response.data.user);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);
    const ref1 = React.useRef();
    const [he, setHe] = useState(1);
    React.useEffect(() => {
        console.log(window.innerHeight);
        if (window.innerHeight > 1000) {
            setHe(Math.floor((ref1.current.clientHeight * 0.9) / 55) - 1);
        } else if (window.innerHeight > 750) {
            setHe(Math.floor((ref1.current.clientHeight * 0.9) / 35));
        } else if (window.innerHeight > 700) {
            setHe(Math.floor((ref1.current.clientHeight * 0.9) / 38));
        } else {
            setHe(Math.floor((ref1.current.clientHeight * 0.9) / 45));
        }
    }, []);

    return (
        <>
            <AlertCopy toggleCopyAlert={toggleCopyAlert} state={state} className='copyAlert' />
            <ComplaintAlert
                state={state}
                toggleComplaintAlert={toggleComplaintAlert}
                className='complaintAlert'
                id={props.id}
                current={current}
                author={props.author}
            />
            <AlertPost
                state={state}
                useState={useState()}
                toggleAlert={toggleAlert}
                content={content}
                posts={props}
                className='fullAlert'
            />
            <div className={divBig()} ref={ref1}>
                <div className='header-post'>
                    <img
                        src={jpg ? jpg : portrait}
                        onClick={() => {
                            isAuthentificated
                                ? navigate('/profile/' + props.author)
                                : navigate('/login');
                        }}
                        className='postsAvatar'
                    />
                    <div
                        className='rowHead'
                        onClick={() => {
                            isAuthentificated
                                ? navigate('/profile/' + props.author)
                                : navigate('/login');
                        }}>
                        {props.author}
                    </div>
                    {location.pathname === '/profile' || props.author === current ? (
                        <></>
                    ) : (
                        <button className='subscribe' onClick={onSubscribe}>
                            {isSubscribe ? 'Ви прознуті' : 'Прознутись'}
                        </button>
                    )}
                    <img
                        src={dots}
                        className='postsDots'
                        onClick={toggleComplaintAlert}
                        alt='dots'></img>
                </div>
                <div className='header-two'>{props.tittle}</div>
                <ShowMoreText
                    lines={he}
                    more='Читати далі'
                    less=''
                    className='text'
                    expandByClick={false}
                    onClick={toggleAlert}
                    expanded={false}
                    keepNewLines={true}
                    truncatedEndingComponent={''}>
                    {content()}
                </ShowMoreText>
                <div className='footer-post'>
                    <img
                        src={isLike ? likes : noLikes}
                        className='first'
                        onClick={onLikes}
                        alt='likes'></img>
                    <img
                        src={comments}
                        className='next'
                        alt='comments'
                        onClick={() => {
                            if (isAuthentificated) {
                                setComment(!comment);
                                if (props.setComment) {
                                    props.setComment();
                                }
                            } else {
                                navigate('/login');
                            }
                        }}></img>
                    <img
                        src={isSave ? saves : noSaves}
                        className='next'
                        onClick={onSaves}
                        alt='saves'></img>
                    <img src={share} className='last' onClick={onShare} alt='share'></img>
                </div>
                {comment ? (
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
                            }}
                            placeholder='Напишіть коментар'></textarea>
                        <div className='mini'>Натисніть Enter, щоб опублікувати.</div>
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

export default Posts;
