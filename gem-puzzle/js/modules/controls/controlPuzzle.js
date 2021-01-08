import { possibleClickXOrY, playAudio, startShowTime, arrAttribute, updateCount, savedGames, switchingActiveElement } from './controlPuzzle.utils.js';

export default (e) => {
    const checkLengthPuzzle = [];

    const active = document.querySelector('[data-active]');
    const elements = document.querySelectorAll('.cell');

    const activeElements = arrAttribute(active);
    const clickElements = arrAttribute(e.target);

    const [activeX, activeY] = activeElements;
    const [clickX, clickY] = clickElements;

    const clickToX = possibleClickXOrY(activeX);
    const clickToY = possibleClickXOrY(activeY);

    if ((clickY === activeY && clickToX.includes(clickX)) || (clickX === activeX && clickToY.includes(clickY))) {
        startShowTime()
        updateCount();
        playAudio();
        switchingActiveElement(active, e.target);
    }

    for (let i = 0; i < elements.length - 1; i += 1) {
        if (i + 1 === +elements[i].textContent && !checkLengthPuzzle.includes(+elements[i].textContent)) {
            checkLengthPuzzle.push(i + 1);
        }
    };

    if (elements.length === checkLengthPuzzle.length + 1) {
        savedGames();
    }
};