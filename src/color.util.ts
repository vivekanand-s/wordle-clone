// TODO: random word generator
const answer = 'apple';

export const getColorForLetter = (letter: string, index: number): string => {
    if (!letter) {
        return '';
    }

    if (letter === answer[index]) {
        return 'green';
    }

    if (answer.includes(letter)) {
        return 'yellow';
    }

    return 'gray';
};
