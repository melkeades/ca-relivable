import { createBoard } from '@wixc3/react-board';
import { Home } from '../../../components/home/home';

export default createBoard({
    name: 'Home',
    Board: () => <Home />,
    isSnippet: true,
    environmentProps: {
        canvasWidth: 'auto',
        windowWidth: 1666,
        windowHeight: 889
    }
});
