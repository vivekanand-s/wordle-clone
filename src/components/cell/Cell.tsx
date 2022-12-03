import { getColorForLetter } from '../../color.util';
import { useAppSelector } from '../../hooks/storeHooks';
import { selectWordsHistory } from '../../store/selectors/wordleSelector';
import './Cell.css';

interface CellProps {
    data: string;
    rowIndex: number;
    colIndex: number;
}

export const Cell = ({ data, rowIndex, colIndex }: CellProps): JSX.Element => {
    const wordsHistory = useAppSelector(selectWordsHistory);
    const colorClassName = getColorForLetter(data, colIndex);
    // flip card only for entered row, not for current or empty row
    const flipCard = rowIndex < wordsHistory.length;
    const transitionDelay = `${200 * colIndex}ms`;

    return (
        <div className={`cell ${flipCard ? 'flip-cards' : ''}`} key={colIndex}>
            <div className="container" style={{ transitionDelay }}>
                <div className="front">{data}</div>
                <div className={`back ${colorClassName}`} key={colIndex}>
                    {data}
                </div>
            </div>
        </div>
    );
};
