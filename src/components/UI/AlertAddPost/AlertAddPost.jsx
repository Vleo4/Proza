import { Alert } from 'react-bootstrap';
import './AlertAddPost.scss';
import Close from '../../../assets/images/Posts/Close.png';
import React, { useState } from 'react';
import { publishPost } from '../../../api/requests';
const AlertAddPost = (props) => {
    const [text, setText] = useState(null);
    const [title, setTitle] = useState(null);
    const [next, setNext] = useState(false);
    const handleTextChange = (event) => {
        setText(event.target.value);
    };
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    const [category, setCategory] = useState(100);
    const publish = () => {
        async function fetchData() {
            let data = await publishPost(title, text, category + 1);
            if (data.status_code === 0) {
                alert('Такий твір уже опублікований');
                setNext(false);
            } else {
                setNext(false);
                setCategory(100);
                props.toggleAlert();
                window.location.reload(false);
            }
        }
        fetchData();
    };
    return (
        <Alert show={props.alert} className={'AlertAddPost'}>
            {!next ? (
                <div className='fullPost'>
                    <div className='posts'>
                        <div className='header-post'>
                            <input
                                className='header-input'
                                onChange={handleTitleChange}
                                type='text'
                                placeholder='Назва вірша'
                            />
                            <img src={Close} onClick={props.toggleAlert} />
                        </div>
                        <div className='text'>
                            <textarea
                                className='text-input'
                                onChange={handleTextChange}
                                placeholder='Ваш вірш'></textarea>
                        </div>
                        <button
                            className='publish'
                            onClick={() => {
                                if (text && title && title.length < 145) {
                                    setNext(true);
                                } else if (title.length >= 145) {
                                    alert('Максимальна довжина назви твору 145 символів');
                                } else {
                                    alert('Заповність усі поля');
                                }
                            }}>
                            Продовжити
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    {' '}
                    <div className='fullPost'>
                        <img src={Close} onClick={props.toggleAlert} />
                        <div className='posts'>
                            <div className='lyric'>
                                <div className='txt'>Обрати вид лірики</div>
                                <div className='containerCat'>
                                    <div
                                        className={
                                            category === 0 ? 'categoryActive' : 'categoryMobile'
                                        }
                                        onClick={() => {
                                            setCategory(0);
                                        }}>
                                        Інтимна
                                    </div>
                                    <div
                                        className={
                                            category === 1 ? 'categoryActive' : 'categoryMobile'
                                        }
                                        onClick={() => {
                                            setCategory(1);
                                        }}>
                                        {' '}
                                        Громадянська
                                    </div>
                                    <div
                                        className={
                                            category === 2 ? 'categoryActive' : 'categoryMobile'
                                        }
                                        onClick={() => {
                                            setCategory(2);
                                        }}>
                                        {' '}
                                        Філософська
                                    </div>
                                </div>
                                <div className='containerCat'>
                                    <div
                                        className={
                                            category === 3 ? 'categoryActiveSolo' : 'categorySolo'
                                        }
                                        onClick={() => {
                                            setCategory(3);
                                        }}>
                                        {' '}
                                        Пейзажна
                                    </div>
                                </div>
                            </div>
                            <div className='lyric'>
                                <div className='txt'>Обрати жанр прози</div>
                                <div className='containerCat'>
                                    <div
                                        className={
                                            category === 4 ? 'categoryActive' : 'categoryMobile'
                                        }
                                        onClick={() => {
                                            setCategory(4);
                                        }}>
                                        {' '}
                                        Трилер
                                    </div>
                                    <div
                                        className={
                                            category === 5 ? 'categoryActive' : 'categoryMobile'
                                        }
                                        onClick={() => {
                                            setCategory(5);
                                        }}>
                                        {' '}
                                        Детектив
                                    </div>
                                    <div
                                        className={
                                            category === 6 ? 'categoryActive' : 'categoryMobile'
                                        }
                                        onClick={() => {
                                            setCategory(6);
                                        }}>
                                        {' '}
                                        Фентезі
                                    </div>
                                </div>
                                <div className='containerCat'>
                                    <div
                                        className={
                                            category === 7 ? 'categoryActive' : 'categoryMobile'
                                        }
                                        onClick={() => {
                                            setCategory(7);
                                        }}>
                                        {' '}
                                        Фантастика
                                    </div>
                                    <div
                                        className={
                                            category === 8 ? 'categoryActive' : 'categoryMobile'
                                        }
                                        onClick={() => {
                                            setCategory(8);
                                        }}>
                                        {' '}
                                        Жахи
                                    </div>
                                    <div
                                        className={
                                            category === 9 ? 'categoryActive' : 'categoryMobile'
                                        }
                                        onClick={() => {
                                            setCategory(9);
                                        }}>
                                        {' '}
                                        Містика
                                    </div>
                                </div>
                                <div className='containerCat'>
                                    <div
                                        className={
                                            category === 10 ? 'categoryActive' : 'categoryMobile'
                                        }
                                        onClick={() => {
                                            setCategory(10);
                                        }}>
                                        {' '}
                                        Історичний
                                    </div>
                                    <div
                                        className={
                                            category === 11 ? 'categoryActive' : 'categoryMobile'
                                        }
                                        onClick={() => {
                                            setCategory(11);
                                        }}>
                                        {' '}
                                        Любовний
                                    </div>
                                    <div
                                        className={
                                            category === 12 ? 'categoryActive' : 'categoryMobile'
                                        }
                                        onClick={() => {
                                            setCategory(12);
                                        }}>
                                        {' '}
                                        Пригоди
                                    </div>
                                </div>
                            </div>
                            <div
                                className='clear'
                                onClick={() => {
                                    setCategory(100);
                                }}>
                                Очистити вибір
                            </div>
                            <button className='publish2' onClick={publish}>
                                Опублікувати
                            </button>
                        </div>
                    </div>
                </>
            )}
        </Alert>
    );
};
export default AlertAddPost;
