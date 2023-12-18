import classNames from 'classnames';
import styles from './footer.module.scss';
import { ButtonIcon } from '../button-icon/button-icon';
import { screenS } from '../../App';

export interface FooterProps {
    className?: string;
    // screen: string;
}

export const Footer = ({ className }: FooterProps) => {
    const renderFooter = () => {
        // if (screenS.value === 'momentOpen') {
        return (
            <div
                className={classNames(
                    styles.root,
                    'default',
                    screenS.value === 'momentOpen' && 'active'
                )}
            >
                <div className={styles.footer}>
                    <div className={styles.left}>
                        <ButtonIcon icon="gallery" />
                        <ButtonIcon icon="folder" />
                    </div>
                    <div className={styles.center}>
                        <ButtonIcon icon="prev" />
                        <ButtonIcon icon="pause" />
                        <ButtonIcon icon="next" />
                    </div>
                    <div className={styles.right}>
                        <ButtonIcon icon="volume" />
                    </div>
                </div>
            </div>
        );
        // }
    };
    return renderFooter();
};
