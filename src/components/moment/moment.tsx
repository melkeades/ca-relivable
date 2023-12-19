import classNames from 'classnames';
import styles from './moment.module.scss';
// @ts-ignore
import Xrj from '../xrjs/Xrj';
import { screenS, momentS, photoIndexS } from '../../App';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import useScreen from '../../services/use-screen-gsap';

export interface MomentProps {
    className?: string;
    photoIndex?: number;
    moment?: string;
}

export const Moment = ({ className, photoIndex, moment }: MomentProps) => {
    const contRef = useRef<HTMLDivElement>(null);
    // useScreen(contRef, ['momentOpen']);
    // console.log(moment);

    return (
        <div className={classNames(styles.root, className, styles.moment)} ref={contRef}>
            {/* <img src={`/img/img_${photoIndex}.webp`} alt="" className={styles.moment__img} /> */}
            <Xrj index={photoIndex} moment={moment} />
        </div>
    );
};
