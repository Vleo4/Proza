import './Users.scss';
import React, { useEffect, useState } from 'react';
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
    getAchievements,
    getCurrentUser,
    getUserArticles,
    getUserProfile,
    setSubscribeUser
} from '../../../api/requests';
const Users = (props) => {
    const { isAuthentificated } = useAuthContext();
    const [isSubscribe, setIsSubscribe] = useState(false);
    const navigate = useNavigate();
    const [length, setLength] = useState(0);
    const [alert, toggleAlert] = useState(false);
    const [cat, setCat] = useState(false);
    const toggleAlertFunc = () => {
        toggleAlert(!alert);
    };
    useEffect(() => {
        async function fetchData() {
            if (isAuthentificated) {
                let data = await getUserArticles(props.author);
                if (data.id) {
                    setLength(1);
                } else setLength(data.length);
            }
        }
        fetchData();
    }, [props.author]);
    const onSubscribe = () => {
        if (isAuthentificated && location.pathname !== '/profile') {
            setSubscribeUser(props.author);
        } else {
            navigate('/login');
        }
    };
    const [current, setCurrent] = useState(null);
    const [subscribers, setSubscribers] = useState(0);
    const [follows, setFollows] = useState(0);
    const [description, setDescription] = useState('');
    const [jpg, setJpg] = useState(null);
    const [ico, setIco] = useState(null);
    useEffect(() => {
        async function fetchData() {
            if (isAuthentificated) {
                let data = await getCurrentUser();
                setCat(data.fav_category);
                setCurrent(data.user);
            }
            if (props.author) {
                let data = await getUserProfile(props.author);
                setJpg(data.photo);
                const accessToken =
                    getFromSessionStorage(ACCESS_TOKEN) ?? getFromLocalStorage(ACCESS_TOKEN);
                const token = jwtDecode(accessToken);
                setJpg(data.photo);
                setDescription(data.description);
                if (data.subscribers) setSubscribers(data.subscribers);
                setIsSubscribe(data.subscribers.includes(token.user_id));
                if (data.follows) setFollows(data.follows);
                if (isAuthentificated && location.pathname !== '/profile') {
                    const token = jwtDecode(accessToken);
                    setIsSubscribe(data.subscribers.includes(token.user_id));
                }
                data = await getAchievements(data.id);
                if (data) {
                    setIco(data.achieved[0].ico);
                }
            }
        }
        fetchData();
    }, [props.author, alert, cat]);
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
