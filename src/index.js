import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import  router  from '../src/router/index';
import { Provider } from 'react-redux';
import store from "../src/store";
import './index.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   
       <Provider store={store}>
          <RouterProvider router={router}>
         
    </RouterProvider> 
    
       </Provider>
    
 
);

 