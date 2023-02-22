import './HeaderMobile.scss';
import logo from '../../../assets/images/portrait.png';
import proza from '../../../assets/images/proza.svg';
import guest from '../../../assets/images/Header/Guest.png';
const HeaderMobile = () => {
    return (
        <div className='headerMobile-verse'>
            <img src={logo} className='logo' alt='logo' />
            <img src={proza} className='proza' alt='proza' />
            <a>Гість</a>
            <img src={guest} className='guest' alt='guest' />
        </div>
    );
};

export default HeaderMobile;
