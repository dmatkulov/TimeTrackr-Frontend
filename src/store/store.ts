import {
  combineReducers,
  configureStore,
  UnknownAction,
} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { api } from './index';
import { AuthReducer } from './services/auth/authSlice';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
// import { positionsReducer } from './utils/positions/positionsSlice';

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  blacklist: ['api'],
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: AuthReducer,
});

const persistedReducer = persistReducer<any, UnknownAction>(
  persistConfig,
  rootReducer,
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [REGISTER, PERSIST, PURGE],
      },
    }).concat(api.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
