import { Alert } from 'react-bootstrap';
import './AlertAddPostMobile.scss';
import Close from '../../../assets/images/Posts/Close.png';
import React, { useState } from 'react';
import axios from 'axios';
import { getFromLocalStorage, getFromSessionStorage } from '../../../utils/storage';
import { ACCESS_TOKEN } from '../../../constants/localStorageKeys';
import jwtDecode from 'jwt-decode';
const AlertAddPostMobile = (props) => {
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
    const [category, setCategory] = useState(100);
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
                    cat: category + 1,
                    user: token.user_id
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + accessToken
                    }
                }
            )
            .then(function (response) {
                if (response.data.status_code === 0) {
                    alert('Такий твір уже опублікований');
                    setNext(false);
                } else {
                    window.location.href = '/profile';
                    props.toggleAlert();
                }
            })
            .catch(function (error) {
                console.log(error);
                alert(error);
            });
    };
    const [next, setNext] = useState(false);
    return (
        <Alert show={props.alert} className={'AlertAddPostMobile'}>
            {!next ? (
                <div className='fullPostMobile'>
                    <div className='postsMobile'>
                        <div className='header-postMobile'>
                            <input
                                className='header-input'
                                onChange={handleTitleChange}
                                type='text'
                                placeholder='Назва вірша'
                            />{' '}
                            <img src={Close} className='headerImg' onClick={props.toggleAlert} />{' '}
                        </div>
                        <div className='text'>
                            <textarea
                                className='text-input'
                                onChange={handleTextChange}
                                placeholder='Ваш вірш'></textarea>
                        </div>
                        <button
                            className='publishMobile'
                            onClick={() => {
                                if (text && title) {
                                    setNext(true);
                                }
                            }}>
                            Продовжити
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div className='fullPostMobile'>
                        <div className='postsMobile'>
                            <div className='lyric'>
                                <div className='txt'>Обрати вид лірики</div>
                                <div className='containerCatMobile'>
                                    <div
                                        className={
                                            category === 0
                                                ? 'categoryActiveMobile'
                                                : 'categoryMobile'
                                        }
                                        onClick={() => {
                                            setCategory(0);
                                        }}>
                                        Інтимна
                                    </div>
                                    <div
                                        className={
                                            category === 1
                                                ? 'categoryActiveMobile'
                                                : 'categoryMobile'
                                        }
                                        onClick={() => {
                                            setCategory(1);
                                        }}>
                                        {' '}
                                        Громадянська
                                    </div>
                                </div>
                                <div className='containerCatMobile'>
                                    <div
                                        className={
                                            category === 3
                                                ? 'categoryActiveMobile'
                                                : 'categoryMobile'
                                        }
                                        onClick={() => {
                                            setCategory(3);
                                        }}>
                                        {' '}
                                        Пейзажна
                                    </div>
                                    <div
                                        className={
                                            category === 2
                                                ? 'categoryActiveMobile'
                                                : 'categoryMobile'
                                        }
                                        onClick={() => {
                                            setCategory(2);
                                        }}>
                                        {' '}
                                        Філософська
                                    </div>
                                </div>
                            </div>
                            <div className='lyric'>
                                <div className='txt'>Обрати жанр прози</div>
                                <div className='containerCat'>
                                    <div
                                        className={
                                            category === 4
                                                ? 'categoryActiveMobile'
                                                : 'categoryMobile'
                                        }
                                        onClick={() => {
                                            setCategory(4);
                                        }}>
                                        {' '}
                                        Трилер
                                    </div>
                                    <div
                                        className={
                                            category === 5
                                                ? 'categoryActiveMobile'
                                                : 'categoryMobile'
                                        }
                                        onClick={() => {
                                            setCategory(5);
                                        }}>
                                        {' '}
                                        Детектив
                                    </div>
                                </div>
                                <div className='containerCat'>
                                    <div
                                        className={
                                            category === 6
                                                ? 'categoryActiveMobile'
                                                : 'categoryMobile'
                                        }
                                        onClick={() => {
                                            setCategory(6);
                                        }}>
                                        {' '}
                                        Фентезі
                                    </div>
                                    <div
                                        className={
                                            category === 7
                                                ? 'categoryActiveMobile'
                                                : 'categoryMobile'
                                        }
                                        onClick={() => {
                                            setCategory(7);
                                        }}>
                                        {' '}
                                        Фантастика
                                    </div>
                                </div>
                                <div className='containerCatMobile'>
                                    <div
                                        className={
                                            category === 8
                                                ? 'categoryActiveMobile'
                                                : 'categoryMobile'
                                        }
                                        onClick={() => {
                                            setCategory(8);
                                        }}>
                                        {' '}
                                        Жахи
                                    </div>
                                    <div
                                        className={
                                            category === 9
                                                ? 'categoryActiveMobile'
                                                : 'categoryMobile'
                                        }
                                        onClick={() => {
                                            setCategory(9);
                                        }}>
                                        {' '}
                                        Містика
                                    </div>
                                </div>
                                <div className='containerCatMobile'>
                                    <div
                                        className={
                                            category === 10
                                                ? 'categoryActiveMobile'
                                                : 'categoryMobile'
                                        }
                                        onClick={() => {
                                            setCategory(10);
                                        }}>
                                        {' '}
                                        Історичний
                                    </div>
                                    <div
                                        className={
                                            category === 11
                                                ? 'categoryActiveMobile'
                                                : 'categoryMobile'
                                        }
                                        onClick={() => {
                                            setCategory(11);
                                        }}>
                                        {' '}
                                        Любовний
                                    </div>
                                </div>
                            </div>
                            <div className='containerCatMobile'>
                                <div
                                    className={
                                        category === 12 ? 'categoryActiveMobile' : 'categoryMobile'
                                    }
                                    onClick={() => {
                                        setCategory(12);
                                    }}>
                                    {' '}
                                    Пригоди
                                </div>
                            </div>
                            <div
                                className='clear'
                                onClick={() => {
                                    setCategory(100);
                                }}>
                                Очистити вибір
                            </div>
                            <button className='publishMobile' onClick={publish}>
                                Опублікувати
                            </button>
                        </div>
                    </div>
                </>
            )}
        </Alert>
    );
};
export default AlertAddPostMobile;
