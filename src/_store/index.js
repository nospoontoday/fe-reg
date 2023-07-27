import { configureStore } from '@reduxjs/toolkit';

import { alertReducer } from './alert.slice';
import { usersReducer } from './users.slice';

export const store = configureStore({
    reducer: {
        alert: alertReducer,
        users: usersReducer
    },
});

export * from './alert.slice';
export * from './users.slice';