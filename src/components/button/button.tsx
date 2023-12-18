import classNames from 'classnames';
import styles from './button.module.scss';

export interface ButtonProps {
    label?: string;
    className?: string;
    ico?: string;
    handle?: React.MouseEventHandler;
}

export const Button = ({ label = 'button', className, ico = 'play', handle }: ButtonProps) => {
    return (
        <button className={className} onClick={handle}>
            {label}
            <img src={'../img/ico_' + ico + '.svg'} alt="" className="button__ico " />
        </button>
    );
};
