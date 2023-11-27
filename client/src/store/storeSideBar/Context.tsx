import { createContext } from 'react';
import { StateSideBar, PayloadAction } from './type';
import { initState } from './reducer';

interface Props {
    state: StateSideBar;
    dispatch: React.Dispatch<PayloadAction>;
}

const ContextSidebar = createContext<Props>({
    state: initState,
    dispatch: () => {},
});

export default ContextSidebar;
