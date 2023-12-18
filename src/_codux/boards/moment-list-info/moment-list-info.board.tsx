import { createBoard } from '@wixc3/react-board';
import { MomentListInfo } from '../../../components/moment-list-info/moment-list-info';

export default createBoard({
    name: 'MomentListInfo',
    Board: () => <MomentListInfo />,
    isSnippet: true,
    environmentProps: {
        windowBackgroundColor: '#737373'
    }
});
