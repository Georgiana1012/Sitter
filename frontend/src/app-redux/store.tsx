import {
    combineReducers,
    configureStore,
    PreloadedState,
} from '@reduxjs/toolkit';
import {
    useSelector as rawUseSelector,
    TypedUseSelectorHook,
} from 'react-redux';

import { apiSlice } from './apiSlice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(apiSlice.middleware),
});

export const setupStoreForTests = (
    preloadedState?: PreloadedState<RootState>,
) => {
    return configureStore({
        reducer: {
            [apiSlice.reducerPath]: apiSlice.reducer,
        },
        preloadedState,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                immutableCheck: false,
                serializableCheck: false,
            }).concat(apiSlice.middleware),
    });
};

export const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
});

export type AppStore = ReturnType<typeof setupStoreForTests>;
export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
