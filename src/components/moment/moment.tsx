import classNames from 'classnames';
import styles from './moment.module.scss';
// @ts-ignore
import Xrj from '../xrjs/Xrj';
import { screenS } from '../../App';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import useScreen from '../../services/use-screen-gsap';

export interface MomentProps {
    className?: string;
    photoIndex?: number;
}

export const Moment = ({ className, photoIndex = 2 }: MomentProps) => {
    const contRef = useRef<HTMLDivElement>(null);
    // useScreen(contRef, ['momentOpen']);
    return (
        <div className={classNames(styles.root, className, styles.moment)} ref={contRef}>
            {/* <img src={`/img/img_${photoIndex}.webp`} alt="" className={styles.moment__img} /> */}
            <Xrj photoIndex={photoIndex} />
        </div>
    );
};
