import { RootState, store } from '../store';
import { addWords, setCurrentWord } from '../store/slice/wordleSlice';
import { setKeyColor } from '../store/slice/keyboardSlice';

export enum AllowedKeys {
    ENTER = 'enter',
    BACKSPACE = 'backspace',
}

export const handleKey = (currentKey: string) => {
    const currentWord = store.getState().wordle.currentWord;
    const newWord = currentWord + currentKey;

    if (currentKey === AllowedKeys.BACKSPACE) {
        store.dispatch(
            setCurrentWord(currentWord.slice(0, currentWord.length - 1))
        );
        return;
    }

    if (currentKey === AllowedKeys.ENTER && currentWord.length < 5) {
        // setAnimateRow(true);
        return;
    }

    if (currentKey === AllowedKeys.ENTER && currentWord.length === 5) {
        // TODO: show success
        store.dispatch(addWords(currentWord));
        store.dispatch(setKeyColor(currentWord));
        store.dispatch(setCurrentWord(''));
        return;
    }

    if (/[a-z]/i.test(currentKey) && newWord.length <= 5) {
        store.dispatch(setCurrentWord(newWord));
        return;
    }
};
