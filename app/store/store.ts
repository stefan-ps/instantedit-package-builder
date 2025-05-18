import { combineReducers, configureStore } from '@reduxjs/toolkit';
import BuilderReducer from './builder-slice';
import AppReducer from './app.slice';
import {
  persistReducer,
  persistStore,
  type PersistConfig,
} from 'redux-persist';
import localStorage from 'redux-persist/lib/storage';


const isServer = typeof window === 'undefined';

function createNoopStorage() {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: string) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
}

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage: isServer ? createNoopStorage() : localStorage,
};

const rootReducer = combineReducers({
  builder: BuilderReducer,
  app: AppReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
