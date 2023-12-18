import { createBoard } from '@wixc3/react-board';
import { GalleryListOpenItem } from '../../../components/gallery-list-open-item/gallery-list-open-item';

export default createBoard({
    name: 'GalleryListOpenItem',
    Board: () => <GalleryListOpenItem index={0} photoIndex={1} />,
    isSnippet: true,
});
