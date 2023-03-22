import { Alert } from 'react-bootstrap';
import '../Posts/Posts.scss';
import Close from '../../../assets/images/Posts/Close.png';
import ExpandedBlock from '../ExpandedBlock/ExpandedBlock';

const ComplaintAlertMobile = (props) => {
    return (
        <Alert show={props.state.complaintAlert} className='complaintAlertMobile'>
            <div className='postsA'>
                <div className='header-postA'>
                    Скарга
                    <img src={Close} onClick={props.toggleComplaintAlert} />
                </div>
                <div className='text'>
                    <ExpandedBlock
                        message={'Це спам'}
                        id={props.id}
                        toggleComplaintAlert={props.toggleComplaintAlert}
                    />
                    <ExpandedBlock
                        message={'Мова ворожнечі або ворожі символи'}
                        id={props.id}
                        toggleComplaintAlert={props.toggleComplaintAlert}
                    />
                    <ExpandedBlock
                        message={'Насильство або небезпечні організації'}
                        id={props.id}
                        toggleComplaintAlert={props.toggleComplaintAlert}
                    />
                    <ExpandedBlock message={'Продаж небезпечних товарів'} id={props.id} />
                    <ExpandedBlock
                        message={'Цькування або надокучання'}
                        id={props.id}
                        toggleComplaintAlert={props.toggleComplaintAlert}
                    />
                    <ExpandedBlock
                        message={'Плагіат'}
                        toggleComplaintAlert={props.toggleComplaintAlert}
                    />
                    {props.author === props.current ? (
                        <ExpandedBlock
                            message={'Видалити'}
                            id={props.id}
                            toggleComplaintAlert={props.toggleComplaintAlert}
                        />
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </Alert>
    );
};
export default ComplaintAlertMobile;
