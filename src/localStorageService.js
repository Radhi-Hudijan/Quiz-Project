export const writeToLocal = (newScore, index) => {
    const storageItem = {
        newScore: newScore,
        questionIndex: index
    };
    localStorage.setItem('storageItem', JSON.stringify(storageItem));
}
export const getFromLocal = () => {
    const localStorageItem = localStorage.getItem('storageItem');
    if (localStorageItem) {
        return JSON.parse(localStorageItem);
    } else {
        return {
            newScore: 0,
            questionIndex: 0
        };
    }
}
export const writeToLocalAnswer = (index, answer) => {
    const answers = {
        [index]: answer
    };
    localStorage.setItem('answers', JSON.stringify(answers));
}
export const getFromLocalAnswer = () => {
    const answers = localStorage.getItem('answers');
    if (answers) {
        return JSON.parse(answers);
    } else {
        return null;
    }
}
export const writeToLocalTimer = (counter) => {
    localStorage.setItem('Timer', (counter));
}

export const getFromLocalTimer = () => {
    const localStorageItem = localStorage.getItem('Timer');
    return localStorageItem || 0;

}

export const writeToLocalIsAnswered = (IsAnswered) => {
    localStorage.setItem('IsAnswered', (IsAnswered));
}
export const getFromLocalIsAnswered = () => {
    const IsAnswered = localStorage.getItem('IsAnswered') === 'true' ? true : false;
    return IsAnswered;
}
