import { combineReducers, configureStore } from '@reduxjs/toolkit';
import BuilderReducer from './builder-slice';
import AppReducer from './app.slice';

const rootReducer = combineReducers({
  builder: BuilderReducer,
  app: AppReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
