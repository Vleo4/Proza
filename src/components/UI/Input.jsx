import React from 'react';
import PropTypes from 'prop-types';
import './Input.scss';
import classNames from 'utils/classNames';

const Input = ({ type, placeholder, value, onChange, className }) => {
    const inputSyles = classNames({
        input: true,
        [className]: !!className
    });

    return (
        <div className={inputSyles}>
            <input type={type} value={value} placeholder={placeholder} onChange={onChange} />
        </div>
    );
};

Input.propTypes = {
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

export default Input;
