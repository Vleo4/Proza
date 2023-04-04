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
                            className={props.category === 0 ? 'categoryActive' : 'categoryMobile'}
                            onClick={() => {
                                setCategory(0);
                            }}>
                            Інтимна
                        </div>
                        <div
                            className={props.category === 1 ? 'categoryActive' : 'categoryMobile'}
                            onClick={() => {
                                setCategory(1);
                            }}>
                            {' '}
                            Громадянська
                        </div>
                        <div
                            className={props.category === 2 ? 'categoryActive' : 'categoryMobile'}
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
                            className={props.category === 4 ? 'categoryActive' : 'categoryMobile'}
                            onClick={() => {
                                setCategory(4);
                            }}>
                            {' '}
                            Трилер
                        </div>
                        <div
                            className={props.category === 5 ? 'categoryActive' : 'categoryMobile'}
                            onClick={() => {
                                setCategory(5);
                            }}>
                            {' '}
                            Детектив
                        </div>
                        <div
                            className={props.category === 6 ? 'categoryActive' : 'categoryMobile'}
                            onClick={() => {
                                setCategory(6);
                            }}>
                            {' '}
                            Фентезі
                        </div>
                    </div>
                    <div className='containerCat'>
                        <div
                            className={props.category === 7 ? 'categoryActive' : 'categoryMobile'}
                            onClick={() => {
                                setCategory(7);
                            }}>
                            {' '}
                            Фантастика
                        </div>
                        <div
                            className={props.category === 8 ? 'categoryActive' : 'categoryMobile'}
                            onClick={() => {
                                setCategory(8);
                            }}>
                            {' '}
                            Жахи
                        </div>
                        <div
                            className={props.category === 9 ? 'categoryActive' : 'categoryMobile'}
                            onClick={() => {
                                setCategory(9);
                            }}>
                            {' '}
                            Містика
                        </div>
                    </div>
                    <div className='containerCat'>
                        <div
                            className={props.category === 10 ? 'categoryActive' : 'categoryMobile'}
                            onClick={() => {
                                setCategory(10);
                            }}>
                            {' '}
                            Історичний
                        </div>
                        <div
                            className={props.category === 11 ? 'categoryActive' : 'categoryMobile'}
                            onClick={() => {
                                setCategory(11);
                            }}>
                            {' '}
                            Любовний
                        </div>
                        <div
                            className={props.category === 12 ? 'categoryActive' : 'categoryMobile'}
                            onClick={() => {
                                setCategory(12);
                            }}>
                            {' '}
                            Пригоди
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoriesMiddle;
