import { Alert } from 'react-bootstrap';
import '../Posts/Posts.scss';
import Close from '../../../assets/images/Posts/Close.png';
import ExpandedBlock from '../ExpandedBlock/ExpandedBlock';

const ComplaintAlert = (props) => {
    return (
        <Alert show={props.state.complaintAlert} className='complaintAlert'>
            <div className='postsA'>
                <div className='header-postA'>
                    Скарга
                    <img src={Close} onClick={props.toggleComplaintAlert} />
                </div>
                <div className='text'>
                    <ExpandedBlock message={'Це спам'} />
                    <ExpandedBlock message={'Мова ворожнечі або ворожі символи'} />
                    <ExpandedBlock message={'Насильство або небезпечні організації'} />
                    <ExpandedBlock message={'Продаж небезпечних товарів'} />
                    <ExpandedBlock message={'Цькування або надокучання'} />
                    <ExpandedBlock message={'Плагіат'} />
                </div>
            </div>
        </Alert>
    );
};
export default ComplaintAlert;
