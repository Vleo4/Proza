import PropTypes from 'prop-types';
import classNames from 'utils/classNames';
import './Button.scss';
import { useNavigate } from 'react-router-dom';

const Button = ({
    label,
    onClick,
    type = 'default',
    className,
    isDisabled,
    path,
    leftIcon,
    rightIcon
}) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        if (!path) return;

        navigate(path);
    };

    const buttonStyles = classNames({
        button: true,
        disabled: isDisabled,
        [className]: !!className,
        [type]: !!type
    });

    const handleClick = () => {
        handleNavigate();

        if (isDisabled || !onClick) return;

        onClick();
    };

    return (
        <button className={buttonStyles} onClick={handleClick}>
            {leftIcon && <span className='leftIcon'>{leftIcon}</span>}
            {label}
            {rightIcon && <span className='rightIcon'>{rightIcon}</span>}
        </button>
    );
};

Button.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['default', 'transparent', 'bordered']),
    onClick: PropTypes.func,
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
    leftIcon: PropTypes.element,
    rightIcon: PropTypes.element
};

export default Button;
