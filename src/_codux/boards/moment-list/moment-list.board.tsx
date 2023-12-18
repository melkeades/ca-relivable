import { createBoard } from '@wixc3/react-board';
import { MomentList } from '../../../components/moment-list/moment-list';

export default createBoard({
    name: 'MomentList',
    Board: () => <MomentList />,
    isSnippet: true,
    environmentProps: {
        windowHeight: 637,
        windowWidth: 1024
    }
});
