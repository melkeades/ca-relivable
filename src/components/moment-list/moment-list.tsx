import classNames from 'classnames';
import styles from './moment-list.module.scss';
import { useRef, useLayoutEffect, useEffect, createRef, RefObject } from 'react';
import gsap from 'gsap';
import Flip from 'gsap/Flip';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from '@studio-freight/lenis';
import { Moment } from '../moment/moment';
import { MomentListInfo } from '../moment-list-info/moment-list-info';
import { Bg } from '../bg/bg';
import { mediaDb, metaDb } from '../../db';
import { screenS, favoriteMoments, momentS, allMoments, photoIndexS } from '../../App';
import { effect } from '@preact/signals-react';
import useScreen from '../../services/use-screen-gsap';

// Object.keys(mediaDb)[0];

gsap.registerPlugin(ScrollTrigger, Flip);

export interface MomentListProps {
    className?: string;
}

export const MomentList = ({ className }: MomentListProps) => {
    // momentS.value = allMoments[0];
    const lenis = useRef<Lenis | null>(null);
    // const contRef = createRef<HTMLDivElement>();
    const contRef = useRef<HTMLDivElement>(null);
    const momentRef = useRef<HTMLDivElement>(null);
    const bgImgRef = useRef<HTMLImageElement>(null);
    const stTl = useRef<GSAPTween>();

    useScreen(contRef, ['moments']);

    useEffect(() => {
        lenis.current = new Lenis();
        const update = (time: number) => lenis.current?.raf(time * 1000);
        lenis.current?.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => update(time));
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(update);
        };
    }, []);

    useGSAP(
        () => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: contRef.current,
                    start: 'top top',
                    end: 'bottom bottom',
                    // markers: true,
                    scrub: true,
                },
            }).to(bgImgRef.current, {
                y: '-60vh',
                ease: 'none',
            });
        },
        { scope: contRef }
    );
    useEffect(() => {
        // after the height of the div is updated
        ScrollTrigger.refresh();
    }, [contRef]);

    const { contextSafe } = useGSAP({ scope: contRef });
    const handleMoment = (index: number) => {
        const state = Flip.getState('#m0');
        document.querySelector('#m0')?.classList.add('moment-open');
        screenS.value = 'momentOpen';
        photoIndexS.value = index;
        Flip.from(state, {
            targets: '.moment-open',
            duration: 1,

            onComplete() {
                document.querySelector('#m0')?.classList.remove('moment-open');
            },
        });
        // gsap.to('#m0 canvas', { width: '100vw', height: '100vh', duration: 0.5 });
    };

    return (
        <div
            className={classNames(
                styles.root,
                className,
                styles['moment-list']
                // 'default',
                // screenS.value === 'moments' && 'active'
            )}
            ref={contRef}
        >
            <div className={styles['moment-list__list']}>
                {favoriteMoments.map((moment, index) => {
                    // console.log(moment, index);

                    return (
                        <div
                            key={index}
                            className={styles['moment-list__moment-wrap']}
                            id={'m' + index}
                            ref={momentRef}
                            onClick={() => handleMoment(index)}
                        >
                            <div className={styles['moment-list__dim']}></div>
                            <div
                                className={classNames(
                                    styles['moment-list__info-wrap'],
                                    'thumbMask3'
                                )}
                            >
                                <MomentListInfo
                                    key={index}
                                    moment={moment.moment}
                                    description={moment.description}
                                    index={index + 1}
                                    // photoIndex={'0' + (index + 1)}
                                />
                            </div>
                            <Moment
                                photoIndex={index}
                                moment="favorites"
                                className="list__moment"
                            />
                        </div>
                    );
                })}
            </div>
            {/* <Bg contRef={contRef} /> */}
            <div className={classNames(styles['moment-list__bg-wrap'])}>
                <img
                    src="../img/bg.webp"
                    alt=""
                    className={styles['moment-list__bg-img']}
                    ref={bgImgRef}
                />
            </div>
        </div>
    );
};
