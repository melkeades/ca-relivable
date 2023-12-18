import classNames from 'classnames';
import styles from './moment.module.scss';
// @ts-ignore
import Xrj from '../xrjs/Xrj';
import { screenS } from '../../App';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

export interface MomentProps {
    className?: string;
    photoIndex?: string;
}

export const Moment = ({ className, photoIndex = '01' }: MomentProps) => {
    const contRef = useRef<HTMLDivElement>(null);

    return (
        <div className={classNames(styles.root, className, styles.moment)} ref={contRef}>
            {/* <img src={`/img/img_${photoIndex}.webp`} alt="" className={styles.moment__img} /> */}
            <Xrj />
        </div>
    );
};
