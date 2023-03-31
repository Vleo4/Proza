import { Modal } from 'react-bootstrap';
import './AlertMobile.scss';
import Close from '../../../assets/images/Posts/Close.png';
import { Scrollbars } from 'react-custom-scrollbars';
import React, { useEffect } from 'react';
const AlertMobile = (props) => {
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
        <Modal show={props.state.showAlert} className={'fullAlertMobile'}>
            <div className='postsMobile' ref={divRef}>
                <Scrollbars>
                    <div className='header-postMobile'>
                        {props.posts.tittle}
                        <img src={Close} onClick={props.toggleAlert} />
                    </div>
                    <div className='text'>{props.content()}</div>
                </Scrollbars>
            </div>
        </Modal>
    );
};
export default AlertMobile;
