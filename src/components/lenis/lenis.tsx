import classNames from 'classnames';
import styles from './lenis.module.scss';

export interface LenisProps {
    className?: string;
}

export const Lenis = ({ className }: LenisProps) => {
    return <div className={classNames(styles.root, className)}>Lenis</div>;
};
