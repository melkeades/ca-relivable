import { createBoard } from '@wixc3/react-board';
import { MomentHomeInfo } from '../../../components/moment-home-info/moment-home-info';

export default createBoard({
    name: 'MomentHomeInfo',
    Board: () => <MomentHomeInfo />,
    isSnippet: true,
    environmentProps: {
        windowBackgroundColor: '#797979',
    },
});
