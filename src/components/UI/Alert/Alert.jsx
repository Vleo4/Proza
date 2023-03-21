import { Alert } from 'react-bootstrap';
import '../Posts/Posts.scss';
import Close from '../../../assets/images/Posts/Close.png';
import { Scrollbars } from 'react-custom-scrollbars';

const AlertPost = (props) => {
    const renderThumbHorizontal = ({ style, ...props }) => {
        const finalStyle = {
            ...style,
            display: 'none'
        };
        return <div style={finalStyle} {...props} />;
    };
    return (
        <Alert show={props.state.showAlert} className={'fullAlert'}>
            <div className='posts'>
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
