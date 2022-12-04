import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/storeHooks';
import {
    selectCurrentWord,
    selectWordsHistory,
} from '../../store/selectors/wordleSelector';
import { AllowedKeys, handleKey } from '../../utils/handleKey.util';
import { Cell } from '../cell/Cell';
import './Grid.css';

const grid = Array(6).fill(Array(5).fill(''));

// TODO: local storage
export const Grid = () => {
    const [animateRow, setAnimateRow] = useState(false);
    const wordsHistory = useAppSelector(selectWordsHistory);
    const currentWord = useAppSelector(selectCurrentWord);

    useEffect(() => {
        window.addEventListener('keydown', keyPressHandler);

        return () => {
            window.removeEventListener('keydown', keyPressHandler);
        };
    }, [currentWord]);

    const keyPressHandler = (event: KeyboardEvent) => {
        if (event.ctrlKey || event.altKey || event.metaKey || event.shiftKey) {
            return;
        }

        const currentKey = event.key.toLowerCase();
        if (currentKey === AllowedKeys.ENTER && currentWord.length < 5) {
            setAnimateRow(true);
            return;
        }

        handleKey(currentKey);
    };

    const handleAnimationEnd = () => {
        setAnimateRow(false);
    };

    const getRowData = (index: number): string => {
        const rowData =
            wordsHistory.length === index ? currentWord : wordsHistory[index];
        return rowData ?? '';
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
                    {row.map((_, colIndex) => {
                        const data = word[colIndex] ?? '';
                        return (
                            <Cell
                                data={data}
                                rowIndex={rowIndex}
                                colIndex={colIndex}
                                key={colIndex}
                            />
                        );
                    })}
                </div>
            );
        });
    };

    return (
        <section>
            <div
                className={`grid ${animateRow ? 'animate-row' : ''}`}
                onAnimationEnd={handleAnimationEnd}
            >
                {renderGrid()}
            </div>
        </section>
    );
};
