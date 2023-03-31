import { Alert } from 'react-bootstrap';
import './Alert.scss';
import Close from '../../../assets/images/Posts/Close.png';
import { Scrollbars } from 'react-custom-scrollbars';
import React, { useEffect } from 'react';

const AlertPost = (props) => {
    const renderThumbHorizontal = ({ style, ...props }) => {
        const finalStyle = {
            ...style,
            display: 'none'
        };
        return <div style={finalStyle} {...props} />;
    };
    const divRef = React.useRef();

    useEffect(() => {
        function handleClickOutside(event) {
            if (divRef.current && !divRef.current.contains(event.target)) {
                props.toggleAlert();
            }
        }

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [divRef]);

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
                    <div className='text'>{props.content()}</div>
                </Scrollbars>
            </div>
        </Alert>
    );
};
export default AlertPost;
