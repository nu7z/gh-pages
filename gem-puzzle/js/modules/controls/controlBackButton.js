import { toggler } from './controlMainMenu.utils.js';

export default (e) => {
    const navigationMenu = document.querySelector('.nav');
    const result = e.target.closest('.active__menu');
    if ([...result.classList].includes('saved')) {
        result.lastChild.remove();
    };
    if ([...result.classList].includes('best')) {
        const tbody = result.querySelector('tbody');
        if (!!tbody) {
            tbody.remove();
        }
    };
    toggler(result, navigationMenu);
};