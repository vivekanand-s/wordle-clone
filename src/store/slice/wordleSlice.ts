import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WordleState {
    history: string[];
    currentWord: string;
}

const initialState: WordleState = {
    history: [],
    currentWord: '',
};

export const wordleSlice = createSlice({
    name: 'wordle',
    initialState,
    reducers: {
        addWords: (state, action: PayloadAction<string>) => {
            state.history.push(action.payload);
        },
        setCurrentWord: (state, action: PayloadAction<string>) => {
            state.currentWord = action.payload;
        },
    },
});

export const { addWords, setCurrentWord } = wordleSlice.actions;
export default wordleSlice.reducer;
