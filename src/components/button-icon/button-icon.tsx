import classNames from 'classnames';
import styles from './button-icon.module.scss';

export interface ButtonIconProps {
    className?: string;
    icon?: string;
    photo?: string;
    handle?: React.MouseEventHandler;
}

export const ButtonIcon = ({ className, icon = 'dots', photo = '', handle }: ButtonIconProps) => {
    let imgSrc;
    let imgClass;
    if (photo !== '') {
        imgSrc = `../img/${photo}`;
        imgClass = styles.photo;
    } else {
        imgSrc = `../img/ico_${icon}.svg`;
        imgClass = styles.ico;
    }
    // console.log(imgClass, imgSrc);

    return (
        <div className={classNames(styles.root, className)}>
            <div className="btn-ico" onClick={handle}>
                <img src={imgSrc} alt="" className={imgClass} />
            </div>
        </div>
    );
};
