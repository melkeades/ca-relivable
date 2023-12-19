import classNames from 'classnames';
import styles from './gallery-list.module.scss';
import { GalleryStack } from '../gallery-stack/gallery-stack';
import useScreen from '../../services/use-screen-gsap';
import { screenS, momentS } from '../../App';
import { useRef } from 'react';
import { allMoments } from '../../App';
export interface GalleryListProps {
    className?: string;
}

export const GalleryList = ({ className }: GalleryListProps) => {
    const contRef = useRef<HTMLDivElement>(null);
    useScreen(contRef, ['gallery']);

    function handle(moment: string) {
        screenS.value = 'galleryList';
        momentS.value = moment;
    }
    return (
        <div className={classNames(styles.root, className)} ref={contRef}>
            <h4 className={classNames('h4', styles['gallery-list__title'])}>Explore</h4>
            <div className={styles['gallery-list__list']}>
                {allMoments.map((moment, index) => (
                    <GalleryStack key={index} stackName={moment} handle={() => handle(moment)} />
                ))}
            </div>
        </div>
    );
};
