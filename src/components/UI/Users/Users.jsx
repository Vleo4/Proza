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
import refactor from '../../../assets/images/Users/refactor.png';
import AlertRefactor from '../AlertRefactor/AlertRefactor';
import portrait from '../../../assets/images/portrait.svg';
const Users = (props) => {
    const { isAuthentificated } = useAuthContext();
    const [isSubscribe, setIsSubscribe] = useState(false);
    const accessToken = getFromSessionStorage(ACCESS_TOKEN) ?? getFromLocalStorage(ACCESS_TOKEN);
    const navigate = useNavigate();
    const [length, setLength] = useState(0);
    const [alert, toggleAlert] = useState(false);
    const [cat, setCat] = useState(false);
    const toggleAlertFunc = () => {
        toggleAlert(!alert);
    };
    React.useEffect(() => {
        if (props.author) {
            axios
                .get(apiURL + 'getuserarticles/' + props.author + '/?format=json')
                .then((response) => {
                    if (response.data.id) {
                        setLength(1);
                    } else setLength(response.data.length);
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
    const [follows, setFollows] = useState(0);
    const apiURL = 'https://prozaapp.art/api/v1/';
    const [description, setDescription] = useState('');
    const [jpg, setJpg] = useState(null);
    const [ico, setIco] = useState(null);
    React.useEffect(() => {
        if (isAuthentificated) {
            axios
                .get(apiURL + 'prozauserprofile/?format=json', {
                    headers: {
                        Authorization: 'Bearer ' + accessToken
                    }
                })
                .then((response) => {
                    setCat(response.data.fav_category);
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
                    setJpg(response.data.photo);
                    setDescription(response.data.description);
                    axios
                        .get(apiURL + 'userachievements/' + response.data.id + '/?format=json')
                        .then((response) => {
                            setIco(response.data.achieved[0].ico);
                        });
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
        }
    }, [props.author]);
    return (
        <>
            <AlertRefactor
                toggleAlert={toggleAlertFunc}
                cat={cat}
                imageData={jpg ? jpg : portrait}
                alert={alert}
            />
            <div className='user'>
                <div className='header-user'>
                    <div className='avatar'>
                        {location.pathname !== '/profile' && props.author !== current ? (
                            <></>
                        ) : (
                            <img onClick={toggleAlertFunc} src={refactor} className='refactor' />
                        )}
                        <img
                            className={
                                location.pathname !== '/profile' && props.author !== current
                                    ? 'avatarImage'
                                    : 'avatarImageProfile'
                            }
                            src={jpg ? jpg : portrait}
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
                    <div className='headerUser'>{props.author}</div>
                    <div className='info'>
                        <div className='part'>
                            <div className='leftSide'>Публікації</div>
                            <div className='rightSide'>
                                {length}
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
                <div className='partDesc'>{description}</div>
                <div className='partDesc'>{ico ? <img src={ico} /> : <></>}</div>
            </div>
        </>
    );
};

export default Users;
