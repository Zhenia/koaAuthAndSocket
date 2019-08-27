import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from "react-redux";
import store from "./store/index";
import Context from './utils/context/app';
ReactDOM.render(
   <Provider store={store}>
      <Context>
         <App />
      </Context>
   </Provider>,
 document.getElementById('root'));