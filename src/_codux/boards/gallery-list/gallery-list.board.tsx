import { createBoard } from '@wixc3/react-board';
import { GalleryList } from '../../../components/gallery-list/gallery-list';

export default createBoard({
    name: 'GalleryList',
    Board: () => <GalleryList />,
    isSnippet: true,
    environmentProps: {
        windowWidth: 682
    }
});
