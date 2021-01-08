import generatePuzzle from '../generate/generatePuzzle.js';
import { navTimeAndMoves } from './data.js';
import { createNodeElement } from '../generate/generateContent.utils.js';

export const updateListener = () => {
    objectListener.puzzle = document.querySelector('.gem-puzzle');
    objectListener.dataIdBox = [...document.querySelectorAll('[data-id]')];
    objectListener.openMenu =  document.querySelector('.menu__list');
};

export const objectListener = {
    dataIdBox : [...document.querySelectorAll('[data-id]')],
    mainMenu : document.querySelector('.menu__list'),
    navigationBox : [...document.querySelectorAll('.aside')],
    backMenu: [...document.querySelectorAll('.back')],
    openMenu: document.querySelector('.menu__list'),
    saved: document.querySelector('.saved'),
    puzzle: document.querySelector('.gem-puzzle'),
};

export const createTbodyForBestResult = (objRecord) => {
    const tableString = document.createElement('tr');
    const trElement = `
    <td>${objRecord.date}</td>
    <td>${objRecord.count}</td>
    <td>${objRecord.size}</td>
    <td>${objRecord.time}</td>
    `;
    tableString.innerHTML = trElement;
    return tableString;
};

export const createCard = (i, arrObj) => {
    const { count, date, puzzle, size, time, id} = arrObj[i];
    const sliderCard = createNodeElement('div', 'slider__card');
    const sliderText = createNodeElement('div', 'card__text');
    sliderText.innerHTML = `
    <p>Время игры: ${time}</p>
    <p>Количество ходов: ${count}</p>
    <p>Дата: ${date}</p>
    `;
    const saveCard = generatePuzzle(size, puzzle);
    saveCard.id = id;
    sliderCard.append(saveCard);
    sliderCard.append(sliderText);
    return sliderCard;
};

export const toggler = (menuHide, menuActive) => {
    menuHide.classList.toggle('hidden');
    menuHide.classList.toggle('active__menu');
    menuActive.classList.toggle('hidden');
    menuActive.classList.toggle('active__menu');
};

export const loadGames = (activeMenu) => {
    let i = 0;
    const savedMenu = document.querySelector('.saved');
    const savedGames = localStorage.getItem('puzzle');
    if (savedGames === null) {
        savedMenu.insertAdjacentHTML('beforeend', '<h2>нет сохранённых игр</h2>')
    } else {
        const tempSavedGame = JSON.parse(savedGames)
        const arrow = createNodeElement('ul', 'arrow');
        const arrowLi = ['left', 'right'].map((liClassName) => `<li class=${liClassName}></li>`).join('');
        arrow.innerHTML = arrowLi;
        const sliderCard = createCard(i, tempSavedGame);
        savedMenu.append(arrow)
        savedMenu.append(sliderCard);
        navTimeAndMoves.showTimeStart = true;
        arrow.addEventListener('click' , (e) => {
            const targetClass = e.target.className;
            switch (targetClass) {
                case 'right': {
                    i = (i + 1) % tempSavedGame.length;
                    document.querySelector('.slider__card').replaceWith(createCard(i, tempSavedGame));
                    break;
                }
                case 'left': {
                    i = i === 0 ? 0 : i -= 1;
                    document.querySelector('.slider__card').replaceWith(createCard(i, tempSavedGame));
                    break;
                }
            }
        });
                        
    }
    toggler(activeMenu, savedMenu);
};



export const bestResult = (activeMenu) => {
    const bestGames = document.querySelector('.best');
    const table = document.querySelector('table');
    const objRecord = JSON.parse(localStorage.getItem('puzzle-win'));
    const tbody = document.createElement('tbody');
    if (objRecord !== null) {
        objRecord.forEach((record) => {
            tbody.append(createTbodyForBestResult(record));
        });
        table.append(tbody);
    }
    toggler(activeMenu, bestGames);
};