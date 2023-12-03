import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import StyleGlobal from '~/components/StyleGlobal';
import { ProviderSideBar } from '~/store/storeSideBar';
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <ProviderSideBar>
            <Provider store={store}>
                <StyleGlobal>
                    <App />
                </StyleGlobal>
            </Provider>
        </ProviderSideBar>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
