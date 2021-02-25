import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {HashRouter, Route} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store/store";
import {QueryParamProvider} from "use-query-params";

ReactDOM.render(
    <HashRouter>
        <Provider store={store}>
            <QueryParamProvider ReactRouterRoute={Route}>
                <App/>
            </QueryParamProvider>
        </Provider>
    </HashRouter>,
    document.getElementById('root')
);
serviceWorker.unregister();



