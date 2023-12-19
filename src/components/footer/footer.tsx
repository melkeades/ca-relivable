// @ts-nocheck
import classNames from 'classnames';
import styles from './footer.module.scss';
import { ButtonIcon } from '../button-icon/button-icon';
import { screenS, photoIndexS, muteS, momentS } from '../../App';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import useScreen from '../../services/use-screen-gsap';
// @ts-ignore
// import { mediaDb } from '../xrjs/Xrj';
import { mediaDb } from '../../db';
import { signal } from '@preact/signals-react';

export interface FooterProps {
    className?: string;
    db: any;
    index: number;
    // screen: string;
}
// export const Footer = ({ className, mediaDb, photoIndex, setPhotoIndex }: FooterProps) => {

export const Footer = forwardRef(function Footer(props, ref) {
    const { mediaDb, photoIndex, setPhotoIndex } = { ...props };
    const { pauseRef, muteRef } = ref;

    const [pauseIco, setPauseIco] = useState('pause');
    const [volumeIco, setVolumeIco] = useState('volume');

    const contRef = useRef<HTMLDivElement>(null);
    useScreen(contRef, ['momentOpen']);

    function handleGallery() {
        screenS.value = 'gallery';
    }
    function handleGalleryList() {
        screenS.value = 'galleryList';
    }

    function handlePause() {
        setPauseIco(pauseIco === 'pause' ? 'play' : 'pause');
    }
    function handleVolume() {
        setVolumeIco(volumeIco === 'volume' ? 'mute' : 'volume');
    }
    // function handlePrev() {
    //     const oldIndex = photoIndexS.value;
    //     const newIndex = oldIndex > 0 ? oldIndex - 1 : mediaDb[momentS.value].length - 1;
    //     photoIndexS.value = newIndex;
    // }
    // function handleNext() {
    //     const oldIndex = photoIndexS.value;
    //     const newIndex = oldIndex < mediaDb[momentS.value].length - 1 ? oldIndex + 1 : 0;
    //     photoIndexS.value = newIndex;
    // }
    function handlePrev() {
        // const oldIndex = photoIndexS.value;
        // const newIndex = oldIndex > 0 ? oldIndex - 1 : db.length - 1;
        // photoIndexS.value = newIndex;
        setPhotoIndex(photoIndex > 0 ? photoIndex - 1 : mediaDb.length - 1);
    }
    function handleNext() {
        // const oldIndex = photoIndexS.value;
        // const newIndex = oldIndex < db.length - 1 ? oldIndex + 1 : 0;
        // photoIndexS.value = newIndex;
        setPhotoIndex(photoIndex < mediaDb.length - 1 ? photoIndex + 1 : 0);
    }
    // function handleMute() {
    //     muteS.value = !muteS.value;
    //     // console.log(muteS.value);
    // }
    // const sel = (e: string) => document.querySelector(e);
    // const btnPrev$ = sel('#prev');
    // const btnNext$ = sel('#next');

    // const handlerPrev = useCallback((): void => {
    //     // console.log('qe');
    //     setPhotoIndex(photoIndex > 0 ? photoIndex - 1 : mediaDb.length - 1);
    // });
    // const handlerNext = useCallback(() => {
    //     setPhotoIndex(photoIndex < mediaDb.length - 1 ? photoIndex + 1 : 0);
    // });

    // useEffect(() => {
    //     btnPrev$.addEventListener('click', handlerPrev);
    //     return () => {
    //         btnPrev$.removeEventListener('click', handlerPrev);
    //     };
    // }, [handlerPrev, handlerNext]);

    // useEffect(() => {
    //     btnNext$?.addEventListener('click', handlerNext);
    //     return () => {
    //         btnNext$?.removeEventListener('click', handlerNext);
    //     };
    // }, [handlerNext, handlerPrev]);

    return (
        <div className={classNames(styles.root)} ref={contRef}>
            <div className={styles.footer}>
                <div className={styles.left}>
                    <ButtonIcon icon="gallery" handle={handleGallery} />
                    <ButtonIcon icon="folder" handle={handleGalleryList} />
                </div>
                <div className={styles.center}>
                    <ButtonIcon icon="prev" handle={handlePrev} id="prev" />
                    <div ref={pauseRef}>
                        <ButtonIcon icon={pauseIco} id="pause" handle={handlePause} />
                    </div>
                    <ButtonIcon icon="next" handle={handleNext} id="next" />
                </div>
                <div className={styles.right}>
                    <div ref={muteRef}>
                        <ButtonIcon icon={volumeIco} handle={handleVolume} id="volume" />
                    </div>
                </div>
            </div>
        </div>
    );
});
