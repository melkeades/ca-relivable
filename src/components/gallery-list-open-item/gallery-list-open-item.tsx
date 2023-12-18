import classNames from 'classnames';
import styles from './gallery-list-open-item.module.scss';
import { MetaIsVideo360 } from '../meta-is-video-360/meta-is-video-360';

export interface GalleryListOpenItemProps {
    className?: string;
    photoIndex: number;
    index: number;
}

export const GalleryListOpenItem = ({
    className,
    index = 0,
    photoIndex,
}: GalleryListOpenItemProps) => {
    const maskClass = ['item-tl', 'item-tm', 'item-tr', 'item-bl', 'item-bm', 'item-br'];

    const title = 'title';
    // console.log(className);

    return (
        <div className={classNames(styles.root)}>
            <svg className="mask-svg">
                <clipPath id="maskTopLeft" clipPathUnits="objectBoundingBox">
                    <path d="M0.984,1 C0.993,1,1,0.993,1,0.981 V0.105 C1,0.094,0.993,0.085,0.984,0.084 C0.595,0.064,0.251,0.031,0.018,0.002 C0.008,0.001,0,0.011,0,0.023 V0.963 C0,0.971,0.003,0.977,0.009,0.979 C0.077,0.997,0.474,1,0.984,1"></path>
                </clipPath>
                <clipPath id="maskTopMiddle" clipPathUnits="objectBoundingBox">
                    <path d="M1,0.038 C1,0.025,0.993,0.015,0.983,0.015 C0.657,0.024,0.325,0.017,0.017,0 C0.008,0,0,0.01,0,0.023 V0.978 C0,0.99,0.007,1,0.016,1 C0.319,0.999,0.656,0.996,0.984,0.991 C0.993,0.991,1,0.981,1,0.968 V0.038"></path>
                </clipPath>
                <clipPath id="maskTopRight" clipPathUnits="objectBoundingBox">
                    <path d="M0,0.119 C0,0.107,0.007,0.098,0.016,0.098 C0.359,0.086,0.693,0.057,0.981,0.001 C0.991,-0.001,1,0.009,1,0.021 V0.963 C1,0.974,0.993,0.984,0.984,0.984 C0.714,0.989,0.373,0.995,0.016,1 C0.007,1,0,0.991,0,0.98 V0.119"></path>
                </clipPath>
                <clipPath id="maskBottomLeft" clipPathUnits="objectBoundingBox">
                    <path d="M0.984,0 C0.993,0,1,0.009,1,0.021 V0.897 C1,0.908,0.993,0.917,0.984,0.918 C0.595,0.938,0.251,0.971,0.018,1 C0.008,1,0,0.992,0,0.979 V0.039 C0,0.032,0.003,0.025,0.009,0.024 C0.077,0.005,0.474,-0.001,0.984,0"></path>
                </clipPath>
                <clipPath id="maskBottomMiddle" clipPathUnits="objectBoundingBox">
                    <path d="M1,0.963 C1,0.975,0.993,0.986,0.983,0.985 C0.657,0.976,0.325,0.984,0.017,1 C0.008,1,0,0.99,0,0.977 V0.023 C0,0.01,0.007,0,0.016,0 C0.319,0.001,0.656,0.005,0.984,0.01 C0.993,0.01,1,0.02,1,0.032 V0.963"></path>
                </clipPath>
                <clipPath id="maskBottomRight" clipPathUnits="objectBoundingBox">
                    <path d="M0,0.882 C0,0.893,0.007,0.903,0.016,0.903 C0.359,0.915,0.693,0.944,0.981,1 C0.991,1,1,0.992,1,0.979 V0.038 C1,0.026,0.993,0.017,0.984,0.017 C0.714,0.011,0.373,0.005,0.016,0 C0.007,0,0,0.009,0,0.021 V0.882"></path>
                </clipPath>
            </svg>

            <div className={classNames(styles['item-wrap'], styles[maskClass[index]])}>
                <div className={styles['item-dim']}>
                    <MetaIsVideo360 is360={true} isVideo={true} className={styles.meta} />
                </div>
                <div className={styles.title}>{title}</div>
                <img src="../img/img_01.webp" alt="" className={styles.item} />
            </div>
        </div>
    );
};
