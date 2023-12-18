import classNames from 'classnames';
import styles from './gallery-list-open-bottom-nav.module.scss';
import { GalleryStack } from '../gallery-stack/gallery-stack';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import useScreen from '../../services/use-screen-gsap';

export interface GalleryListOpenBottomNavProps {
    className?: string;
}

interface MouseCoords {
    startX: number;
    startY: number;
    scrollLeft: number;
    scrollTop: number;
}

export const GalleryListOpenBottomNav = ({ className }: GalleryListOpenBottomNavProps) => {
    // const scrollRef = useHorizontalScroll();
    const contRef = useRef(null);
    useScreen(contRef, ['galleryList']);

    const scrollRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const arrowRef = useRef<HTMLImageElement>(null);
    const dimRef = useRef<HTMLImageElement>(null);
    const [open, setOpen] = useState(false);

    const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
    const mouseCoords = useRef<MouseCoords>({
        startX: 0,
        startY: 0,
        scrollLeft: 0,
        scrollTop: 0,
    });
    const [isScrolling, setIsScrolling] = useState<boolean>(false);

    const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!scrollRef.current) return;
        const slider = scrollRef.current as HTMLDivElement;
        const startX = e.pageX - slider.offsetLeft;
        const startY = e.pageY - slider.offsetTop;
        const scrollLeft = slider.scrollLeft;
        const scrollTop = slider.scrollTop;
        mouseCoords.current = { startX, startY, scrollLeft, scrollTop };
        setIsMouseDown(true);
        document.body.style.cursor = 'grabbing';
    };

    const handleDragEnd = () => {
        setIsMouseDown(false);
        if (!scrollRef.current) return;
        document.body.style.cursor = 'default';
    };

    const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isMouseDown || !scrollRef.current) return;
        e.preventDefault();
        const slider = scrollRef.current as HTMLDivElement;
        const x = e.pageX - slider.offsetLeft;
        const y = e.pageY - slider.offsetTop;
        const walkX = (x - mouseCoords.current.startX) * 1.5;
        const walkY = (y - mouseCoords.current.startY) * 1.5;
        slider.scrollLeft = mouseCoords.current.scrollLeft - walkX;
        slider.scrollTop = mouseCoords.current.scrollTop - walkY;
        // console.log(walkX, walkY);
    };

    const handleToggle = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (scrollRef.current) {
            const currentFr = scrollRef.current?.style.gridTemplateRows;
            if (currentFr === '0fr') {
                scrollRef.current!.style.gridTemplateRows = '1fr';
                arrowRef.current!.style.rotate = '179.9deg';
                dimRef.current!.classList.add(styles['nav-dim--active']);
            } else {
                scrollRef.current!.style.gridTemplateRows = '0fr';
                arrowRef.current!.style.rotate = '0deg';
                dimRef.current!.classList.remove(styles['nav-dim--active']);
            }
            // scrollRef.current.style.maxHeight = currentFr === '0px' ? '400px' : '0px'; // meh
            // scrollRef.current!.style.gridTemplateRows = currentFr === '0fr' ? '1fr' : '0fr'; //non-null assertion operator
        }
        // setOpen(!open);
        // console.log(open);
    };
    useEffect(() => {
        const el = scrollRef.current;

        if (el) {
            const onWheel = (e: WheelEvent) => {
                if (e.deltaY == 0) return;
                e.preventDefault();

                const scr = el.scrollTo({
                    left: el.scrollLeft + e.deltaY * 5,
                    behavior: 'smooth',
                });
            };
            el.addEventListener('wheel', onWheel);
            return () => el.removeEventListener('wheel', onWheel);
        }
    }, []);
    return (
        <div className={classNames(styles.root, className)} ref={contRef}>
            <div className={styles['nav-dim']} ref={dimRef} onClick={handleToggle} />
            <div className={styles['nav-wrap']} data-lenis-prevent="">
                <div className={styles['nav__title-wrap']} ref={titleRef} onClick={handleToggle}>
                    <h5 className={styles.nav__title}>Heading 5</h5>
                    <div className={styles.nav__arrow}>
                        <img src="../img/ico_arrow-up.svg" alt="" ref={arrowRef} />
                    </div>
                </div>
                <div
                    className={styles.nav__track}
                    ref={scrollRef}
                    onMouseDown={handleDragStart}
                    onMouseUp={handleDragEnd}
                    onMouseMove={handleDrag}
                    style={{ gridTemplateRows: '0fr' }}
                >
                    <div
                        draggable="true"
                        // dragConstraints={trackRef}
                        className={styles.nav__list}
                    >
                        {[...Array(9)].map((stack, index) => (
                            <GalleryStack
                                key={index}
                                stackName={'index'}
                                className="is--carousel"
                                style={{ alignItems: 'flex-start' }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// export function useHorizontalScroll() {
//     const elRef = useRef<any>();
//     useEffect(() => {
//         const el = elRef.current;
//         if (el) {
//             const onWheel = (e: WheelEvent) => {
//                 if (e.deltaY === 0) return;
//                 e.preventDefault();
//                 el.scrollTo({
//                     left: el.scrollLeft + e.deltaY * 3,
//                     // behavior: "smooth",
//                 });
//             };
//             el.addEventListener('wheel', onWheel);
//             return () => el.removeEventListener('wheel', onWheel);
//         }
//     }, []);
//     return elRef;
// }
