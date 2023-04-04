import './CategoriesMiddleMobile.scss';
import React from 'react';
const CategoriesMiddleMobile = (props) => {
    const setCategory = (value) => {
        props.setCategory(value);
    };
    return (
        <>
            <div className='middleMobile'>
                <div className='lyric'>
                    <div className='txt'>Обрати вид лірики</div>
                    <div className='containerCatMobile'>
                        <div
                            className={
                                props.category === 0 ? 'categoryActiveMobile' : 'categoryMobile'
                            }
                            onClick={() => {
                                setCategory(0);
                            }}>
                            Інтимна
                        </div>
                        <div
                            className={
                                props.category === 1 ? 'categoryActiveMobile' : 'categoryMobile'
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
                                props.category === 3 ? 'categoryActiveMobile' : 'categoryMobile'
                            }
                            onClick={() => {
                                setCategory(3);
                            }}>
                            {' '}
                            Пейзажна
                        </div>
                        <div
                            className={
                                props.category === 2 ? 'categoryActiveMobile' : 'categoryMobile'
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
                                props.category === 4 ? 'categoryActiveMobile' : 'categoryMobile'
                            }
                            onClick={() => {
                                setCategory(4);
                            }}>
                            {' '}
                            Трилер
                        </div>
                        <div
                            className={
                                props.category === 5 ? 'categoryActiveMobile' : 'categoryMobile'
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
                                props.category === 6 ? 'categoryActiveMobile' : 'categoryMobile'
                            }
                            onClick={() => {
                                setCategory(6);
                            }}>
                            {' '}
                            Фентезі
                        </div>
                        <div
                            className={
                                props.category === 7 ? 'categoryActiveMobile' : 'categoryMobile'
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
                                props.category === 8 ? 'categoryActiveMobile' : 'categoryMobile'
                            }
                            onClick={() => {
                                setCategory(8);
                            }}>
                            {' '}
                            Жахи
                        </div>
                        <div
                            className={
                                props.category === 9 ? 'categoryActiveMobile' : 'categoryMobile'
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
                                props.category === 10 ? 'categoryActiveMobile' : 'categoryMobile'
                            }
                            onClick={() => {
                                setCategory(10);
                            }}>
                            {' '}
                            Історичний
                        </div>
                        <div
                            className={
                                props.category === 11 ? 'categoryActiveMobile' : 'categoryMobile'
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
                            props.category === 12 ? 'categoryActiveMobile' : 'categoryMobile'
                        }
                        onClick={() => {
                            setCategory(12);
                        }}>
                        {' '}
                        Пригоди
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoriesMiddleMobile;
