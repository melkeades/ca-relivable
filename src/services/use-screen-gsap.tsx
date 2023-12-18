import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { screenS } from '../App';
export default function useScreen(ref: React.RefObject<HTMLElement>, screen: string[]) {
    return useGSAP(
        () => {
            const active = screen.some((el) => {
                return screenS.value === el;
            });
            gsap.fromTo(
                ref.current,
                { opacity: active ? 0 : 1 },
                {
                    opacity: active ? 1 : 0,
                    onStart() {
                        if (active) {
                            console.log('out');
                            ref.current?.classList.remove('off');
                            ref.current?.classList.remove('out');
                        } else {
                            ref.current?.classList.add('out');
                        }
                    },
                    onComplete() {
                        if (!active) {
                            console.log('off');
                            ref.current?.classList.add('off');
                        } else {
                        }
                    },
                    // onStartParams: [active],
                }
            );
        },
        { dependencies: [screenS.value], scope: ref }
    );
}
