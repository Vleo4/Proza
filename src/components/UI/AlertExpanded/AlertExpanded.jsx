import { Alert } from 'react-bootstrap';
import './AlertExpanded.scss';

const AlertExpanded = (props) => {
    setTimeout(() => {
        if (props.alert) {
            props.toggleAlert();
        }
    }, 1500);
    return (
        <Alert show={props.alert} className='alertExp'>
            Скаргу відправлено
        </Alert>
    );
};
export default AlertExpanded;
