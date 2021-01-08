import { listMenu, listSettings, tableBest } from './data.js';
import { createElements } from './generateContent.utils.js';



export const nav = createElements(listMenu);
export const settings = createElements(listSettings);

const bestTr = createElements(tableBest);
const table = document.createElement('table');
const thead = document.createElement('thead');
thead.append(bestTr);
table.append(thead);

export {table};

export const backMenu = () => {
    const backMenu = document.createElement('div');
    backMenu.classList.add('back');
    backMenu.textContent = 'Меню';
    return backMenu;
};
