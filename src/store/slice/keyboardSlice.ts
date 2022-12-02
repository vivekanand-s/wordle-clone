import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getColorForLetter } from '../../color.util';

interface keyboardState {
    [letter: string]: string;
}
enum Colors {
    GREEN = 'green',
    YELLOW = 'yellow',
    GRAY = 'gray',
}

const initialState: keyboardState = {};

export const keyBoardSlice = createSlice({
    name: 'keyboard',
    initialState,
    reducers: {
        setKeyColor: (state, action: PayloadAction<string>) => {
            const word = action.payload;
            for (let index = 0; index < word.length; ++index) {
                const letter = word[index];
                const currentColor = state[letter];
                const newColor = getColorForLetter(letter, index);

                if (
                    currentColor === Colors.GREEN ||
                    newColor === Colors.GREEN
                ) {
                    state[letter] = Colors.GREEN;
                    continue;
                }

                if (
                    currentColor === Colors.YELLOW ||
                    newColor === Colors.YELLOW
                ) {
                    state[letter] = Colors.YELLOW;
                    continue;
                }

                state[letter] = Colors.GRAY;
            }
        },
    },
});

export const { setKeyColor } = keyBoardSlice.actions;
export default keyBoardSlice.reducer;
