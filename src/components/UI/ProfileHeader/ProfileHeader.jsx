import './ProfileHeader.scss';
import React, { useEffect, useState } from 'react';
import AlertAddPost from '../AlertAddPost/AlertAddPost';
import subscribe from '../../../assets/images/Users/subscribe.png';
import noSubscribe from '../../../assets/images/Users/noSubscribe.png';
import { getFromLocalStorage, getFromSessionStorage } from '../../../utils/storage';
import { ACCESS_TOKEN } from '../../../constants/localStorageKeys';
import { useAuthContext } from '../../../contexts/AuthContext';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import refactor from '../../../assets/images/Users/refactor.png';
import AlertRefactor from '../AlertRefactor/AlertRefactor';
import portrait from '../../../assets/images/portrait.svg';
import {
    getCurrentUser,
    getUserArticles,
    getUserProfile,
    setSubscribeUser
} from '../../../api/requests';
const ProfileHeader = (props) => {
    const { isAuthentificated } = useAuthContext();
    const [isSubscribe, setIsSubscribe] = useState(false);
    const navigate = useNavigate();
    const onSubscribe = () => {
        if (isAuthentificated && location.pathname !== '/profile') {
            setSubscribeUser(props.author);
        } else {
            navigate('/login');
        }
    };
    const [current, setCurrent] = useState(null);
    const [subscribers, setSubscribers] = useState(0);
    const [articles, setArticles] = useState(0);
    const [follows, setFollows] = useState(0);
    const [jpg, setJpg] = useState(null);
    const [cat, setCat] = useState(false);
    const [description, setDescription] = useState(null);
    useEffect(() => {
        async function fetchData() {
            if (isAuthentificated) {
                let data = await getCurrentUser();
                if (data) {
                    setCat(data.fav_category);
                    setCurrent(data.user);
                }
            }
        }
        fetchData();
    }, []);
    useEffect(() => {
        async function fetchData() {
            if (props.author) {
                let data = await getUserProfile(props.author);
                setDescription(data.description);
                setJpg(data.photo);
                if (data.subscribers) setSubscribers(data.subscribers);
                if (isAuthentificated && location.pathname !== '/profile') {
                    const accessToken =
                        getFromSessionStorage(ACCESS_TOKEN) ?? getFromLocalStorage(ACCESS_TOKEN);
                    const token = jwtDecode(accessToken);
                    setIsSubscribe(data.subscribers.includes(token.user_id));
                }
                if (data.follows) setFollows(data.follows);
            }
            let data = await getUserArticles(props.author);
            setArticles(data.length);
        }
        fetchData();
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
                    <div className='textDesc'>{description}</div>
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
