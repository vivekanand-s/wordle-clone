const words = [
    'apple',
    'avoid',
    'broom',
    'empty',
    'flirt',
    'goose',
    'match',
    'pluck',
    'piano',
    'quick',
    'split',
    'swipe',
    'taper',
    'truth',
];

const randomIndex = Math.random() * words.length;
const answer = words[Math.floor(randomIndex)];

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
