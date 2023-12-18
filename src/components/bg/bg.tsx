import classNames from 'classnames';
import styles from './bg.module.scss';
import { useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);
export interface BgProps {
    className?: string;
    contRef: React.RefObject<HTMLDivElement>;
}

export const Bg = ({ className, contRef }: BgProps) => {
    const lenis = useRef<Lenis | null>(null);
    const bgImgRef = useRef<HTMLImageElement>(null);
    // const stTl = useRef<GSAPTween>();

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
                    markers: true,
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
        console.log(contRef.current);
    }, [contRef]);

    return (
        <div className={classNames(styles.root, className, styles.bg)}>
            <img src="../img/bg.webp" alt="" className={styles['bg-img']} ref={bgImgRef} />
            <div />
        </div>
    );
};
