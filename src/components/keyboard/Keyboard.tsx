import { KeyBoardRow } from '../keyboard-row/KeyboardRow';
import './Keyboard.css';

export const KeyBoard = () => {
    return (
        <section className="keyboard">
            <KeyBoardRow content="qwertyuiop" />
            <KeyBoardRow content="asdfghjkl" />
            <KeyBoardRow content="zxcvbnm" isLastRow={true} />
        </section>
    );
};
