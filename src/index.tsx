import * as React from "react";
import {render} from "react-dom";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import 'typeface-roboto';

import {bukvarkoApp} from './reducers';
import {App} from './components/App';

const store = createStore(bukvarkoApp);

render(
    <Provider store={store}>
    <App/>
    </Provider>,
    document.getElementById("root"));
