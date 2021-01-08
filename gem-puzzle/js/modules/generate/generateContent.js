import generateNode from './generateNode.js';
import { nav, settings, table, backMenu } from './generateElements.js';
import generatePuzzle from './generatePuzzle.js';

// генерация страницы

export default (size) => {
    document.querySelector('body').innerHTML = generateNode;
    const content = document.querySelector('.content');
    const screenContainer = [...document.querySelectorAll('.screen__container')];

    content.append(generatePuzzle(size))
    screenContainer.forEach((container) => {
        const classes = [...container.classList];
        if (classes.includes('nav')) {
            container.append(nav);   
        }
        if (classes.includes('settings')) {
            container.append(settings);
            container.append(backMenu());
        }
        if (classes.includes('best')) {
            const scores = container.querySelector('.best__scores');
            scores.append(table);
            container.append(backMenu());
        }
        if (classes.includes('saved')) {
            container.append(backMenu());
        }
    });
}
