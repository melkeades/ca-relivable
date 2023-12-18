import classNames from 'classnames';
import styles from './moment-home-info.module.scss';
import { ButtonWrap } from '../button-wrap/button-wrap';
import { Button } from '../button/button';
import { screenS } from '../../App';

export interface MomentHomeInfoProps {
    className?: string;
}

export const MomentHomeInfo = ({ className }: MomentHomeInfoProps) => {
    function handleRelive() {
        screenS.value = 'moments';
    }
    function handleExplore() {
        screenS.value = 'gallery';
    }
    return (
        <div className={styles['moment-home-info-wrap']}>
            <div className="info">
                <h1 className={styles.h1}>
                    Casey
                    <br />
                    &amp;Peter
                </h1>
                <p className={styles['moment-home-info__p']}>
                    Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus
                    mus.
                </p>
                <div className={styles['button-wrap-home']}>
                    <ButtonWrap>
                        <Button ico="play" label="Relive" handle={handleRelive} />
                        <Button
                            label="Explore"
                            className="button--outline"
                            ico={'folder'}
                            handle={handleExplore}
                        />
                    </ButtonWrap>
                </div>
            </div>
        </div>
    );
};
