import { PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from './button-wrap.module.scss';
import { Button } from '../button/button';

type ButtonWrapProps = PropsWithChildren<{
    className?: string;
}>;

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const ButtonWrap = (props: ButtonWrapProps) => {
    return (
        <div className={classNames(styles.root, props.className)}>
            {/* <Button ico="play" label="name" className="button--outline" /> */}
            {props.children}
        </div>
    );
};
