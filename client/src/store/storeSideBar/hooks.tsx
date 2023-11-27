import { useContext } from 'react';
import ContextSidebar from './Context';
export const useContextSidebar = () => {
    const { state, dispatch } = useContext(ContextSidebar);
    return { state, dispatch };
};
