import { createBoard } from '@wixc3/react-board';
import { GalleryListOpen } from '../../../components/gallery-list-open/gallery-list-open';

export default createBoard({
    name: 'GalleryListOpen',
    Board: () => <GalleryListOpen />,
    isSnippet: true,
    environmentProps: {
        windowHeight: 654
    }
});
