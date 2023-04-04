import './PostsMobile.scss';
import dots from '../../../assets/images/Posts/dots.png';
import likes from '../../../assets/images/Posts/likes.png';
import noLikes from '../../../assets/images/Posts/nolikes.png';
import comments from '../../../assets/images/Posts/comments.png';
import noSaves from '../../../assets/images/Posts/nosaves.png';
import saves from '../../../assets/images/Posts/saves.png';
import share from '../../../assets/images/Posts/share.png';
import React, { useEffect, useState } from 'react';
import AlertMobile from '../AlertMobile/AlertMobile';
import jwtDecode from 'jwt-decode';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getFromLocalStorage, getFromSessionStorage } from '../../../utils/storage';
import { ACCESS_TOKEN } from '../../../constants/localStorageKeys';
import AlertCopy from '../AlertCopy/AlertCopy';
import portrait from '../../../assets/images/portrait.svg';
import ComplaintAlertMobile from '../ComplaintAlertMobile/ComplaintAlertMobile';
import {
    getArticleId,
    getArticleReviews,
    getCurrentUser,
    getSavedArticles,
    getUserProfile,
    postReview,
    setLike,
    setSave,
    setSubscribeUser
} from '../../../api/requests';

const PostsMobile = (props) => {
    const { isAuthentificated } = useAuthContext();
    const navigate = useNavigate();
    const accessToken = getFromSessionStorage(ACCESS_TOKEN) ?? getFromLocalStorage(ACCESS_TOKEN);
    const [reviews, setReviews] = useState({ items: [] });
    const [text, setText] = useState(null);
    const [isLike, setIsLike] = useState(false);
    const [isSave, setIsSave] = useState(false);
    const regex = /\\n|\\r\\n|\\n\\r|\\r/g;
    const [state, setState] = useState({
        showAlert: false,
        complaintAlert: false,
        alertCopy: false
    });
    const [isSubscribe, setIsSubscribe] = useState(false);
    const [jpg, setJpg] = useState(null);
    const [current, setCurrent] = useState(null);
    const [big, setBig] = useState(false);

    const getReview = () => {
        async function fetchData() {
            let data = await getArticleReviews(props.id);
            setReviews({ items: data });
        }
        fetchData().then();
    };
    const handleTextChange = (event) => {
        setText(event.target.value);
    };
    const publishReview = () => {
        if (isAuthentificated) {
            postReview(props.id, text).then();
        }
    };
    const onLikes = () => {
        if (isAuthentificated) {
            setLike(props.id).then();
            setIsLike(!isLike);
        } else {
            navigate('/login');
        }
    };
    const onSaves = () => {
        if (isAuthentificated) {
            setSave(props.id).then();
            setIsSave(!isSave);
        } else {
            navigate('/login');
        }
    };
    useEffect(() => {
        async function fetchData() {
            if (isAuthentificated) {
                let data = await getSavedArticles();
                data.map((index) => {
                    if (index.id === props.id) {
                        setIsSave(true);
                    }
                });
            }
        }
        fetchData().then();
    }, [isSave]);
    useEffect(() => {
        async function fetchData() {
            if (isAuthentificated) {
                let data = await getArticleId(props.id);
                const token = jwtDecode(accessToken);
                if (data.likes) {
                    data.likes.map((index) => {
                        if (index === token.user_id) {
                            setIsLike(true);
                        }
                    });
                }
            }
        }
        fetchData().then();
    }, [isLike]);
    const content = () => {
        return props.content.replace(regex, '\n');
    };
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
    const onShare = () => {
        navigator.clipboard.writeText('https://prozaapp.art/article/' + props.id).then();
        toggleCopyAlert();
    };
    const toggleCopyAlert = () => {
        setState({ showAlert: false, complaintAlert: false, alertCopy: !state.alertCopy });
    };
    const onSubscribe = () => {
        if (isAuthentificated && location.pathname !== '/profile') {
            setSubscribeUser(props.author);
            setIsSubscribe(!isSubscribe);
        } else {
            navigate('/login');
        }
    };
    useEffect(() => {
        async function fetchData() {
            if (props.author) {
                let data = await getUserProfile(props.author);
                setJpg(data.photo);
                if (isAuthentificated && location.pathname !== '/profile') {
                    const accessToken =
                        getFromSessionStorage(ACCESS_TOKEN) ?? getFromLocalStorage(ACCESS_TOKEN);
                    const token = jwtDecode(accessToken);
                    setIsSubscribe(data.subscribers.includes(token.user_id));
                }
            }
        }
        fetchData().then();
    }, []);
    useEffect(() => {
        async function fetchData() {
            if (isAuthentificated) {
                let data = await getCurrentUser();
                if (data) {
                    setCurrent(data.user);
                }
            }
        }
        fetchData().then();
    }, []);
    const visibleRef = React.useRef();
    const hiddenRef = React.useRef();
    useEffect(() => {
        if (visibleRef.current.offsetHeight > hiddenRef.current.offsetHeight) {
            setBig(true);
        } else {
            setBig(false);
        }
    }, [visibleRef]);

    return (
        <>
            <AlertCopy toggleCopyAlert={toggleCopyAlert} state={state} className='copyAlert' />
            <ComplaintAlertMobile
                state={state}
                toggleComplaintAlert={toggleComplaintAlert}
                className='complaintAlert'
                id={props.id}
                current={current}
                author={props.author}
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
                    <img src={jpg ? jpg : portrait} className='avatarMobile' alt='avatar' />
                    <a
                        onClick={() => {
                            isAuthentificated
                                ? navigate('/profile/' + props.author)
                                : navigate('/login');
                        }}>
                        {props.author}
                    </a>
                    {location.pathname === '/profile' || props.author === current ? (
                        <></>
                    ) : (
                        <button className='subscribeMobile' onClick={onSubscribe}>
                            {isSubscribe ? 'Ви прознуті' : 'Прознутись'}
                        </button>
                    )}
                    <img
                        src={dots}
                        className='dots'
                        onClick={toggleComplaintAlert}
                        alt='dots'></img>
                </div>
                <div className={'header-twoMobile'}>{props.tittle}</div>
                <div className={'textBig'} ref={hiddenRef}></div>
                <div className={'textMobile'} ref={visibleRef}>
                    {content()}
                </div>
                {big ? (
                    <div className={'textMobileNext'} onClick={toggleAlert}>
                        читати далі
                    </div>
                ) : (
                    <></>
                )}
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
