import classNames from 'classnames';
import styles from './gallery-list-open.module.scss';
import { GalleryListOpenItem } from '../gallery-list-open-item/gallery-list-open-item';
import { GalleryListOpenTabs } from '../gallery-list-open-tabs/gallery-list-open-tabs';
import { GalleryListOpenBottomNav } from '../gallery-list-open-bottom-nav/gallery-list-open-bottom-nav';
import useScreen from '../../services/use-screen-gsap';
import { useRef } from 'react';
import { allMoments, momentS, screenS } from '../../App';
import { mediaDb } from '../../db';

export interface GalleryListOpenProps {
    className?: string;
}

export const GalleryListOpen = ({ className }: GalleryListOpenProps) => {
    const contRef = useRef(null);
    useScreen(contRef, ['galleryList']);
    function handleMoment() {
        screenS.value = 'momentOpen';
        momentS.value = allMoments[0];
    }
    return (
        <div className={styles.root} ref={contRef}>
            <div className={styles['gallery-list-open__top-nav']}>
                <div className={styles['top-nav__btn']}>
                    <img
                        className={styles['top-nav__btn-svg']}
                        src={'../img/ico_dots.svg'}
                        alt=""
                    />
                </div>
                <div
                    className={styles['top-nav__btn']}
                    onClick={() => {
                        screenS.value = 'gallery';
                    }}
                >
                    <img
                        className={styles['top-nav__btn-svg']}
                        src={'../img/ico_close.svg'}
                        alt=""
                    />
                </div>
            </div>
            <div className={styles.gallery__window}>
                <h4 className={classNames('h4', styles['gallery-list-open__title'])}>
                    {momentS.value}
                </h4>
                <GalleryListOpenTabs />
            </div>
            <div className={styles['gallery-list-open__list']}>
                {mediaDb[momentS.value]?.map((item, index) => (
                    <GalleryListOpenItem
                        key={index}
                        index={index}
                        photoIndex={index}
                        handle={handleMoment}
                        item={item}
                    />
                ))}
            </div>
            <div className={styles['gallery-list-open__bullet-wrap']}>
                <div
                    className={classNames(
                        styles['gallery-list-open__bullet'],
                        styles['gallery-list-open__bullet--active']
                    )}
                ></div>
                <div className={styles['gallery-list-open__bullet']}></div>
                <div className={styles['gallery-list-open__bullet']}></div>
                <div className={styles['gallery-list-open__bullet']}></div>
            </div>
        </div>
    );
};
