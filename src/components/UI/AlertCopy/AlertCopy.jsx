import { Alert } from 'react-bootstrap';
import './AlertCopy.scss';

const AlertCopy = (props) => {
    setTimeout(() => {
        if (props.state.alertCopy) {
            props.toggleCopyAlert();
        }
    }, 1500);
    return (
        <Alert show={props.state.alertCopy} className='copyAlert'>
            {' '}
            Посилання скопійовано у буфер обміну
        </Alert>
    );
};
export default AlertCopy;
