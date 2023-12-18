import classNames from 'classnames';
import styles from './footer.module.scss';
import { ButtonIcon } from '../button-icon/button-icon';
import { screenS, photoIndexS, muteS } from '../../App';
import { useRef } from 'react';
import useScreen from '../../services/use-screen-gsap';
// @ts-ignore
import { mediaDb } from '../xrjs/Xrj';
import { signal } from '@preact/signals-react';

export interface FooterProps {
    className?: string;
    // screen: string;
}

export const Footer = ({ className }: FooterProps) => {
    const contRef = useRef<HTMLDivElement>(null);
    useScreen(contRef, ['momentOpen']);

    function handleGallery() {
        screenS.value = 'gallery';
    }
    function handleGalleryList() {
        screenS.value = 'galleryList';
    }
    function handlePrev() {
        const oldIndex = photoIndexS.value;
        const newIndex = oldIndex > 0 ? oldIndex - 1 : mediaDb.length - 1;
        photoIndexS.value = newIndex;
    }
    function handleNext() {
        const oldIndex = photoIndexS.value;
        const newIndex = oldIndex < mediaDb.length - 1 ? oldIndex + 1 : 0;
        photoIndexS.value = newIndex;
    }
    function handleMute() {
        muteS.value = !muteS.value;
        // console.log(muteS.value);
    }

    return (
        <div className={classNames(styles.root)} ref={contRef}>
            <div className={styles.footer}>
                <div className={styles.left}>
                    <ButtonIcon icon="gallery" handle={handleGallery} />
                    <ButtonIcon icon="folder" handle={handleGalleryList} />
                </div>
                <div className={styles.center}>
                    <ButtonIcon icon="prev" handle={handlePrev} />
                    <ButtonIcon icon="pause" />
                    <ButtonIcon icon="next" handle={handleNext} />
                </div>
                <div className={styles.right}>
                    <ButtonIcon icon="volume" handle={handleMute} id="volume" />
                </div>
            </div>
        </div>
    );
};
