import classNames from 'classnames';
import styles from './moment-open.module.scss';
// @ts-ignore
import Xrj from '../xrjs/Xrj';
import { screenS } from '../../App';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import useScreen from '../../services/use-screen-gsap';

export interface MomentOpenProps {
    className?: string;
    photoIndex?: number;
}

export const MomentOpen = ({ className, photoIndex = 2 }: MomentOpenProps) => {
    const contRef = useRef<HTMLDivElement>(null);
    useScreen(contRef, ['momentOpen']);
    return (
        <div className={classNames(styles.root, className, styles.moment)} ref={contRef}>
            <Xrj photoIndex={photoIndex} />
        </div>
    );
};
