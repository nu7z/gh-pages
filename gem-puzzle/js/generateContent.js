const saveGames = {
    puzzle: [],
    count: 0,
    time: '00:00',
    size: 4,
}; //объект для сохранённых игр

const sizeSquare = {
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
}; //объект для отображения поля

const keysSquare = Object.keys(sizeSquare); //массив ключей для определения размера квадрата

const menuData = ['продолжить','сохранить игру','новая игра', 'сохранённые игры', 'лучший результат', 'настройки'];



const createElement = (element, className) => {
    const arrClassName = className.split(' ');
    const content = document.createElement(element);
    arrClassName.forEach((item) => {
        content.classList.add(item);
    });
    return content;
};

const createLi = (classNameLi, arrLiTextContent) => {
    return arrLiTextContent.map((text) => {
        const liElem = createElement('li', classNameLi);
        liElem.textContent = text;
        return liElem;
    })
}

const menuNavigation = () => {
    const htmlSaveds = '<h2 class="card__title saves">Загрузить игру</h2><div class="back">меню</div>'
    const htmlNav = '<ul class="nav__menu"><li class="aside">продолжить</li><li class="aside">новая игра</li><li class="aside">сохранить игру</li><li class="aside">загрузить игру</li><li class="aside">лучший результат</li><li class="aside">настройки</li></ul>'
    const htmlBest = '<h2 class="card__title">Лучший результат</h2><div class="best__scores"><table><thead><tr><td class="title__date">Дата</td><td class="title__moves">Количество ходов</td><td class="title__size">Размер</td><td class="title__time">Время</td></tr></thead></table></div><div class="back">меню</div></div>'
    const htmlSettings = '<h2 class="card__title">Укажите размер поля</h2><ul class="list__settings"><li id="3">3x3</li><li id="4">4x4</li><li id="5">5x5</li><li id="6">6x6</li><li id="7">7x7</li><li id="8">8x8</li><div class="back">меню</div>'
    const htmlFinish = `<h2></h2>`
    const screenContainer = () => {
        const nameMenuClass = ['nav', 'saved', 'best', 'settings'];
        const divMenuNav = nameMenuClass.map((menuName) => createElement('div', `screen__container ${menuName} hidden`));
        const divNode = createElement('div','menu__container');
        divMenuNav.forEach((item) => divNode.append(item));
        return divNode;
    };

    const treeMenu = screenContainer();
    const saved = treeMenu.querySelector('.saved');
    const nav = treeMenu.querySelector('.nav');
    const best = treeMenu.querySelector('.best');
    const settings = treeMenu.querySelector('.settings');
    nav.classList.toggle('hidden');
    nav.classList.toggle('active__menu');
    saved.insertAdjacentHTML('beforeend', htmlSaveds);
    nav.insertAdjacentHTML('beforeend', htmlNav);
    best.insertAdjacentHTML('beforeend', htmlBest);
    settings.insertAdjacentHTML('beforeend', htmlSettings);
    return treeMenu;
}






const body = document.querySelector('body');
const divContent = createElement('div', 'content');

const randomNumber = (min, max) => (min + Math.random() * (max + 1 - min)).toFixed();

const checkArr = (array, n, count = 0, activeElement = 0, arrayPassed = 0) => { // проверка матрицы массивов на возможность решения игры
    const [first, ...last] = array;
        for (let i = 0; i < last.length; i += 1) {
            if (first > last[i] && last[i] !== '') { //если первый элемент больше дальше стоящего и не равен пустой строке, то прибавляем 1 к счётчику
                count += 1
            };
        };
    arrayPassed += 1;
    if (first === '') activeElement = Math.ceil(arrayPassed / n); //если первый элемент равен пустой строке, то назначаем аквиный элемент равным числу строки, стоящей в нём
    if (array.length === 1) {
        return (count + activeElement) % 2 === 0; // если счётчик + активный элемент делится на 2 без остатка, то возвращаем true, иначе -> false
    }
    return checkArr(last, n, count, activeElement, arrayPassed);
};



const generateRandomArr = (n) => { // Генерируем рандомный массив
    const result = [];
    const sizeN = (n * n) - 1;
    for (let i = 0; i < sizeN; i += 1) {
        const rand = randomNumber(1, sizeN - 1);
        if (!result.includes(+rand)) {
            result.push(+rand)
        } else {
            i -= 1;
        }
    }
    const randomActive = randomNumber(0, sizeN);  // Генерируем рандомное значение индекса в массиве актив 

    result.splice(+randomActive, 0, '');
    return checkArr(result, n) ? result : generateRandomArr(n); // проверяем полученую матрицу на возможность решения
}



const renderPuzzle = (n, save, bool) => {
    saveGames.size = n;
    const classListSize = keysSquare.filter((key) => +key === n);
    let sizeResult = sizeSquare[classListSize],
        rowClass = 'row',
        cellClass = 'cell',
        arr = generateRandomArr(n),
        divClassName = 'gem-puzzle';
    if (!!save) { //если второй аргумент существует, то определяем его массивом
        arr = save; 
        if (!bool) {
            sizeResult = `matrix__${sizeResult}`;
            rowClass = `${rowClass}__save`;
            cellClass = `${cellClass}__save`;
            
            divClassName = 'card__save'
        }
    };
    const divPuzzle = createElement('div', divClassName)
    for (let i = 0; i < n; i += 1) {
        const row = createElement('div', rowClass); //строка
        for (let j = 0; j < n; j += 1) {
            const cell = createElement('div', cellClass) //ячейка
            cell.classList.add(sizeResult); // добавление класса по размеру ячейки
            if (arr[j + (i * n)] === '') {
                cell.classList.add('active');
                row.append(cell);
            }
            else {
                cell.textContent = arr[j + (i * n)];
                row.append(cell);
                divPuzzle.append(row);
            }
        }
    }
    return divPuzzle;
};




const divMenu = createElement('div', 'menu');
const divContainer = createElement('div', 'menu__container');
const liMenu = createElement('ul', 'menu__nav');

const divNav = createElement('div', 'navigation');
divContent.append(renderPuzzle(saveGames.size));
body.prepend(divContent);

divMenu.append(menuNavigation());
divContainer.append(liMenu);

liMenu.innerHTML = menuData.map((item) => `<li class="aside">${item}</li>`).join('');
divNav.innerHTML = '<p class="time">Время: 00:00</p><p class="counter">Количество ходов: 0</p><p class="menu__list">menu</p>';

divContent.prepend(divMenu);
divContent.prepend(divNav);