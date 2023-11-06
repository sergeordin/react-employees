import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import auth from '../features/auth/authSlice';
import employees from '../features/Employees/employeesSlice';
import { api } from './services/api';
import { listenerMiddleware } from '../middleware/auth';
export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth,
        employees,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware).prepend(listenerMiddleware.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
