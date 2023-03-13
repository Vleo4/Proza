import { Alert } from 'react-bootstrap';
import './AlertAddPost.scss';
import Close from '../../../assets/images/Posts/Close.png';
import React, { useState } from 'react';
import axios from 'axios';
import { getFromLocalStorage, getFromSessionStorage } from '../../../utils/storage';
import { ACCESS_TOKEN } from '../../../constants/localStorageKeys';
import jwtDecode from 'jwt-decode';
const AlertAddPost = (props) => {
    const accessToken = getFromSessionStorage(ACCESS_TOKEN) ?? getFromLocalStorage(ACCESS_TOKEN);
    const token = jwtDecode(accessToken);
    const [text, setText] = useState(null);
    const [title, setTitle] = useState(null);
    const handleTextChange = (event) => {
        setText(event.target.value);
    };
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    const apiURL = 'https://prozaapp.art/api/v1/';
    const publish = () => {
        axios
            .post(
                apiURL + 'articlecreate/',
                {
                    headers: {
                        Authorization: 'Bearer ' + accessToken,
                        'Content-Type': 'application/json'
                    },
                    title: title,
                    content: text,
                    cat: 1,
                    user: token.user_id
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + accessToken
                    }
                }
            )
            .then(function (response) {
                console.log(response);
                window.location.href = '/profile';
                props.toggleAlert();
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    return (
        <Alert show={props.alert} className={'AlertAddPost'}>
            <div className='fullPost'>
                <img src={Close} onClick={props.toggleAlert} />
                <div className='posts'>
                    <div className='header-post'>
                        {' '}
                        <input
                            className='header-input'
                            onChange={handleTitleChange}
                            type='text'
                            placeholder='Назва вірша'
                        />
                    </div>
                    <div className='text'>
                        <textarea
                            className='text-input'
                            onChange={handleTextChange}
                            placeholder='Ваш вірш'></textarea>
                    </div>
                    <button className='publish' onClick={publish}>
                        Опублікувати
                    </button>
                </div>
            </div>
        </Alert>
    );
};
export default AlertAddPost;
