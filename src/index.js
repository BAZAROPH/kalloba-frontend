import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import isLoginReducer from './reducers/login/isLoginReducer';
import dataReducer from './reducers/data/dataReducer'
import { HashRouter} from "react-router-dom";

const rootReducer = combineReducers({
    isLoginReducer,
    dataReducer

})
const Store = createStore(rootReducer);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
