import { createBoard } from '@wixc3/react-board';
import { GalleryListOpenBottomNav } from '../../../components/gallery-list-open-bottom-nav/gallery-list-open-bottom-nav';

export default createBoard({
    name: 'GalleryListOpenBottomNav',
    Board: () => <GalleryListOpenBottomNav />,
    isSnippet: true,
});
