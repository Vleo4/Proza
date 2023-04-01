import { Modal } from 'react-bootstrap';
import './AlertMobile.scss';
import Close from '../../../assets/images/Posts/Close.png';
import { Scrollbars } from 'react-custom-scrollbars';
import React, { useEffect, useState } from 'react';
const AlertMobile = (props) => {
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
        <Modal show={props.state.showAlert} className={'fullAlertMobile'}>
            <div className='postsMobile' ref={divRef}>
                <Scrollbars>
                    <div className='header-postMobile'>
                        {props.posts.tittle}
                        <img src={Close} onClick={props.toggleAlert} />
                    </div>
                    <div className='text'>
                        {props.content()} <div>{'\n'}</div>
                    </div>
                </Scrollbars>
            </div>
        </Modal>
    );
};
export default AlertMobile;
