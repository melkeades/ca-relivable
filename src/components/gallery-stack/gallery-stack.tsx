import classNames from 'classnames';
import styles from './gallery-stack.module.scss';
import { screenS } from '../../App';
import { allMoments } from '../../App';
import { mediaDb } from '../../db';

export interface GalleryStackProps {
    className?: string;
    stackName: string;
    handle?: React.MouseEventHandler;
    style?: object;
}

export const GalleryStack = ({ className, stackName, handle, style }: GalleryStackProps) => {
    let momentImages: any[] = [];

    // momentImages.push(
    //     mediaDb[stackName]?.filter((item) => {
    //         return item.thumb || item.src;
    //     })
    // );
    mediaDb[stackName]?.forEach((e) => {
        // console.log(e);

        // if (Object.keys(e).length > 0)
        const item = e.thumb === '' ? e.src : e.thumb;
        momentImages.push(item);
    });
    // console.log(momentImages);

    return (
        <div className={classNames(styles.root, className)} onClick={handle} style={style}>
            <div
                className={styles['gallery-stack__thumbs']}
                onClick={() => {
                    // screenS.value = 'galleryList';
                }}
            >
                <svg className="mask-svg">
                    <clipPath id="mask1" clipPathUnits="objectBoundingBox">
                        <path d="M0.968,0.001 L0.02,0.037 C0.01,0.038,0.001,0.05,0.002,0.065 L0.018,0.975 C0.018,0.99,0.027,1,0.037,1 L0.985,0.965 C0.996,0.965,1,0.952,1,0.937 L0.987,0.027 C0.987,0.012,0.978,0,0.968,0.001"></path>
                    </clipPath>
                    <clipPath id="mask2" clipPathUnits="objectBoundingBox">
                        <path d="M0.012,0.027 C0.012,0.012,0.021,0,0.031,0 L0.982,0.026 C0.992,0.027,1,0.039,1,0.055 L0.988,0.973 C0.988,0.988,0.979,1,0.969,1 L0.018,0.974 C0.008,0.973,0,0.961,0,0.945 L0.012,0.027"></path>
                    </clipPath>
                    <clipPath id="mask3" clipPathUnits="objectBoundingBox">
                        <path d="M0,0.028 C0,0.013,0.009,0,0.019,0 H0.981 C0.991,0,1,0.013,1,0.028 V0.972 C1,0.987,0.991,1,0.981,1 H0.019 C0.009,1,0,0.987,0,0.972 V0.028"></path>
                    </clipPath>
                </svg>
                <div className={styles['gallery-stack__img-wrap']}>
                    <img
                        src={`../360/${momentImages[0]}`}
                        alt=""
                        draggable="false"
                        className={classNames(
                            styles['gallery-stack__img'],
                            styles['gallery-stack__img-1']
                        )}
                    />
                </div>
                <div className={styles['gallery-stack__img-wrap']}>
                    <img
                        src={`../360/${momentImages[1]}`}
                        alt=""
                        className={classNames(
                            styles['gallery-stack__img'],
                            styles['gallery-stack__img-2']
                        )}
                    />
                </div>
                <div className={styles['gallery-stack__img-wrap']}>
                    <img
                        src={`../360/${momentImages[2]}`}
                        alt=""
                        className={classNames(
                            styles['gallery-stack__img'],
                            styles['gallery-stack__img-3']
                        )}
                    />
                </div>
            </div>
            <div className={styles['gallery-stack__title']}>{stackName}</div>
        </div>
    );
};
