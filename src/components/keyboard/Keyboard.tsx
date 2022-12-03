import { KeyBoardRow } from '../keyboard-row/keyboardRow';
import './Keyboard.css';

// TODO: separate keyboard into row

export const KeyBoard = () => {
    return (
        <section className="keyboard">
            <KeyBoardRow content="qwertyuiop" />
            <KeyBoardRow content="asdfghjkl" />
            <KeyBoardRow content="zxcvbnm" isLastRow={true} />
        </section>
    );
};
