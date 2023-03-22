import './RightTop.scss';
import React, { useState } from 'react';
import axios from 'axios';
import likes from '../../../assets/images/Right/likes.png';
import { useNavigate } from 'react-router-dom';

const RightTop = () => {
    const navigate = useNavigate();
    const [state, setState] = useState();
    const apiURL = 'https://prozaapp.art/api/v1/';
    React.useEffect(() => {
        axios.get(apiURL + 'toparticles/?format=json', {}).then((response) => {
            setState(response.data);
        });
    }, [apiURL]);
    return (
        <div className='userTop'>
            <div className='headerTop'>
                Популярні твори
                {state ? (
                    <>
                        <div className='infoTop'>
                            <div
                                className='partTop'
                                onClick={() => {
                                    navigate('/article/' + state[0].id);
                                }}>
                                {state[0].title}
                            </div>
                            <div className='partTop2'>
                                <div className='likeTop'>
                                    <a>{state[0].likes.length + ' '}</a>
                                    <img src={likes} />
                                </div>
                            </div>
                        </div>{' '}
                        <div className='infoTop'>
                            <div
                                className='partTop'
                                onClick={() => {
                                    navigate('/article/' + state[1].id);
                                }}>
                                {state[1].title}
                            </div>
                            <div className='partTop2'>
                                <div className='likeTop'>
                                    <a>{state[1].likes.length + ' '}</a>
                                    <img src={likes} />
                                </div>
                            </div>
                        </div>{' '}
                        <div className='infoTop'>
                            <div
                                className='partTop'
                                onClick={() => {
                                    navigate('/article/' + state[2].id);
                                }}>
                                {state[2].title}
                            </div>
                            <div className='partTop2'>
                                <div className='likeTop'>
                                    <a>{state[2].likes.length + ' '}</a>
                                    <img src={likes} />
                                </div>
                            </div>
                        </div>
                        <div className='infoTop'>
                            <div
                                className='partTop'
                                onClick={() => {
                                    navigate('/article/' + state[3].id);
                                }}>
                                {state[3].title}
                            </div>
                            <div className='partTop2'>
                                <div className='likeTop'>
                                    <a> {state[3].likes.length + ' '}</a>
                                    <img src={likes} />
                                </div>
                            </div>
                        </div>
                        <div className='infoTop'>
                            <div
                                className='partTop'
                                onClick={() => {
                                    navigate('/article/' + state[4].id);
                                }}>
                                {state[4].title}
                            </div>
                            <div className='partTop2'>
                                <div className='likeTop'>
                                    <a>{state[4].likes.length + ' '}</a>
                                    <img src={likes} />
                                </div>
                            </div>
                        </div>
                        <div className='infoTop'>
                            <div
                                className='partTop'
                                onClick={() => {
                                    navigate('/article/' + state[5].id);
                                }}>
                                {state[4].title}
                            </div>
                            <div className='partTop2'>
                                <div className='likeTop'>
                                    <a>{state[5].likes.length + ' '}</a>
                                    <img src={likes} />
                                </div>
                            </div>
                        </div>
                        <div className='infoTopLast'>
                            <div
                                className='partTop'
                                onClick={() => {
                                    navigate('/article/' + state[6].id);
                                }}>
                                {state[6].title}
                            </div>
                            <div className='partTop2'>
                                <div className='likeTop'>
                                    <a>{state[6].likes.length + ' '}</a>
                                    <img src={likes} />
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default RightTop;
