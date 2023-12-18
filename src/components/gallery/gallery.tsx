import classNames from 'classnames';
import styles from './gallery.module.scss';
import { useRef } from 'react';
import { GalleryStack } from '../gallery-stack/gallery-stack';
import { GalleryList } from '../gallery-list/gallery-list';
import { GalleryListOpen } from '../gallery-list-open/gallery-list-open';
import { GalleryListOpenBottomNav } from '../gallery-list-open-bottom-nav/gallery-list-open-bottom-nav';
import useScreen from '../../services/use-screen-gsap';

export interface GalleryProps {
    className?: string;
}

export const Gallery = ({ className }: GalleryProps) => {
    const contRef = useRef<HTMLDivElement>(null);
    useScreen(contRef, ['gallery', 'galleryList']);
    return (
        <div className={classNames(styles.root, className, styles.gallery)} ref={contRef}>
            <div className={styles.gallery__window}>
                <GalleryList />
                <GalleryListOpen />
            </div>
            <div className="bg-wrap">
                <img src="../img/bg.webp" alt="" className={styles['gallery__bg-img']} />
            </div>
            <GalleryListOpenBottomNav />
        </div>
    );
};
