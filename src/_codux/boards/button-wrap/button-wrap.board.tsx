import { createBoard } from '@wixc3/react-board';
import { ButtonWrap } from '../../../components/button-wrap/button-wrap';

export default createBoard({
    name: 'ButtonWrap',
    Board: () => <ButtonWrap />,
    isSnippet: true,
    environmentProps: {
        canvasWidth: 158
    }
});
