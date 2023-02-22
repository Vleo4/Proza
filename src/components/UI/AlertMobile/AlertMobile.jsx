import { Alert } from 'react-bootstrap';
import '../PostsMobile/PostsMobile.scss';
import Close from '../../../assets/images/Posts/Close.png';
import { Scrollbars } from 'react-custom-scrollbars';

const AlertMobile = (props) => {
    return (
        <Alert show={props.state.showAlert} className={'fullAlertMobile'}>
            <div className='postsMobile'>
                <Scrollbars>
                    <div className='header-postMobile'>
                        {props.posts.tittle}
                        <img src={Close} onClick={props.toggleAlert} />
                    </div>
                    <div className='text'>{props.content()}</div>
                </Scrollbars>
            </div>
        </Alert>
    );
};
export default AlertMobile;
