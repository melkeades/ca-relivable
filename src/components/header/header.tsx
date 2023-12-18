import classNames from 'classnames';
import styles from './header.module.scss';
import { ButtonIcon } from '../button-icon/button-icon';
import { signal } from '@preact/signals-react';
import { screenS } from '../../App';
import { metaDb } from '../../db';
export interface HeaderProps {
    className?: string;
    // screen: string;
    names: string;
    momentName?: string;
    momentIndex?: number;
    momentTotal?: number;
}

export const Header = ({
    className,
    names = 'Casey &Peter',
    // screen = '',
    momentName = 'moment name',
    momentIndex = 1,
    momentTotal = 4,
}: HeaderProps) => {
    const renderLeft = () => {
        if (screenS.value === 'home') {
            return <img src="../img/logo.webp" alt="" className={styles.logo} />;
        }
        if (screenS.value === 'moments' || screenS.value === 'momentOpen') {
            return <h5 className={styles.names}>{names}</h5>;
        }
    };
    const renderCenter = () => {
        if (screenS.value === 'moments') {
            return <div className={styles.title}>Relive Moments</div>;
        }
        if (screenS.value === 'momentOpen') {
            return (
                <div className={styles.title_wrap}>
                    <div className={styles.title}>{momentName}</div>
                    <div className={styles.progress_wrap}>
                        {[...Array(momentTotal)].map((moment, index) => {
                            const classes =
                                index === momentIndex - 1
                                    ? classNames(styles.progress, styles.progress_active)
                                    : styles.progress;
                            return <div key={index} className={classes}></div>;
                        })}
                    </div>
                </div>
            );
        }
    };
    const renderRight = () => {
        if (
            screenS.value === 'home' ||
            screenS.value === 'galleryOpen' ||
            screenS.value === 'momentOpen'
        ) {
            return (
                <div className={styles.icons}>
                    <ButtonIcon photo="profile.webp" />
                    <ButtonIcon icon="upload" />
                </div>
            );
        }
        if (screenS.value === 'moments') {
            return (
                <ButtonIcon
                    icon="close"
                    handle={() => {
                        screenS.value = 'home';
                    }}
                />
            );
        }
    };

    return (
        <div className={classNames(styles.root, className, styles.header)}>
            <div className={styles.left}>{renderLeft()}</div>
            <div className={styles.center}>{renderCenter()} </div>
            <div className={styles.right}>{renderRight()}</div>
        </div>
    );
};
