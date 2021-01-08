import { navTimeAndMoves } from './data.js';
import { saveGames } from '../generate/data.js';
import { createNodeElement } from '../generate/generateContent.utils.js';

export const possibleClickXOrY = (xOrY) => [
    (+xOrY - 1).toString(), 
    (+xOrY + 1).toString()
];

export const timeToStringClock = (number) => number < 10 ? `0${number}` : String(number);

export const playAudio = () => {
    let myAudio = new Audio;
    myAudio.src = 'click.mp3';
    myAudio.play();
};

export const showTime = () => {
    navTimeAndMoves.time.seconds += 1;
    if (navTimeAndMoves.time.seconds === 60) {
        navTimeAndMoves.time.seconds = 0;
        navTimeAndMoves.time.minutes += 1;
    }
    navTimeAndMoves.showSeconds = timeToStringClock(navTimeAndMoves.time.seconds);
    navTimeAndMoves.showMinutes = timeToStringClock(navTimeAndMoves.time.minutes);
    saveGames.time = `${navTimeAndMoves.showMinutes}:${navTimeAndMoves.showSeconds}`;
    document.querySelector('.time').innerHTML = `Время: ${saveGames.time}`;
    navTimeAndMoves.startShowTimes = setTimeout(showTime, 1000)
};

export const arrAttribute = (element) => element.getAttribute('data-id').split('-');

export const updateCount = () => {
    navTimeAndMoves.counter += 1;
    document.querySelector('.counter').innerHTML = `Количество ходов: ${navTimeAndMoves.counter}`;
};

export const startShowTime = () => {
    if (navTimeAndMoves.showTimeStart) {
        showTime();
        navTimeAndMoves.showTimeStart = false;
    }
};

export const clear = () => {
    navTimeAndMoves.showTimeStart = true;
    navTimeAndMoves.time.seconds = 0;
    navTimeAndMoves.counter = 0;
    saveGames.count = navTimeAndMoves.counter;
    saveGames.time = '00:00';
    document.querySelector('.time').innerHTML = 'Время: 00:00';
    document.querySelector('.counter').innerHTML = 'Количество ходов: 0';
}

export const savedToLocalStorage = (arg) => {
    const arrRecord = [];
    if (arg === 'puzzle') {
        const cellContent = document.querySelectorAll('.cell');
        cellContent.forEach((cell) => {
            saveGames.puzzle.push(cell.textContent);
        });
        saveGames.timeObj = navTimeAndMoves.time;
    }
    saveGames.date = `${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`;
    const tempLocalStorage = JSON.parse(localStorage.getItem(arg)) === null ? [] : JSON.parse(localStorage.getItem(arg));
    arrRecord.push(...tempLocalStorage, saveGames);
    saveGames.id = tempLocalStorage.length;
    localStorage.setItem(arg, `${JSON.stringify(arrRecord)}`);
    saveGames.puzzle.length = 0;
};

export const savedGames = () => {
    savedToLocalStorage('puzzle-win');
    const active__menu = document.querySelector('.active__menu')
    const record = createNodeElement('div', 'record');
    record.innerHTML = `<h1>Ура ты победил!</h1><p>за ${saveGames.time} минут</p><p>и ${navTimeAndMoves.counter} ходов</p>`
    active__menu.classList.toggle('hidden');
    active__menu.classList.toggle('active__menu');
    record.classList.toggle('active__menu');
    document.querySelector('.menu__container').prepend(record);
    document.querySelector('.menu').classList.toggle('none');
    clearTimeout(navTimeAndMoves.startShowTimes);
    clear();
};

export const switchingActiveElement = (active, target) => {
    active.textContent = target.textContent;
    target.textContent = '';
    active.classList.toggle('active');
    target.classList.toggle('active');
    active.removeAttribute('data-active');
    target.setAttribute('data-active', 'true');
};