const menu = document.querySelector('.menu');
const content = document.querySelector('.content');
const menuNav = document.querySelectorAll('.aside');
const openMenu = document.querySelector('.menu__list');

const backMenu = document.querySelectorAll('.back');
const navigationMenu = document.querySelector('.nav');
const ulListSettings = document.querySelector('.list__settings');



const createCard = (i, arrObj) => {
    const { count, date, puzzle, size, time, id} = arrObj[i];
    const sliderCard = createElement('div', 'slider__card');
    const sliderText = createElement('div', 'card__text');
    sliderText.innerHTML = `<p>Время игры: ${time}</p><p>Количество ходов: ${count}</p><p>Дата: ${date}</p>`;
    const saveCard = renderPuzzle(size, puzzle);
    saveCard.id = id;
    sliderCard.append(saveCard);
    sliderCard.append(sliderText);
    return sliderCard;
}

const createTbodyForBestResult = (objRecord) => {
    const tableString = document.createElement('tr');
    const trElement = `<td>${objRecord.date}</td><td>${objRecord.count}</td><td>${objRecord.size}</td><td>${objRecord.time}</td>`;
    tableString.innerHTML = trElement;
    return tableString;
}



menuNav.forEach((menuLi) => {
    menuLi.addEventListener('click', (e) => {
        const cellContent = document.querySelectorAll('.cell');
        const screenMenu = document.querySelectorAll('.screen__container');
        const activeMenu = document.querySelector('.active__menu');
        const saves = [];
        const target = e.target.textContent;
        switch (target) {
            case 'продолжить': {
                menu.classList.add('none');
                navTimeAndMoves.showTimeStart = true;
                break;
            }
            case 'новая игра': {
                menu.classList.add('none');
                document.querySelector('.gem-puzzle').replaceWith(renderPuzzle(saveGames.size));
                clearTimeout(navTimeAndMoves.startShowTimes);
                navTimeAndMoves.showTimeStart = true;
                navTimeAndMoves.time.seconds = 0;
                navTimeAndMoves.counter = 0;
                saveGames.count = navTimeAndMoves.counter;
                saveGames.time = '00:00';
                timeLi.innerHTML = 'Время: 00:00';
                counterLi.innerHTML = 'Количество ходов: 0';
                document.querySelectorAll('.gem-puzzle').forEach((puzzle) => {
                    puzzle.addEventListener('click', elementSelection)
                })
                break;
            }
            case 'сохранить игру': {
                saveGames.puzzle.length = 0
                cellContent.forEach((cell) => {
                    saveGames.puzzle.push(cell.textContent);
                });
                saveGames.timeObj = navTimeAndMoves.time;
                saveGames.date = `${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`;
                const tempLocalStorage = JSON.parse(localStorage.getItem('puzzle')) === null ? [] : JSON.parse(localStorage.getItem('puzzle'));
                saveGames.id = tempLocalStorage.length;
                saves.push(...tempLocalStorage, saveGames);
                localStorage.setItem(`puzzle`, `${JSON.stringify(saves)}`);
                menu.classList.add('none');
                navTimeAndMoves.showTimeStart = true;
                break;
            }

            case 'загрузить игру': {
                let i = 0;
                const savedMenu = document.querySelector('.saved');
                const savedGames = localStorage.getItem('puzzle');
                if (savedGames === null) {
                    savedMenu.insertAdjacentHTML('beforeend', '<h2>нет сохранённых игр</h2>')
                } else {
                    const arrObjSavedGames = JSON.parse(savedGames);
                    const sizeArrSavedGames = arrObjSavedGames.length;
                    const arrow = createElement('ul', 'arrow');
                    const arrowLi = ['left', 'right'].map((liClassName) => `<li class=${liClassName}></li>`).join('');
                    arrow.innerHTML = arrowLi;
                    const sliderCard = createCard(i, arrObjSavedGames);
                    savedMenu.append(arrow)
                    savedMenu.append(sliderCard);
                    navTimeAndMoves.showTimeStart = true;
                    
                    arrow.addEventListener('click' ,(e) => {
                        const targetClass = e.target.className;
                        switch (targetClass) {
                            case 'right': {
                                i = (i + 1) % sizeArrSavedGames;
                                document.querySelector('.slider__card').replaceWith(createCard(i, arrObjSavedGames));
                                break;
                            }
                            case 'left': {
                                i = i === 0 ? 0 : i -= 1;
                                document.querySelector('.slider__card').replaceWith(createCard(i, arrObjSavedGames));
                                break;
                            }
                        }
                    })
                };
                activeMenu.classList.toggle('hidden');
                activeMenu.classList.toggle('active__menu');
                savedMenu.classList.toggle('hidden');
                savedMenu.classList.toggle('active__menu');
                break;
            };

            case 'лучший результат': {
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
                activeMenu.classList.toggle('hidden');
                activeMenu.classList.toggle('active__menu');
                bestGames.classList.toggle('hidden');
                bestGames.classList.toggle('active__menu');
                break;
            };

            case 'настройки': {
                const settingsMenu = document.querySelector('.settings');
                activeMenu.classList.toggle('hidden');
                activeMenu.classList.toggle('active__menu');
                settingsMenu.classList.toggle('hidden');
                settingsMenu.classList.toggle('active__menu');
                break;
            }
        }
    })
});


openMenu.addEventListener('click', () => { //прячем меню
    clearTimeout(navTimeAndMoves.startShowTimes);
    menu.classList.remove('none');
    navTimeAndMoves.showTimeStart = false;
});

backMenu.forEach((back) => { //возврат к меню навигации
    back.addEventListener('click', () => {
        const result = back.closest('.active__menu');
        if ([...result.classList].includes('saved')) {
            result.lastChild.remove();
        };
        if ([...result.classList].includes('best')) {
            const tbody = result.querySelector('tbody');
            if (!!tbody) {
                tbody.remove();
            }
        };
        result.classList.toggle('hidden');
        result.classList.toggle('active__menu');
        navigationMenu.classList.toggle('hidden');
        navigationMenu.classList.toggle('active__menu');
    });
});

document.querySelector('.saved').addEventListener('click', (e) => { //Загружаем игру
    const cardSave = document.querySelector('.card__save');
    if (e.target.closest('.card__save') === cardSave && !!cardSave) {
            const id = cardSave.id;
            const objToLocalstorage = JSON.parse(localStorage.getItem('puzzle'));
            const result = objToLocalstorage.find((obj) => +id === obj.id);
            document.querySelector('.gem-puzzle').replaceWith(renderPuzzle(result.size, result.puzzle, true));
            navTimeAndMoves.counter = result.count;
            navTimeAndMoves.time = result.timeObj;
            timeLi.innerHTML = `Время: ${result.time}`;
            counterLi.innerHTML = `Количество ходов: ${result.count}`
            document.querySelector('.gem-puzzle').addEventListener('click', elementSelection);
            document.querySelector('.saved').classList.toggle('hidden');
            document.querySelector('.saved').classList.toggle('active__menu');
            document.querySelector('.slider__card').remove();
            document.querySelector('.arrow').remove();
            menu.classList.toggle('none');
            navigationMenu.classList.toggle('active__menu');
            navigationMenu.classList.toggle('hidden');
    }
});

const listSettingsBox = ulListSettings.querySelectorAll('li');
listSettingsBox.forEach((listSetting) => {
    listSetting.addEventListener('click', (e) => {
        document.querySelector('.gem-puzzle').replaceWith(renderPuzzle(+e.target.id));
        document.querySelector('.gem-puzzle').addEventListener('click', elementSelection);
    });
});



