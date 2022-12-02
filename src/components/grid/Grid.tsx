import { useEffect, useState } from 'react';
import { getColorForLetter } from '../../color.util';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import {
    selectCurrentWord,
    selectWordsHistory,
} from '../../store/selectors/wordleSelector';
import { setKeyColor } from '../../store/slice/keyboardSlice';
import { addWords, setCurrentWord } from '../../store/slice/wordleSlice';
import './Grid.css';

const grid = Array(6).fill(Array(5).fill(''));
enum AllowedKeys {
    ENTER = 'enter',
    BACKSPACE = 'backspace',
}

// TODO: separate grid into smaller components
// TODO: local storage

export const Grid = () => {
    const [animateRow, setAnimateRow] = useState(false);
    const wordsHistory = useAppSelector(selectWordsHistory);
    const currentWord = useAppSelector(selectCurrentWord);
    const dispatch = useAppDispatch();

    useEffect(() => {
        window.addEventListener('keydown', keyPressHandler);

        return () => {
            window.removeEventListener('keydown', keyPressHandler);
        };
    }, [currentWord]);

    const keyPressHandler = (event: KeyboardEvent) => {
        const currentKey = event.key.toLowerCase();
        const newWord = currentWord + currentKey;

        if (currentKey === AllowedKeys.BACKSPACE) {
            dispatch(
                setCurrentWord(currentWord.slice(0, currentWord.length - 1))
            );
            return;
        }

        if (currentKey === AllowedKeys.ENTER && currentWord.length < 5) {
            setAnimateRow(true);
            return;
        }

        if (currentKey === AllowedKeys.ENTER && currentWord.length === 5) {
            // TODO: show success
            dispatch(addWords(currentWord));
            dispatch(setKeyColor(currentWord));
            dispatch(setCurrentWord(''));
            return;
        }

        // to avoid ALT, CRTL, TAB, SHIFT
        if (currentKey.length > 1) {
            return;
        }

        if (/[a-z]/i.test(currentKey) && newWord.length <= 5) {
            dispatch(setCurrentWord(newWord));
            return;
        }
    };

    const handleAnimationEnd = () => {
        setAnimateRow(false);
    };

    const getRowData = (index: number): string => {
        const rowData =
            wordsHistory.length === index ? currentWord : wordsHistory[index];
        return rowData ?? '';
    };

    const renderCell = (
        data: string,
        rowIndex: number,
        colIndex: number
    ): JSX.Element => {
        const colorClassName = getColorForLetter(data, colIndex);
        // flip card only for entered row, not for current or empty row
        const flipCard = rowIndex < wordsHistory.length;
        const transitionDelay = `${200 * colIndex}ms`;

        return (
            <div
                className={`cell ${flipCard ? 'flip-cards' : ''}`}
                key={colIndex}
            >
                <div className="container" style={{ transitionDelay }}>
                    <div className="front">{data}</div>
                    <div className={`back ${colorClassName}`} key={colIndex}>
                        {data}
                    </div>
                </div>
            </div>
        );
    };

    const renderGrid = (): JSX.Element[] => {
        return grid.map((row: [], rowIndex: number) => {
            const word = getRowData(rowIndex);
            const isCurrentRow = rowIndex === wordsHistory.length;

            return (
                <div
                    className={`row ${isCurrentRow ? 'current-row' : ''}`}
                    key={rowIndex}
                >
                    {row.map((cell, colIndex) => {
                        const data = word[colIndex] ?? '';
                        return renderCell(data, rowIndex, colIndex);
                    })}
                </div>
            );
        });
    };

    return (
        <section>
            <div
                className={`grid ${animateRow ? 'animate' : ''}`}
                onAnimationEnd={handleAnimationEnd}
            >
                {renderGrid()}
            </div>
        </section>
    );
};
