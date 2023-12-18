import classNames from 'classnames';
import styles from './home.module.scss';
import { MomentHomeInfo } from '../moment-home-info/moment-home-info';
import { Moment } from '../moment/moment';
import MomentHomeInfo_module from '../moment-home-info/moment-home-info.module.scss';
import { effect } from '@preact/signals-react';
import { screenS } from '../../App';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import useScreen from '../../services/use-screen-gsap';

export interface HomeProps {
    className?: string;
}

export const Home = ({ className }: HomeProps) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const outro = (active: boolean) => {
        if (active) {
            console.log('out');
            rootRef.current?.classList.add('out');
        }
    };
    useScreen(rootRef, ['home']);
    // useGSAP(
    //     () => {
    //         const active = screenS.value === 'home';
    //         gsap.fromTo(
    //             rootRef.current,
    //             { opacity: active ? 0 : 1 },
    //             {
    //                 opacity: active ? 1 : 0,
    //                 onStart() {
    //                     if (active) {
    //                         console.log('out');
    //                         rootRef.current?.classList.remove('off');
    //                         rootRef.current?.classList.remove('out');
    //                     } else {
    //                         rootRef.current?.classList.add('out');
    //                     }
    //                 },
    //                 onComplete() {
    //                     if (!active) {
    //                         console.log('off');
    //                         rootRef.current?.classList.add('off');
    //                     } else {
    //                     }
    //                 },
    //                 // onStartParams: [active],
    //             }
    //         );
    //     },
    //     { dependencies: [screenS.value], scope: rootRef }
    // );
    // effect(() => {
    //     if (screenS.value === 'home') {
    //         useGSAP(
    //             () => {
    //                 gsap.to(rootRef.current, {
    //                     opacity: 1,
    //                 });
    //             },
    //             { scope: rootRef }
    //         );
    //     } else {
    //         useGSAP(
    //             () => {
    //                 gsap.to(rootRef.current, {
    //                     opacity: 0,
    //                 });
    //             },
    //             { scope: rootRef }
    //         );
    //     }
    // });
    return (
        <div
            className={classNames(
                styles.home,
                styles.root
                // 'default',
                // screenS.value === 'home' && 'active'
            )}
            ref={rootRef}
        >
            <MomentHomeInfo />
            <div className={styles['home-moment-wrap']}>
                <Moment />
            </div>
        </div>
    );
};
