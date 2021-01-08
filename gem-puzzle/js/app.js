import { saveGames } from './modules/generate/data.js';
import generateContent from './modules/generate/generateContent.js';
import controlPuzzle from './modules/controls/controlPuzzle.js';
import controlMainMenu from './modules/controls/controlMainMenu.js';
import controlButtonMenu from './modules/controls/controlButtonMenu.js';
import controlBackButton from './modules/controls/controlBackButton.js';
import loadSavedGame from './modules/controls/loadSavedGame.js';
import { clear } from './modules/controls/controlPuzzle.utils.js'

import { navTimeAndMoves } from './modules/controls/data.js';
import generatePuzzle from './modules/generate/generatePuzzle.js';


generateContent(saveGames.size);

export const objectListener = {
    dataIdBox : [...document.querySelectorAll('[data-id]')],
    mainMenu : document.querySelector('.menu__list'),
    navigationBox : [...document.querySelectorAll('.aside')],
    backMenu: [...document.querySelectorAll('.back')],
    openMenu: document.querySelector('.menu__list'),
    saved: document.querySelector('.saved'),
    puzzle: document.querySelector('.gem-puzzle'),
    listSettingsBox: document.querySelector('.list__settings').querySelectorAll('li'),
};

const updateListener = () => {
    objectListener.puzzle = document.querySelector('.gem-puzzle');
    objectListener.dataIdBox = [...document.querySelectorAll('[data-id]')];
    objectListener.openMenu =  document.querySelector('.menu__list');
};

const renderNewFieldPuzzle = (e) => {
    objectListener.puzzle.replaceWith(generatePuzzle(+e.target.id));
    updateListener();
    clear();
    objectListener.puzzle.addEventListener('click', controlPuzzle);
};


objectListener.dataIdBox.forEach((dataId) => {
    dataId.addEventListener('click', controlPuzzle);
});


objectListener.mainMenu.addEventListener('click', controlButtonMenu);

objectListener.navigationBox.forEach((navigation) => {
    navigation.addEventListener('click', controlMainMenu);
});

objectListener.backMenu.forEach((back) => {
    back.addEventListener('click', controlBackButton);
});

objectListener.saved.addEventListener('click', loadSavedGame);

objectListener.listSettingsBox.forEach((listSetting) => {
    listSetting.addEventListener('click', renderNewFieldPuzzle)
});