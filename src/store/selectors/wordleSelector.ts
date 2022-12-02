import { RootState } from '../index';

export const selectWordsHistory = (state: RootState) => state.wordle.history;

export const selectCurrentWord = (state: RootState) => state.wordle.currentWord;
