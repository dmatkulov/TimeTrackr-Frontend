import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import React from 'react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from './common/constants';
import { ConfigProvider } from 'antd';

const primaryColor = '#3947CF';
const secondaryColor = '#7046ea';
const secondaryHoverColor = '#FFF8E8';
const defaultGreyColor = '#6C757D';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
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
                    colorLink: secondaryColor,
                    borderRadius: 8,
                    boxShadow: 'none',
                    defaultBg: 'none',
                    defaultBorderColor: '#aeaeae',
                    colorText: defaultGreyColor,
                    defaultColor: defaultGreyColor,
                    defaultHoverColor: '#545a60',
                    defaultHoverBorderColor: defaultGreyColor,
                    defaultHoverBg: 'none',
                    colorLinkHover: primaryColor,
                  },
                },
              }}
            >
              <App />
            </ConfigProvider>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
);
