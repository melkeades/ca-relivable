import classNames from 'classnames';
import styles from './meta-is-video-360.module.scss';

export interface MetaIsVideo360Props {
    className?: string;
    isVideo: boolean;
    is360: boolean;
}

export const MetaIsVideo360 = ({ className, is360, isVideo }: MetaIsVideo360Props) => {
    return (
        <div className={classNames(styles.root, className)}>
            {is360 && <div className={styles['is--360']}>360°</div>}
            {isVideo && <img src="../img/ico_video.svg" alt="" className={styles['is--video']} />}
        </div>
    );
};
