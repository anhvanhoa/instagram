import { useReducer } from 'react';
import ContextSidebar from './Context';
import reducer, { initState } from './reducer';
import { PropsProvider } from './type';

const Provider = ({ children }: PropsProvider) => {
    const [state, dispatch] = useReducer(reducer, initState);
    return <ContextSidebar.Provider value={{ state, dispatch }}>{children}</ContextSidebar.Provider>;
};

export default Provider;
