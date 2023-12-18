import { useState } from 'react';
import styles from './App.module.scss';
import Classnames from 'classnames';
import { Header } from './components/header/header';
import { MomentHomeInfo } from './components/moment-home-info/moment-home-info';
import { Moment } from './components/moment/moment';

import { Footer } from './components/footer/footer';
import { Home } from './components/home/home';
import { signal, effect } from '@preact/signals-react';
import { mediaDb, metaDb } from './db';
import { MomentList } from './components/moment-list/moment-list';
import { Gallery } from './components/gallery/gallery';
import { MomentOpen } from './components/moment-open/moment-open';

// export const state = signal({ screen: 'home' });
// export const nameS = signal(metaDb.names);
// console.log(Object.keys(mediaDb)[0]);

export const screenS = signal('home');
export const typeS = signal('');
export const pathS = signal('');
export const muteS = signal(true);
export const photoIndexS = signal(2);
function getState() {
    // return 'asdfkj';
}

// export const state = signal({ screen: 'home' });

// effect(() => {
//     console.log(screenS.value);
// });
function App() {
    const [count, setCount] = useState(0);

    return (
        <div className={Classnames(styles.App, styles.root)}>
            <Header names={metaDb.names} />
            <Home />
            <Gallery />
            <Footer />
            <MomentList />
            <MomentOpen />
        </div>
    );
}

export default App;
