import './RightTop.scss';
import React, { useEffect, useState } from 'react';
import likes from '../../../assets/images/Right/likes.png';
import { useNavigate } from 'react-router-dom';
import { getTopArticles } from '../../../api/requests';

const RightTop = () => {
    const navigate = useNavigate();
    const [state, setState] = useState(null);
    const apiURL = 'https://prozaapp.art/api/v1/';
    useEffect(() => {
        async function fetchData() {
            let data = await getTopArticles();
            setState(data);
        }
        fetchData();
    }, [apiURL]);
    return (
        <div className='userTop'>
            <div className='headerTop'>
                <div className='infoTop'>Популярні твори</div>
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
