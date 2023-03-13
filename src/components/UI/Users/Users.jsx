import './Users.scss';
import React, { useState } from 'react';
import subscribe from '../../../assets/images/Users/subscribe.png';
import noSubscribe from '../../../assets/images/Users/noSubscribe.png';
import axios from 'axios';
import { getFromLocalStorage, getFromSessionStorage } from '../../../utils/storage';
import { ACCESS_TOKEN } from '../../../constants/localStorageKeys';
import { useAuthContext } from '../../../contexts/AuthContext';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import likes from '../../../assets/images/Right/likes.png';
import comments from '../../../assets/images/Right/comments.png';
const Users = (props) => {
    const [state, setState] = useState({ items: [] });
    const { isAuthentificated } = useAuthContext();
    const [isSubscribe, setIsSubscribe] = useState(false);
    const accessToken = getFromSessionStorage(ACCESS_TOKEN) ?? getFromLocalStorage(ACCESS_TOKEN);
    const navigate = useNavigate();
    const [length, setLength] = useState(0);
    React.useEffect(() => {
        if (props.author) {
            axios
                .get(apiURL + 'getuserarticles/' + props.author + '/?format=json')
                .then((response) => {
                    setLength(response.data.length);
                    setState({ items: response.data });
                });
        }
    }, [props.author]);

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
    const [current, setCurrent] = useState(null);
    const [subscribers, setSubscribers] = useState(0);
    const [articles, setArticles] = useState(0);
    const [follows, setFollows] = useState(0);
    const apiURL = 'https://prozaapp.art/api/v1/';
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
        if (props.author) {
            setIsSubscribe(false);
            axios
                .get(apiURL + 'prozauserprofile/' + props.author + '/?format=json')
                .then((response) => {
                    if (response.data.subscribers) setSubscribers(response.data.subscribers);
                    if (isAuthentificated && location.pathname !== '/profile') {
                        const token = jwtDecode(accessToken);
                        response.data.subscribers.map((index) => {
                            if (index === token.user_id) {
                                setIsSubscribe(true);
                            }
                        });
                    }
                    if (response.data.follows) setFollows(response.data.follows);
                });
            axios
                .get(apiURL + 'getuserarticles/' + props.author + '/?format=json')
                .then((response) => {
                    if (response.data.length) {
                        setArticles(response.data.length);
                    }
                });
        }
    }, [props.author]);
    const [imageData, setImageData] = useState(null);
    React.useEffect(() => {
        axios
            .get(
                'https://cookbook.brainstormingapplication.com/media/photos/2023/03/08/WIN_20221018_20_12_28_Pro.jpg',
                { responseType: 'arraybuffer' }
            )
            .then((response) => {
                const base64 = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ''
                    )
                );
                setImageData(`data:image/jpeg;base64,${base64}`);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <div className='user'>
            <div className='header-user'>
                <div className='avatar'>
                    <img
                        className={
                            location.pathname !== '/profile' && props.author !== current
                                ? 'avatarImage'
                                : 'avatarImageProfile'
                        }
                        src={imageData}
                        alt='avatar'
                    />
                    {location.pathname !== '/profile' && props.author !== current ? (
                        <img
                            className='avatarStatus'
                            src={isSubscribe ? subscribe : noSubscribe}
                            onClick={onSubscribe}
                            alt={'subscribe'}
                        />
                    ) : (
                        ''
                    )}
                </div>
                {props.author}
                <div className='info'>
                    <div className='part'>
                        <div className='leftSide'>Публікації</div>
                        <div className='rightSide'>
                            {articles}
                            <div />
                        </div>
                        <div className='part'>
                            <div className='leftSide'>Підписники</div>
                            <div className='rightSide'>
                                {subscribers.length} <div />
                            </div>
                        </div>

                        <div className='part'>
                            <div className='leftSide'>Підписки</div>
                            <div className='rightSide'>
                                {follows.length}
                                <div />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {length > 0 ? (
                <div className='footer-user'>
                    {length > 0 ? (
                        <>
                            <div>Популярні твори</div>
                            <div className='infoTopUser'>
                                <div className='partTopUser'>{state.items[0].title}</div>
                                <div className='partTopUser'>
                                    <div className='likeTopUser'>
                                        <a>{state.items[0].likes.length + ' '}</a>
                                        <img src={likes} />
                                    </div>
                                    <div className='commentTopUser'>
                                        <a>{state.items[0].count_of_reviews + ' '}</a>
                                        <img src={comments} />
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                    {length > 1 ? (
                        <div className='infoTopUser'>
                            <div className='partTopUser'>{state.items[1].title}</div>
                            <div className='partTopUser'>
                                <div className='likeTopUser'>
                                    <a>{state.items[1].likes.length + ' '}</a>
                                    <img src={likes} />
                                </div>
                                <div className='commentTopUser'>
                                    <a>{state.items[1].count_of_reviews + ' '}</a>
                                    <img src={comments} />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Users;
