import classNames from 'classnames';
import styles from './moment-open.module.scss';
// @ts-ignore
import Xrj from '../xrjs/Xrj';
import { screenS, momentS, photoIndexS } from '../../App';
import { useGSAP } from '@gsap/react';
import { useRef, useState } from 'react';
import useScreen from '../../services/use-screen-gsap';
import { computed, effect } from '@preact/signals-react';

export interface MomentOpenProps {
    className?: string;
    photoIndex?: number;
    moment?: string;
}

export const MomentOpen = ({ className, photoIndex, moment = momentS.value }: MomentOpenProps) => {
    const contRef = useRef<HTMLDivElement>(null);
    useScreen(contRef, ['momentOpen']);
    console.log(photoIndex);

    return (
        <div className={classNames(styles.root, className, styles.moment)} ref={contRef}>
            <Xrj index={photoIndex} moment={moment} />
        </div>
    );
};
