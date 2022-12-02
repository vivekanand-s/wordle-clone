import { useAppSelector } from '../../hooks/storeHooks';
import { selectKeyColor } from '../../store/selectors/keyboardSelector';
import './Keyboard.css';

// TODO: separate keyboard into row
const keyboardLayout = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

export const KeyBoard = () => {
    const keyColor = useAppSelector(selectKeyColor);

    return (
        <section className="keyboard">
            {keyboardLayout.map((keys, index) => {
                return (
                    <div className="keyboard-row" key={index}>
                        {keys.split('').map((key) => {
                            const color = keyColor[key] ? keyColor[key] : '';
                            return (
                                <button
                                    key={key}
                                    className={`keyboard-button ${color}`}
                                >
                                    {key}
                                </button>
                            );
                        })}
                    </div>
                );
            })}
        </section>
    );
};
