import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import HomeLayout from 'components/layouts/HomeLayout';
import Button from 'components/UI/Button';

const Signup = () => {
    return (
        <HomeLayout>
            <div>
                <Button
                    label='Назад'
                    type='transparent'
                    path='/home'
                    leftIcon={<BsArrowLeft width={10} height={10} />}
                />
                <Button label='Вхід' type='default' path='/login' />
            </div>
        </HomeLayout>
    );
};

export default Signup;
