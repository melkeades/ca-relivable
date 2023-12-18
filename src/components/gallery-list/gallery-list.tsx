import classNames from 'classnames';
import styles from './gallery-list.module.scss';
import { GalleryStack } from '../gallery-stack/gallery-stack';
import useScreen from '../../services/use-screen-gsap';
import { screenS } from '../../App';
import { useRef } from 'react';
export interface GalleryListProps {
    className?: string;
}

export const GalleryList = ({ className }: GalleryListProps) => {
    const contRef = useRef<HTMLDivElement>(null);
    useScreen(contRef, ['gallery']);

    function handle() {
        screenS.value = 'galleryList';
    }
    return (
        <div className={classNames(styles.root, className)} ref={contRef}>
            <h4 className={classNames('h4', styles['gallery-list__title'])}>Explore</h4>
            <div className={styles['gallery-list__list']}>
                {[...Array(4)].map((stack, index) => (
                    <GalleryStack key={index} stackName={'index'} handle={handle} />
                ))}
            </div>
        </div>
    );
};
