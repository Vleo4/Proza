import './Users.scss';
import { useState } from 'react';
import subscribe from '../../../assets/images/Users/subscribe.png';
import noSubscribe from '../../../assets/images/Users/noSubscribe.png';
import model from '../../../assets/images/Users/model.png';
const Users = (props) => {
    const [isSubscribe, setIsSubscribe] = useState(true);
    const onSubscribe = () => {
        setIsSubscribe(!isSubscribe);
    };

    return (
        <div className='user'>
            <div className='header-user'>
                <div className='avatar'>
                    <img className='avatarImage' src={model} alt='avatar' />
                    <img
                        className='avatarStatus'
                        src={isSubscribe ? subscribe : noSubscribe}
                        onClick={onSubscribe}
                        alt={'subscribe'}
                    />
                </div>
                {props.author}
                <div className='info'>
                    <div className='part'>
                        <div className='leftSide'>Публікації</div>
                        <div className='rightSide'>
                            7
                            <div />
                        </div>
                    </div>
                </div>
            </div>
            <div className='footer-user'>
                <div>Популярні твори</div>
                <div>{props.verseOne}</div>
                <div>{props.verseSecond}</div>
            </div>
        </div>
    );
};

export default Users;
