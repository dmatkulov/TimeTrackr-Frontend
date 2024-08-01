import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { addInterceptors } from './services/axios.service';
import './index.css';
import React from 'react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from './helpers/constants';
import { ConfigProvider } from 'antd';

addInterceptors(store);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#3947ce',
          colorBgContainer: '#fff',
          colorText: '#172c3f',
        },
        components: {
          Menu: {
            collapsedWidth: 1000,
            subMenuItemBg: '#fff',
            itemActiveBg: '#FFF8E8',
            itemSelectedBg: '#FFF8E8',
            itemHoverBg: '#FFF8E8',
          },
        },
      }}
    >
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </GoogleOAuthProvider>
    </ConfigProvider>
  </React.StrictMode>,
);
