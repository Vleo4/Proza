import React from 'react';
import './Home.scss';
import '../../../styles/globals.scss';
import portrait from '../../../assets/images/portrait.svg';
import proza from '../../../assets/images/proza.svg';
//import { useMediaQuery } from 'react-responsive';
import Button from 'components/UI/Button';

const Home = () => {
    return (
        <div className='home-page'>
            <div className='top-bar'>
                <div className='top-content'>
                    <div className='logo-images'>
                        <span className='portrait-image'>
                            <img src={portrait} alt='portrait' />
                        </span>
                        <span className='proza-image'>
                            <img src={proza} alt='proza' />
                        </span>
                    </div>
                    <div className='buttons'>
                        <Button label='Вхід' type='bordered' path='/login' className='but-1' />
                        <Button
                            label='Реєстрація'
                            type='default'
                            path='/signup'
                            className='but-2'
                        />
                    </div>
                </div>
            </div>
            <div className='side-bar'></div>
            <div className='content'>
                {/* <div className='home-content-title'>
                    <span>Кохай як Жадан, Фотографуйся як Іздрик</span>
                </div>
                <div className='home-content-entry'>
                    <span>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit quibusdam
                        exercitationem obcaecati corrupti aperiam rem blanditiis eum, commodi
                        repudiandae eaque rerum natus totam, neque aspernatur porro maxime quasi
                        fugiat omnis!
                    </span>
                </div>
                <div className='nav-bar'>
                    <button type='default'>Вірші</button>
                    <button type='default'>Рецензії</button>
                </div> */}
            </div>
        </div>
    );
};

// const Home = () => {
//     const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' });
//     const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' });
//     const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
//     //const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
//     if (isDesktopOrLaptop) {
//         return (
//             <div className='home-page'>
//                 <LeftDiv />
//                 <div className='divRight' style={{ width: '60%' }}>
//                     <RightDiv />
//                 </div>
//             </div>
//         );
//     } else if (isBigScreen) {
//         return (
//             <div className='home-page'>
//                 <LeftDiv />
//                 <div className='divRight' style={{ width: '60%' }}>
//                     <RightDiv />
//                 </div>
//             </div>
//         );
//     } else if (isTabletOrMobile) {
//         return (
//             <div className='home-page'>
//                 <div className='divRight' style={{ width: '100%' }}>
//                     <RightDiv />
//                 </div>
//             </div>
//         );
//     }
// };
export default Home;
