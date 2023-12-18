import { createBoard } from '@wixc3/react-board';
import App from '../../../App';

export default createBoard({
    name: 'App',
    Board: () => <App />,
    environmentProps: {
        windowBackgroundColor: '#232323',
        windowWidth: 1658,
        windowHeight: 1042
    }
});
