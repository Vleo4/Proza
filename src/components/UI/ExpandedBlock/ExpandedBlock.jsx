import React, { useState } from 'react';
import sent from '../../../assets/images/ExpandedBlock/sent.png';
import arrow from '../../../assets/images/ExpandedBlock/arrow.png';
import right from '../../../assets/images/ExpandedBlock/right.png';

const ExpandableBlock = (props) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className={'textA'}>
            {props.message}
            <img
                onClick={() => setExpanded(!expanded)}
                src={expanded ? arrow : right}
                alt={'arrow'}
                className='expandedArrow'
            />
            {expanded && (
                <div className='expandedBlock'>
                    <textarea className={'inputExpandable'} />
                    <img src={sent} alt='sent' className='sentImg' />
                </div>
            )}
        </div>
    );
};

export default ExpandableBlock;
