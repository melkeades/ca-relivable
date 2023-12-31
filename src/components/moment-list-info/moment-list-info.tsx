import classNames from 'classnames';
import styles from './moment-list-info.module.scss';
import { ButtonWrap } from '../button-wrap/button-wrap';
import { Button } from '../button/button';

export interface MomentListInfoProps {
    className?: string;
    // photoIndex: string;
    moment: string;
    description: string;
    index?: number;
}

export const MomentListInfo = ({
    className,
    moment,
    description,
    index = 0,
}: MomentListInfoProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <div className="info">
                <h2 className={styles.h2}>{index}.</h2>
                <h3 className={styles.h3}>{moment}</h3>
                <p className={styles['moment-home-info__p']}>{description}</p>
                <ButtonWrap>
                    <Button ico="play" label="Relive" />
                </ButtonWrap>
            </div>
        </div>
    );
};
