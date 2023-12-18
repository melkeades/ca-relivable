import { createBoard } from '@wixc3/react-board';
import { GalleryStack } from '../../../components/gallery-stack/gallery-stack';

export default createBoard({
    name: 'GalleryStack',
    Board: () => <GalleryStack />,
    isSnippet: true,
});
