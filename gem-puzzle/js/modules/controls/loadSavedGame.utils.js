import { navTimeAndMoves } from './data.js';
import generatePuzzle from '../generate/generatePuzzle.js';
import controlPuzzle from './controlPuzzle.js';

export const controlNewPuzzle = () => {
    const saved = document.querySelector('.saved');
    const slider = document.querySelector('.slider__card');
    const arrow = document.querySelector('.arrow');
    const puzzle = document.querySelector('.gem-puzzle');
    puzzle.addEventListener('click', controlPuzzle);
    saved.classList.toggle('hidden');
    saved.classList.toggle('active__menu');
    slider.remove();
    arrow.remove();
};

export const generateNewPuzzle = (result) => {
    const time = document.querySelector('.time');
    const counter = document.querySelector('.counter');
    const puzzle = document.querySelector('.gem-puzzle');
    puzzle.replaceWith(generatePuzzle(result.size, result.puzzle, true));
    navTimeAndMoves.counter = result.count;
    navTimeAndMoves.time = result.timeObj;
    time.innerHTML = `Время: ${result.time}`;
    counter.innerHTML = `Количество ходов: ${result.count}`;
};

export const findToIdCard = (id) => {
    const objToLocalStorage = JSON.parse(localStorage.getItem('puzzle'));
    return objToLocalStorage.find((obj) => +id === obj.id);
};