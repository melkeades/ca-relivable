import { createBoard } from '@wixc3/react-board';
import { GalleryListOpenTabs } from '../../../components/gallery-list-open-tabs/gallery-list-open-tabs';

export default createBoard({
    name: 'GalleryListOpenTabs',
    Board: () => <GalleryListOpenTabs />,
    isSnippet: true,
});
