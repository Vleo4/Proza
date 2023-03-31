import React, { useRef, useState } from 'react';
import sent from '../../../assets/images/ExpandedBlock/sent.png';
import arrow from '../../../assets/images/ExpandedBlock/arrow.png';
import right from '../../../assets/images/ExpandedBlock/right.png';
import useResizer from '../../../utils/utils';
import AlertExpanded from '../AlertExpanded/AlertExpanded';
import { deleteArticle, postComplaint } from '../../../api/requests';
import './ExpandedBlock.scss';

const ExpandableBlock = (props) => {
    const textareaRef = useRef('');
    const [expanded, setExpanded] = useState(false);
    const [text, setText] = useState('');
    const isMobile = useResizer();
    const handleTextChange = (event) => {
        setText(event.target.value);
    };
    const publish = () => {
        if (postComplaint(props.message, text, props.id)) {
            toggleAlert();
            props.toggleComplaintAlert();
        }
    };
    const deleteV = () => {
        if (deleteArticle(props.id)) {
            props.toggleComplaintAlert();
            window.location.href = '/profile';
        }
    };
    const [alert, setAlert] = useState(false);
    const toggleAlert = () => {
        setAlert(!alert);
    };
    return (
        <>
            <AlertExpanded alert={alert} toggleAlert={toggleAlert} />
            {props.message === 'Видалити' ? (
                <div className={'textA'} onClick={deleteV} style={{ cursor: 'pointer' }}>
                    {props.message}
                </div>
            ) : (
                <div className={'textA'}>
                    {props.message}
                    <img
                        onClick={() => setExpanded(!expanded)}
                        src={expanded ? arrow : right}
                        alt={'arrow'}
                        className={isMobile ? 'expandedArrowMobile' : 'expandedArrow'}
                    />
                    {expanded && (
                        <div className='expandedBlock'>
                            <textarea
                                className={'inputExpandable'}
                                onChange={handleTextChange}
                                ref={textareaRef}
                            />
                            <img
                                src={sent}
                                alt='sent'
                                className={isMobile ? 'sentImgMobile' : 'sentImg'}
                                onClick={() => {
                                    publish();
                                    textareaRef.current.value = '';
                                }}
                            />
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default ExpandableBlock;
