import { Modal } from 'react-bootstrap';
import './RefactorAlert.scss';
import '../CategoriesMiddle/CategoriesMiddle.scss';
import React, { useState } from 'react';
import useResizer from '../../../utils/utils';
import portrait from '../../../assets/images/portrait.svg';
import { updateProfile } from '../../../api/requests';

const AlertRefactor = (props) => {
    const [categories, setCategories] = React.useState({ items: [] });
    const setCategory = (value) => {
        if (categories.items.includes(value)) {
            setCategories((prevState) => ({
                items: prevState.items.filter((item) => item !== value)
            }));
        } else {
            setCategories((prevState) => ({
                items: [...prevState.items, value]
            }));
        }
    };
    const clearCategory = () => {
        setCategories({ items: [] });
    };
    const [text, setText] = useState(null);
    const handleTextChange = (event) => {
        setText(event.target.value);
    };
    const isMobile = useResizer();
    const [file, setFile] = useState(null);
    const [photo, setPhoto] = useState(null);
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        const fileUrl = URL.createObjectURL(event.target.files[0]);
        setPhoto(fileUrl);
    };

    const refactor = () => {
        let cat = categories.items[0] + 1;
        let data = { fav_category: cat };
        if (text) {
            data = { ...data, description: text };
        }
        if (file) {
            data = { ...data, photo: file };
        }
        if (categories.items[0]) {
            data = { ...data, description: text };
        } else {
            data = { ...data, fav_category: props.cat[0] };
        }
        if (updateProfile(data)) {
            props.toggleAlert();
        }
    };
    return (
        <Modal show={props.alert} className={isMobile ? 'signAlertMobile' : 'signAlert'}>
            {isMobile ? (
                <div className='postsMobile'>
                    <div className='signPostMobile'>
                        <div className='headerSignMobile'>Редагування профілю</div>
                        <input
                            className='inputSignup'
                            onChange={handleTextChange}
                            placeholder='Опис вашого аккаунту'></input>
                        <div className='miniSignupMobile'>Наявність опису не є обов’язковою.</div>
                        <span className='textSignupMobile'>
                            Для кращого підбору цікавої вам літератури вкажіть, будь ласка, свої
                            вподобання.
                        </span>
                        <div className='lyric'>
                            <div className='txt'>Обрати вид лірики</div>
                            <div className='containerCatSign'>
                                <div
                                    className={
                                        categories.items.includes(0)
                                            ? 'categoryActive'
                                            : 'categoryMobile'
                                    }
                                    onClick={() => {
                                        setCategory(0);
                                    }}>
                                    Інтимна
                                </div>
                                <div
                                    className={
                                        categories.items.includes(1)
                                            ? 'categoryActive'
                                            : 'categoryMobile'
                                    }
                                    onClick={() => {
                                        setCategory(1);
                                    }}>
                                    {' '}
                                    Громадянська
                                </div>
                            </div>
                            <div className='containerCatSign'>
                                <div
                                    className={
                                        categories.items.includes(2)
                                            ? 'categoryActive'
                                            : 'categoryMobile'
                                    }
                                    onClick={() => {
                                        setCategory(2);
                                    }}>
                                    {' '}
                                    Філософська
                                </div>
                                <div
                                    className={
                                        categories.items.includes(3)
                                            ? 'categoryActive'
                                            : 'categoryMobile'
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
                            <div className='containerCatSign'>
                                <div
                                    className={
                                        categories.items.includes(4)
                                            ? 'categoryActive'
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
                                        categories.items.includes(5)
                                            ? 'categoryActive'
                                            : 'categoryMobile'
                                    }
                                    onClick={() => {
                                        setCategory(5);
                                    }}>
                                    {' '}
                                    Детектив
                                </div>
                            </div>
                            <div className='containerCatSign'>
                                <div
                                    className={
                                        categories.items.includes(6)
                                            ? 'categoryActive'
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
                                        categories.items.includes(7)
                                            ? 'categoryActive'
                                            : 'categoryMobile'
                                    }
                                    onClick={() => {
                                        setCategory(7);
                                    }}>
                                    {' '}
                                    Фантастика
                                </div>
                            </div>
                            <div className='containerCatSign'>
                                <div
                                    className={
                                        categories.items.includes(8)
                                            ? 'categoryActive'
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
                                        categories.items.includes(9)
                                            ? 'categoryActive'
                                            : 'categoryMobile'
                                    }
                                    onClick={() => {
                                        setCategory(9);
                                    }}>
                                    {' '}
                                    Містика
                                </div>
                            </div>
                            <div className='containerCatSign'>
                                <div
                                    className={
                                        categories.items.includes(10)
                                            ? 'categoryActive'
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
                                        categories.items.includes(11)
                                            ? 'categoryActive'
                                            : 'categoryMobile'
                                    }
                                    onClick={() => {
                                        setCategory(11);
                                    }}>
                                    {' '}
                                    Любовний
                                </div>
                            </div>
                            <div className='containerCatSign'>
                                <div
                                    className={
                                        categories.items.includes(12)
                                            ? 'categoryActive'
                                            : 'categoryMobile'
                                    }
                                    onClick={() => {
                                        setCategory(12);
                                    }}>
                                    {' '}
                                    Пригоди
                                </div>
                            </div>
                        </div>
                        <div className='clearMobile' onClick={clearCategory}>
                            Очистити вибір
                        </div>{' '}
                        <input
                            type='file'
                            accept='image/*'
                            className='pInputMobile'
                            onChange={handleFileChange}
                        />
                        <img
                            src={file ? photo : props.imageData ? props.imageData : portrait}
                            className='photoUserMobile'
                        />
                        <div className='endMobile' onClick={refactor}>
                            Завершити реєстрацію
                        </div>
                    </div>
                </div>
            ) : (
                <div className='posts'>
                    <div className='signPost'>
                        <div className='headerSign'>Редагування профілю</div>
                        <input
                            className='inputSignup'
                            onChange={handleTextChange}
                            placeholder='Опис вашого аккаунту'></input>
                        <div className='miniSignup'>Наявність опису не є обов’язковою.</div>
                        <span className='textSignup'>
                            Для кращого підбору цікавої вам літератури вкажіть, будь ласка, свої
                            вподобання.
                        </span>
                        <div className='lyric'>
                            <div className='txt'>Обрати вид лірики</div>
                            <div className='containerCatSign'>
                                <div
                                    className={
                                        categories.items.includes(0)
                                            ? 'categoryActive'
                                            : 'categoryMobile'
                                    }
                                    onClick={() => {
                                        setCategory(0);
                                    }}>
                                    Інтимна
                                </div>
                                <div
                                    className={
                                        categories.items.includes(1)
                                            ? 'categoryActive'
                                            : 'categoryMobile'
                                    }
                                    onClick={() => {
                                        setCategory(1);
                                    }}>
                                    {' '}
                                    Громадянська
                                </div>
                                <div
                                    className={
                                        categories.items.includes(2)
                                            ? 'categoryActive'
                                            : 'categoryMobile'
                                    }
                                    onClick={() => {
                                        setCategory(2);
                                    }}>
                                    {' '}
                                    Філософська
                                </div>
                            </div>
                            <div className='containerCatSign'>
                                <div
                                    className={
                                        categories.items.includes(3)
                                            ? 'categoryActiveSolo'
                                            : 'categorySolo'
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
                            <div className='containerCatSign'>
                                <div
                                    className={
                                        categories.items.includes(4)
                                            ? 'categoryActive'
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
                                        categories.items.includes(5)
                                            ? 'categoryActive'
                                            : 'categoryMobile'
                                    }
                                    onClick={() => {
                                        setCategory(5);
                                    }}>
                                    {' '}
                                    Детектив
                                </div>
                                <div
                                    className={
                                        categories.items.includes(6)
                                            ? 'categoryActive'
                                            : 'categoryMobile'
                                    }
                                    onClick={() => {
                                        setCategory(6);
                                    }}>
                                    {' '}
                                    Фентезі
                                </div>
                            </div>
                            <div className='containerCatSign'>
                                <div
                                    className={
                                        categories.items.includes(7)
                                            ? 'categoryActive'
                                            : 'categoryMobile'
                                    }
                                    onClick={() => {
                                        setCategory(7);
                                    }}>
                                    {' '}
                                    Фантастика
                                </div>
                                <div
                                    className={
                                        categories.items.includes(8)
                                            ? 'categoryActive'
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
                                        categories.items.includes(9)
                                            ? 'categoryActive'
                                            : 'categoryMobile'
                                    }
                                    onClick={() => {
                                        setCategory(9);
                                    }}>
                                    {' '}
                                    Містика
                                </div>
                            </div>
                            <div className='containerCatSign'>
                                <div
                                    className={
                                        categories.items.includes(10)
                                            ? 'categoryActive'
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
                                        categories.items.includes(11)
                                            ? 'categoryActive'
                                            : 'categoryMobile'
                                    }
                                    onClick={() => {
                                        setCategory(11);
                                    }}>
                                    {' '}
                                    Любовний
                                </div>
                                <div
                                    className={
                                        categories.items.includes(12)
                                            ? 'categoryActive'
                                            : 'categoryMobile'
                                    }
                                    onClick={() => {
                                        setCategory(12);
                                    }}>
                                    {' '}
                                    Пригоди
                                </div>
                            </div>
                        </div>
                        <div className='clear' onClick={clearCategory}>
                            Очистити вибір
                        </div>{' '}
                        <input
                            type='file'
                            accept='image/*'
                            className='pInput'
                            onChange={handleFileChange}
                        />
                        <img
                            src={file ? photo : props.imageData ? props.imageData : portrait}
                            className='photoUser'
                        />{' '}
                        <div className='end' onClick={refactor}>
                            Завершити редагування
                        </div>
                    </div>
                </div>
            )}
        </Modal>
    );
};
export default AlertRefactor;
