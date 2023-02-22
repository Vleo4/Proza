import { Alert } from 'react-bootstrap';
import '../Posts/Posts.scss';
import Close from '../../../assets/images/Posts/Close.png';
import { Scrollbars } from 'react-custom-scrollbars';

const AlertPost = (props) => {
    return (
        <Alert show={props.state.showAlert} className={'fullAlert'}>
            <div className='posts'>
                <Scrollbars>
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
