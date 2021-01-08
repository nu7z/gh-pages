import controlPuzzle from './controlPuzzle.js';
import controlMenu from './controlButtonMenu.js';
import { saveGames } from '../generate/data.js';
import { clear, savedToLocalStorage } from './controlPuzzle.utils.js';
import generatePuzzle from '../generate/generatePuzzle.js';
import { navTimeAndMoves } from './data.js';
import { updateListener, objectListener, toggler, loadGames, bestResult} from './controlMainMenu.utils.js'

export default (e) => {
    const activeMenu = document.querySelector('.active__menu');
    const menu = document.querySelector('.menu');
    const target = e.target.textContent;
    switch (target) {
        case 'продолжить': {
            menu.classList.add('none');
            navTimeAndMoves.showTimeStart = true;
            break;
        }
        case 'новая игра': {
            document.querySelector('.gem-puzzle').replaceWith(generatePuzzle(saveGames.size));
            menu.classList.add('none');
            clear();
            updateListener();
            objectListener.dataIdBox.forEach((dataId) => {
                dataId.addEventListener('click', controlPuzzle)
            })
            objectListener.openMenu.addEventListener('click', controlMenu);
            break;
        }
        case 'сохранить игру': {
            saveGames.count = navTimeAndMoves.counter;
            savedToLocalStorage('puzzle')
            menu.classList.add('none');
            navTimeAndMoves.showTimeStart = true;
            break;
        }
        case 'загрузить игру': {
            loadGames(activeMenu);
            break;
        }
        case 'лучший результат': {
            bestResult(activeMenu);
            break;
        };
        case 'настройки': {
            const settingsMenu = document.querySelector('.settings');
            toggler(activeMenu, settingsMenu);
            break;
        }
    }
};