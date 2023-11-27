import { useSelector } from 'react-redux';
import { routersPublic, routersPrivate } from '~/routes';
import Routers from '~/components/Routers';
import Loader from '~/components/Loader/Loader';
import { RootType } from './store';

function App() {
    const crToken = useSelector((state: RootType) => state.auth.user.accessToken);
    return (
        <div className="App">
            <Loader />
            {crToken ? <Routers data={routersPrivate} /> : <Routers data={routersPublic} />}
        </div>
    );
}

export default App;
