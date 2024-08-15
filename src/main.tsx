import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import React from 'react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from './helpers/constants';
import { ConfigProvider } from 'antd';

const primaryColor = '#3947CF';
const secondaryHoverColor = '#FFF8E8';
const defaultGreyColor = '#f5f5f5';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: primaryColor,
          colorBgContainer: '#fff',
          colorText: '#172c3f',
          boxShadow: 'none',
        },
        components: {
          Menu: {
            collapsedWidth: 1000,
            subMenuItemBg: 'white',
            itemActiveBg: secondaryHoverColor,
            itemHoverBg: secondaryHoverColor,
          },
          Button: {
            borderRadius: 8,
            defaultBg: defaultGreyColor,
            boxShadow: 'none',
            defaultBorderColor: 'none',
            defaultHoverBorderColor: 'none',
            defaultHoverBg: secondaryHoverColor,
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
