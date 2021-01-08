import { controlNewPuzzle, generateNewPuzzle, findToIdCard } from './loadSavedGame.utils.js'

export default (e) => {
    const cardSave = document.querySelector('.card__save');
    const menu = document.querySelector('.menu');
    const navigationMenu = document.querySelector('.nav');
    if (e.target.closest('.card__save') === cardSave && !!cardSave) {
            const id = cardSave.id;
            const result = findToIdCard(id);
            generateNewPuzzle(result);
            controlNewPuzzle();
            menu.classList.toggle('none');
            navigationMenu.classList.toggle('active__menu');
            navigationMenu.classList.toggle('hidden');
    }
};
