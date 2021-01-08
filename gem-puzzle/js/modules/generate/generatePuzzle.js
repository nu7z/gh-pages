import { sizeSquare, saveGames } from './data.js';
import { createNodeElement, randomNumber } from './generateContent.utils.js';


const keysSquare = Object.keys(sizeSquare);

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

export default (n, save, bool) => {
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
    const divPuzzle = createNodeElement('div', divClassName)
    for (let i = 0; i < n; i += 1) {
        const row = createNodeElement('div', rowClass); //строка
        for (let j = 0; j < n; j += 1) {
            const cell = createNodeElement('div', cellClass, {i, j}) //ячейка, класс, дата-атрибут
            cell.classList.add(sizeResult); // добавление класса по размеру ячейки
            if (arr[j + (i * n)] === '') {
                cell.setAttribute('data-active', 'true'); // активному элементу назначается атрибут
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