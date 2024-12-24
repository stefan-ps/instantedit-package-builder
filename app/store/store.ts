import { configureStore } from '@reduxjs/toolkit';
import BuilderReducer from './builder-slice';
import ArrayBuilderReducer from './array-builder-slice';

export const store = configureStore({
  reducer: { builder: BuilderReducer, arrayBuilder: ArrayBuilderReducer },
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
