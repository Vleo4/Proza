import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'utils/classNames';
import './Input.scss';

const Input = ({
    type,
    placeholder,
    value = '',
    onChange = () => {},
    onBlur = () => {},
    className,
    error,
    inputProps = {}
}) => {
    const inputSyles = classNames({
        input: true,
        [className]: !!className,
        error: !!error
    });

    return (
        <div className={inputSyles}>
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                className='input__input'
                {...inputProps}
            />
            <label className='input__label'>{placeholder}</label>
            {error && <span className='input__error-text'>{error.message}</span>}
        </div>
    );
};

Input.propTypes = {
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    error: PropTypes.object,
    inputProps: PropTypes.object
};

export default Input;
