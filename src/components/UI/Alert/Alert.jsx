import { Alert } from 'react-bootstrap';
import './Alert.scss';
import Close from '../../../assets/images/Posts/Close.png';
import { Scrollbars } from 'react-custom-scrollbars';
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

const AlertPost = (props) => {
    const renderThumbHorizontal = ({ style, ...props }) => {
        const finalStyle = {
            ...style,
            display: 'none'
        };
        return <div style={finalStyle} {...props} />;
    };
    const divRef = React.useRef();
    const [first, setFirst] = useState(true);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (divRef.current && !divRef.current.contains(event.target)) {
                setFirst(true);
                props.toggleAlert();
                document.removeEventListener('click', handleClickOutside);
            }
        };
        if (props.state.showAlert && first) {
            setTimeout(() => {
                document.addEventListener('click', handleClickOutside);
                setFirst(false);
            }, 500);
        }
    }, [props.state.showAlert, divRef]);
    return (
        <Alert show={props.state.showAlert} className={'fullAlert'}>
            <div className='posts' ref={divRef}>
                <Scrollbars
                    autoHide
                    autoHideTimeout={1000}
                    renderThumbHorizontal={renderThumbHorizontal}>
                    <div className='header-post'>
                        {props.posts.tittle}
                        <img src={Close} onClick={props.toggleAlert} />
                    </div>
                    <div className='text'>
                        {props.content()}
                        <div>{'\n'}</div>
                    </div>
                </Scrollbars>
            </div>
        </Alert>
    );
};
export default AlertPost;
