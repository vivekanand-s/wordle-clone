import { useAppSelector } from '../../hooks/storeHooks';
import { selectKeyColor } from '../../store/selectors/keyboardSelector';
import { handleKey } from '../../utils/handleKey.util';

interface KeyBoardRowProps {
    content: string;
    isLastRow?: boolean;
}

export const KeyBoardRow = ({
    content,
    isLastRow = false,
}: KeyBoardRowProps) => {
    const keyColor = useAppSelector(selectKeyColor);

    return (
        <div className="keyboard-row">
            {isLastRow ? (
                <button
                    key="enter"
                    className="keyboard-button"
                    onClick={() => handleKey('enter')}
                >
                    enter
                </button>
            ) : null}

            {content.split('').map((letter) => {
                const color = keyColor[letter] ? keyColor[letter] : '';

                return (
                    <button
                        key={letter}
                        className={`keyboard-button ${color}`}
                        onClick={() => handleKey(letter)}
                    >
                        {letter}
                    </button>
                );
            })}

            {isLastRow ? (
                <button
                    key="backspace"
                    className="keyboard-button"
                    onClick={() => handleKey('backspace')}
                >
                    backspace
                </button>
            ) : null}
        </div>
    );
};
