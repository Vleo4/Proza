import './RightTop.scss';
import React, { useState } from 'react';
import axios from 'axios';
import likes from '../../../assets/images/Right/likes.png';
import comments from '../../../assets/images/Right/comments.png';

const RightTop = () => {
    const [state, setState] = useState();
    const apiURL = 'https://prozaapp.art/api/v1/';
    React.useEffect(() => {
        axios.get(apiURL + 'topaticles/?format=json', {}).then((response) => {
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
                            <div className='partTop'>І жінка з чорним, як земля волосся</div>
                            <div className='partTop'>
                                <div className='likeTop'>
                                    {state[0].likes.length}
                                    <img src={likes} />
                                </div>
                                <div className='commentTop'>
                                    {state[0].likes.length}
                                    <img src={comments} />
                                </div>
                            </div>
                        </div>{' '}
                        <div className='infoTop'>
                            <div className='partTop'>І жінка з чорним, як земля волосся</div>
                            <div className='partTop'>
                                <div className='likeTop'>
                                    {state[1].likes.length}
                                    <img src={likes} />
                                </div>
                                <div className='commentTop'>
                                    {state[1].likes.length}
                                    <img src={comments} />
                                </div>
                            </div>
                        </div>{' '}
                        <div className='infoTop'>
                            <div className='partTop'>І жінка з чорним, як земля волосся</div>
                            <div className='partTop'>
                                <div className='likeTop'>
                                    {state[2].likes.length}
                                    <img src={likes} />
                                </div>
                                <div className='commentTop'>
                                    {state[2].likes.length}
                                    <img src={comments} />
                                </div>
                            </div>
                        </div>
                        <div className='infoTop'>
                            <div className='partTop'>І жінка з чорним, як земля волосся</div>
                            <div className='partTop'>
                                <div className='likeTop'>
                                    {state[3].likes.length}
                                    <img src={likes} />
                                </div>
                                <div className='commentTop'>
                                    {state[3].likes.length}
                                    <img src={comments} />
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
