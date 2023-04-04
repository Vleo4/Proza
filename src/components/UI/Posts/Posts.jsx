import './Posts.scss';
import dots from '../../../assets/images/Posts/dots.png';
import likes from '../../../assets/images/Posts/likes.png';
import noLikes from '../../../assets/images/Posts/nolikes.png';
import comments from '../../../assets/images/Posts/comments.png';
import noSaves from '../../../assets/images/Posts/nosaves.png';
import saves from '../../../assets/images/Posts/saves.png';
import share from '../../../assets/images/Posts/share.png';
import portrait from '../../../assets/images/portrait.svg';
import React, { useEffect, useState } from 'react';
import AlertPost from '../Alert/Alert';
import ComplaintAlert from '../ComplaintAlert/ComplaintAlert';
import { useNavigate, useParams } from 'react-router-dom';
import AlertCopy from '../AlertCopy/AlertCopy';
import { getFromLocalStorage, getFromSessionStorage } from '../../../utils/storage';
import { ACCESS_TOKEN } from '../../../constants/localStorageKeys';
import { useAuthContext } from '../../../contexts/AuthContext';
import jwtDecode from 'jwt-decode';
import ShowMoreText from 'react-show-more-text';
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

const Posts = (props) => {
    const { isAuthentificated } = useAuthContext();
    const navigate = useNavigate();
    const accessToken = getFromSessionStorage(ACCESS_TOKEN) ?? getFromLocalStorage(ACCESS_TOKEN);
    const [state, setState] = useState({
        showAlert: false,
        complaintAlert: false,
        alertCopy: false
    });
    const [text, setText] = useState(null);
    const [isLike, setIsLike] = useState(false);
    const [comment, setComment] = useState(false);
    const handleTextChange = (event) => {
        setText(event.target.value);
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
    const toggleCopyAlert = () => {
        setState({ showAlert: false, complaintAlert: false, alertCopy: !state.alertCopy });
    };
    const regex = /\\n|\\r\\n|\\n\\r|\\r/g;
    const content = () => {
        return props.content.replace(regex, '\n');
    };
    const divBig = () => (comment ? 'postsComments' : 'posts');
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
    const [isSave, setIsSave] = useState(false);
    const onShare = () => {
        navigator.clipboard.writeText('https://prozaapp.art/article/' + props.id).then();
        toggleCopyAlert();
    };
    useEffect(() => {
        async function fetchData() {
            if (!isAuthentificated) return;

            const [articleData, savedArticles] = await Promise.all([
                getArticleId(props.id),
                getSavedArticles()
            ]);
            const token = jwtDecode(accessToken);

            setIsLike(articleData.likes?.includes(token.user_id) ?? false);
            setIsSave(savedArticles.some((index) => index.id === props.id));
        }

        fetchData();
    }, [props.id]);

    const [reviews, setReviews] = useState({ items: [] });
    const getReview = () => {
        async function fetchData() {
            if (isAuthentificated) {
                let data = await getArticleReviews(props.id);
                setReviews({ items: data });
            }
        }
        fetchData().then();
    };
    useEffect(() => {
        getReview();
    }, [props, text]);
    const publishReview = () => {
        if (isAuthentificated) {
            postReview(props.id, text).then();
        }
        getReview();
    };

    const [isSubscribe, setIsSubscribe] = useState(false);
    const onSubscribe = () => {
        if (isAuthentificated && location.pathname !== '/profile') {
            setSubscribeUser(props.author);
            setIsSubscribe(!isSubscribe);
        } else {
            navigate('/login');
        }
    };
    const [jpg, setJpg] = useState(null);
    useEffect(() => {
        async function fetchData() {
            if (!props.author) return;
            const data = await getUserProfile(props.author);
            data?.photo && setJpg(data.photo);
            if (!isAuthentificated || location.pathname === '/profile') return;
            const accessToken =
                getFromSessionStorage(ACCESS_TOKEN) ?? getFromLocalStorage(ACCESS_TOKEN);
            const token = jwtDecode(accessToken);
            setIsSubscribe(data.subscribers.includes(token.user_id));
        }
        fetchData();
    }, [props, isSubscribe]);
    const [current, setCurrent] = useState(null);
    useEffect(() => {
        async function fetchData() {
            if (isAuthentificated) {
                let data = await getCurrentUser();
                if (data) {
                    setCurrent(data.user);
                }
            }
        }
        fetchData();
    }, []);
    let { id } = useParams();
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
            <div className={divBig()}>
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
                    {location.pathname === '/profile' ||
                    props.author === current ||
                    location.pathname === '/profile/' + id ? (
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
                    lines={window.innerWidth < 1400 ? 17 : window.innerWidth < 1900 ? 19 : 21}
                    more='Читати далі'
                    className='text'
                    anchorClass='textShow'
                    onClick={toggleAlert}
                    keepNewLines={true}
                    expanded={false}
                    expandByClick={false}
                    width={0}
                    truncatedEndingComponent={'\n'}>
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
