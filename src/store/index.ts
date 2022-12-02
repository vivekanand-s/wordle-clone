import { configureStore } from '@reduxjs/toolkit';
import wordleReducer from './slice/wordleSlice';
import keyboardReducer from './slice/keyboardSlice';

export const store = configureStore({
    reducer: {
        wordle: wordleReducer,
        keyboard: keyboardReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
