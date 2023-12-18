import { createBoard } from '@wixc3/react-board';
import { Bg } from '../../../components/bg/bg';

export default createBoard({
    name: 'Bg',
    Board: () => <Bg />,
    isSnippet: true,
});
