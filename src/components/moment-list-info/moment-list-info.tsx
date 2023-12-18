import classNames from 'classnames';
import styles from './moment-list-info.module.scss';
import { ButtonWrap } from '../button-wrap/button-wrap';
import { Button } from '../button/button';

export interface MomentListInfoProps {
    className?: string;
    photoIndex: string;
}


export const MomentListInfo = ({ className }: MomentListInfoProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <div className="info">
                <h2 className={styles.h2}>0.</h2>
                <h3 className={styles.h3}>Casey &amp;Peter</h3>
                <p className={styles['moment-home-info__p']}>
                    Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus
                    mus.
                </p>
                <ButtonWrap>
                    <Button ico="play" label="Relive" />
                </ButtonWrap>
            </div>
        </div>
    );
};
