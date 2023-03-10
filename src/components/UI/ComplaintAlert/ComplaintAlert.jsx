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
                    <ExpandedBlock message={'Це спам'} id={props.id} />
                    <ExpandedBlock message={'Мова ворожнечі або ворожі символи'} id={props.id} />
                    <ExpandedBlock
                        message={'Насильство або небезпечні організації'}
                        id={props.id}
                    />
                    <ExpandedBlock message={'Продаж небезпечних товарів'} id={props.id} />
                    <ExpandedBlock message={'Цькування або надокучання'} id={props.id} />
                    <ExpandedBlock message={'Плагіат'} />
                </div>
            </div>
        </Alert>
    );
};
export default ComplaintAlert;
