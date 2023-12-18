import classNames from 'classnames';
import styles from './gallery-list-open-tabs.module.scss';

export interface GalleryListOpenTabsProps {
    className?: string;
}

export const GalleryListOpenTabs = ({ className }: GalleryListOpenTabsProps) => {
    return <div className={classNames(styles.root, className)}>
        <div className={styles.tabs}>
            <div className={classNames(styles.tabs__tab, styles['tabs__tab-active'])}>
                All Content</div>
            <div className={styles.tabs__tab}>Photos
                <img src="../img/ico_folder.svg" alt="" className={styles.tabs__ico} />
            </div>
            <div className={styles.tabs__tab}>Videos
                <img src="../img/ico_camera.svg" alt="" className={styles.tabs__ico} />
            </div>
        </div>

    </div>;
};
