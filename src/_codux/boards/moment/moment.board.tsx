import { createBoard } from '@wixc3/react-board';
import { Moment } from '../../../components/moment/moment';

export default createBoard({
    name: 'Moment',
    Board: () => <Moment />,
    isSnippet: true,
});
