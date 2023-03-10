import './CategoriesMiddle.scss';
import React from 'react';
const CategoriesMiddle = (props) => {
    const setCategory = (value) => {
        props.setCategory(value);
    };
    return (
        <>
            <div className='middle'>
                <div className='lyric'>
                    <div className='txt'>Обрати вид лірики</div>
                    <div className='containerCat'>
                        <div
                            className={props.category === 0 ? 'categoryActive' : 'category'}
                            onClick={() => {
                                setCategory(0);
                            }}>
                            Інтимна
                        </div>
                        <div
                            className={props.category === 1 ? 'categoryActive' : 'category'}
                            onClick={() => {
                                setCategory(1);
                            }}>
                            {' '}
                            Громадянська
                        </div>
                        <div
                            className={props.category === 2 ? 'categoryActive' : 'category'}
                            onClick={() => {
                                setCategory(2);
                            }}>
                            {' '}
                            Філософська
                        </div>
                    </div>
                    <div className='containerCat'>
                        <div
                            className={props.category === 3 ? 'categoryActiveSolo' : 'categorySolo'}
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
                            className={props.category === 4 ? 'categoryActive' : 'category'}
                            onClick={() => {
                                setCategory(4);
                            }}>
                            {' '}
                            Трилер
                        </div>
                        <div
                            className={props.category === 5 ? 'categoryActive' : 'category'}
                            onClick={() => {
                                setCategory(5);
                            }}>
                            {' '}
                            Детектив
                        </div>
                        <div
                            className={props.category === 6 ? 'categoryActive' : 'category'}
                            onClick={() => {
                                setCategory(6);
                            }}>
                            {' '}
                            Фентезі
                        </div>
                    </div>
                    <div className='containerCat'>
                        <div
                            className={props.category === 7 ? 'categoryActive' : 'category'}
                            onClick={() => {
                                setCategory(7);
                            }}>
                            {' '}
                            Фантастика
                        </div>
                        <div
                            className={props.category === 8 ? 'categoryActive' : 'category'}
                            onClick={() => {
                                setCategory(8);
                            }}>
                            {' '}
                            Жахи
                        </div>
                        <div
                            className={props.category === 9 ? 'categoryActive' : 'category'}
                            onClick={() => {
                                setCategory(9);
                            }}>
                            {' '}
                            Містика
                        </div>
                    </div>
                    <div className='containerCat'>
                        <div
                            className={props.category === 10 ? 'categoryActive' : 'category'}
                            onClick={() => {
                                setCategory(10);
                            }}>
                            {' '}
                            Історичний
                        </div>
                        <div
                            className={props.category === 11 ? 'categoryActive' : 'category'}
                            onClick={() => {
                                setCategory(11);
                            }}>
                            {' '}
                            Любовний
                        </div>
                        <div
                            className={props.category === 12 ? 'categoryActive' : 'category'}
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
            </div>
        </>
    );
};

export default CategoriesMiddle;
