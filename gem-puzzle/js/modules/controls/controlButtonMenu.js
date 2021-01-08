import { navTimeAndMoves } from './data.js'

export default () => {
    const menu = document.querySelector('.menu');
    clearTimeout(navTimeAndMoves.startShowTimes);
    menu.classList.remove('none');
    navTimeAndMoves.showTimeStart = false;
};