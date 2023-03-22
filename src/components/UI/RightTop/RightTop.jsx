import './RightTop.scss';
import React, { useState } from 'react';
import axios from 'axios';
import likes from '../../../assets/images/Right/likes.png';
import { useNavigate } from 'react-router-dom';

const RightTop = () => {
    const navigate = useNavigate();
    const [state, setState] = useState(null);
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
                    state.map((p, index) => (
                        <div className='infoTop' key={index}>
                            <div
                                className='partTop'
                                onClick={() => {
                                    navigate('/article/' + p.id);
                                }}>
                                {p.title}
                            </div>
                            <div className='partTop2'>
                                <div className='likeTop'>
                                    <a>{p.likes.length + ' '}</a>
                                    <img src={likes} />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default RightTop;
