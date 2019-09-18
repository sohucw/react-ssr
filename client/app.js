import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';
import {BrowserRouter} from 'react-router-dom';
// import {AppContainer} from 'react-hot-loader';
import App from './views/App';

import AppState from './store/app-state';
const inialState = window.__INITIAL_STATE__ || {};
const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
const root = document.getElementById('root');
const render = Component => {
    renderMethod(
            <Fragment>
                <Provider appState={ new AppState(inialState.appState)}>
                    <BrowserRouter>
                        <Component/>
                    </BrowserRouter>
                    
                </Provider>
            </Fragment>,
        root
    )
}

render(App);
if(module.hot) {
    module.hot.accept('./views/App.js', () => {
        const NextApp = requrie('./views/App.js').default;
        render(NextApp);
    });
}
