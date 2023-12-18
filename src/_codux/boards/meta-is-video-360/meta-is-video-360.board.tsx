import { createBoard } from '@wixc3/react-board';
import { MetaIsVideo360 } from '../../../components/meta-is-video-360/meta-is-video-360';

export default createBoard({
    name: 'MetaIsVideo360',
    Board: () => <MetaIsVideo360 />,
    isSnippet: true,
    environmentProps: {
        windowBackgroundColor: '#797979'
    }
});
