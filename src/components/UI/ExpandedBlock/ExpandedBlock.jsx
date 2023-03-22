import React, { useRef, useState } from 'react';
import sent from '../../../assets/images/ExpandedBlock/sent.png';
import arrow from '../../../assets/images/ExpandedBlock/arrow.png';
import right from '../../../assets/images/ExpandedBlock/right.png';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { getFromLocalStorage, getFromSessionStorage } from '../../../utils/storage';
import { ACCESS_TOKEN } from '../../../constants/localStorageKeys';
import useResizer from '../../../utils/utils';

const ExpandableBlock = (props) => {
    const textareaRef = useRef('');
    const accessToken = getFromSessionStorage(ACCESS_TOKEN) ?? getFromLocalStorage(ACCESS_TOKEN);
    const [expanded, setExpanded] = useState(false);
    const [text, setText] = useState('');
    const token = jwtDecode(accessToken);
    const apiURL = 'https://prozaapp.art/api/v1/';
    const handleTextChange = (event) => {
        setText(event.target.value);
    };
    const publish = () => {
        axios
            .post(
                apiURL + 'report/',
                {
                    headers: {
                        Authorization: 'Bearer ' + accessToken,
                        'Content-Type': 'application/json'
                    },
                    name: props.message,
                    content: text,
                    user: token.user_id,
                    article: props.id
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + accessToken
                    }
                }
            )
            .then(function () {
                props.toggleComplaintAlert();
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const isMobile = useResizer();
    const deleteV = () => {
        axios
            .delete(apiURL + 'articledelete/' + props.id + '/', {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            })
            .then(function () {
                props.toggleComplaintAlert();
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    return (
        <>
            {props.message === 'Видалити' ? (
                <div className={'textA'} onClick={deleteV} style={{ cursor: 'pointer' }}>
                    {props.message}
                </div>
            ) : (
                <div className={'textA'}>
                    {props.message}
                    <img
                        onClick={() => setExpanded(!expanded)}
                        src={expanded ? arrow : right}
                        alt={'arrow'}
                        className='expandedArrow'
                    />
                    {expanded && (
                        <div className='expandedBlock'>
                            <textarea
                                className={'inputExpandable'}
                                onChange={handleTextChange}
                                ref={textareaRef}
                            />
                            <img
                                src={sent}
                                alt='sent'
                                className={isMobile ? 'sentImgMobile' : 'sentImg'}
                                onClick={() => {
                                    publish();
                                    textareaRef.current.value = '';
                                }}
                            />
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default ExpandableBlock;
