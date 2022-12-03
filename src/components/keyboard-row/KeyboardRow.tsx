import { useAppSelector } from '../../hooks/storeHooks';
import { selectKeyColor } from '../../store/selectors/keyboardSelector';

interface KeyBoardRowProps {
    content: string;
    isLastRow?: boolean;
}
// TODO: keyboard click

export const KeyBoardRow = ({
    content,
    isLastRow = false,
}: KeyBoardRowProps) => {
    const keyColor = useAppSelector(selectKeyColor);
    console.log('isLastRow', isLastRow);

    return (
        <div className="keyboard-row">
            {isLastRow ? (
                <button key="enter" className="keyboard-button">
                    enter
                </button>
            ) : null}
            {content.split('').map((letter) => {
                const color = keyColor[letter] ? keyColor[letter] : '';

                return (
                    <button key={letter} className={`keyboard-button ${color}`}>
                        {letter}
                    </button>
                );
            })}
            {isLastRow ? (
                <button key="backspace" className="keyboard-button">
                    backspace
                </button>
            ) : null}
        </div>
    );
};
