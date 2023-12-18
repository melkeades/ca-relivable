import { createBoard } from '@wixc3/react-board';
import { ButtonIcon } from '../../../components/button-icon/button-icon';

export default createBoard({
    name: 'ButtonIcon',
    Board: () => <ButtonIcon />,
    isSnippet: true,
});
