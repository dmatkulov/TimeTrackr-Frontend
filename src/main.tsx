import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';
import { addInterceptors } from './utils/axiosApi';
import { router } from './router/Router';
import './index.css';
import React from 'react';
addInterceptors(store);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
