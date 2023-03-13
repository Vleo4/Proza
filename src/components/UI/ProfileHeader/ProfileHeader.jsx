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
const ProfileHeader = (props) => {
    const { isAuthentificated } = useAuthContext();
    const [isSubscribe, setIsSubscribe] = useState(false);
    const accessToken = getFromSessionStorage(ACCESS_TOKEN) ?? getFromLocalStorage(ACCESS_TOKEN);
    const navigate = useNavigate();
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
    const [alert, setAlert] = useState(false);
    const toggleAlert = () => {
        setAlert(!alert);
    };
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
        <>
            <AlertAddPost toggleAlert={toggleAlert} alert={alert} className='complaintAlert' />
            <div className='profileHeader'>
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
                    <div className='text'>
                        Володя тримає Настю в рабстві! Допоможіть!*тут має бути опис, але не більше
                        трьох рядків*
                    </div>
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
