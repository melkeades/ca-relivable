import { useState } from 'react';
import styles from './App.module.scss';
import Classnames from 'classnames';
import { Header } from './components/header/header';
import { MomentHomeInfo } from './components/moment-home-info/moment-home-info';
import { Moment } from './components/moment/moment';
import { Footer } from './components/footer/footer';
import { Home } from './components/home/home';
import { signal, effect, computed } from '@preact/signals-react';
import { mediaDb, metaDb } from './db';
import { MomentList } from './components/moment-list/moment-list';
import { Gallery } from './components/gallery/gallery';
import { MomentOpen } from './components/moment-open/moment-open';

export const allMoments = Object.keys(mediaDb);
export let favoriteMoments: any[] = [];

allMoments.forEach((moment) => {
    favoriteMoments.push(Object.values(mediaDb[moment]).filter((item) => item.favorite === true));
});

favoriteMoments.forEach((moments, index) => {
    moments.forEach((moment: any) => {
        moment.moment = allMoments[index];
        delete moment.favorite;
    });
});
favoriteMoments = favoriteMoments.flat();
console.log(favoriteMoments);

export const screenS = signal('home');
export const momentS = signal('favorites');
// export const momentS = signal('favorites');
// export const favoriteS = computed(() => {
//     return screenS.value !== 'gallery' && screenS.value !== 'galleryList';
// });

export const typeS = signal('');
export const pathS = signal('');
export const muteS = signal(true);
export const photoIndexS = signal(0);

effect(() => {
    console.log(momentS.value);
});

function App() {
    return (
        <div className={Classnames(styles.App, styles.root)}>
            <Header names={metaDb.names} />
            <Home />
            <Gallery />

            <MomentList />
            <MomentOpen photoIndex={photoIndexS.value} />
        </div>
    );
}

export default App;
