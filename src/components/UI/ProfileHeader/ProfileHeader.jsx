import '../Posts/Posts.scss';
import React, { useState } from 'react';
import AlertAddPost from '../AlertAddPost/AlertAddPost';
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
const ProfileHeader = (props) => {
    const { isAuthentificated } = useAuthContext();
    const [isSubscribe, setIsSubscribe] = useState(false);
    const navigate = useNavigate();
    const onSubscribe = () => {
        if (isAuthentificated && location.pathname !== '/profile') {
            const accessToken =
                getFromSessionStorage(ACCESS_TOKEN) ?? getFromLocalStorage(ACCESS_TOKEN);
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
    const [jpg, setJpg] = useState(null);
    const [cat, setCat] = useState(false);
    const [description, setDescription] = useState(null);
    React.useEffect(() => {
        if (isAuthentificated) {
            const accessToken =
                getFromSessionStorage(ACCESS_TOKEN) ?? getFromLocalStorage(ACCESS_TOKEN);
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
                    setDescription(response.data.description);
                    setJpg(response.data.photo);
                    if (response.data.subscribers) setSubscribers(response.data.subscribers);
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
    const [alert, setAlert] = useState(false);
    const toggleAlert = () => {
        setAlert(!alert);
    };
    const [alertRef, toggleAlertRef] = useState(false);
    const toggleAlertFunc = () => {
        toggleAlertRef(!alertRef);
    };
    return (
        <>
            <AlertRefactor
                imageData={jpg}
                cat={cat}
                toggleAlert={toggleAlertFunc}
                alert={alertRef}
            />
            <AlertAddPost toggleAlert={toggleAlert} alert={alert} className='complaintAlert' />
            <div className='profileHeader'>
                {location.pathname !== '/profile' && props.author !== current ? (
                    <></>
                ) : (
                    <img onClick={toggleAlertFunc} src={refactor} className='refactor' />
                )}
                <div className='avatar'>
                    <img
                        className={
                            location.pathname !== '/profile' && props.author !== current
                                ? 'avatarImage'
                                : 'avatarImageProfile'
                        }
                        src={jpg ? jpg : portrait}
                        alt='avatar'
                    />
                    {location.pathname !== '/profile' && props.author === current ? (
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
                <div className='block'>
                    <div className='header'> {props.author}</div>
                    <div className='slug'>{props.author}</div>
                    <div className='textAchievement'>Письменник(ця)-початківець</div>
                    <div className='text'>{description}</div>
                </div>
                <div className='allRows'>
                    <div className='textRow'>Публікації</div>
                    <div className='number'> {articles}</div>
                </div>
                <div className='allRows'>
                    <div className='textRow'>Підписники</div>
                    <div className='number'> {subscribers.length}</div>
                </div>
                <div className='allRows'>
                    <div className='textRow'> Підписки</div>
                    <div className='number'>{follows.length}</div>
                </div>
            </div>
        </>
    );
};

export default ProfileHeader;
