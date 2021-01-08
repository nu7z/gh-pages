const listOrTable = (el, arrIds, arrText) => {
    const iter = (ids, text, acc = []) => {
        if (!ids.length && !text.length) return acc;
        const [firstId, ...lastIds] = ids;
        const idOrClass = typeof firstId === 'number' ? 'id' : 'class';
        const [firstText, ...lastTexts] = text;
        const liElement = `<${el} ${idOrClass}="${firstId}">${firstText}</${el}>`
        acc.push(liElement);
        return iter(lastIds, lastTexts, acc);
    }
    return iter(arrIds, arrText);
};

const listAddToClass = (classList) => classList
  .map((classEs) => {
        const liElem = document.createElement('li');
        liElem.classList.add(classEs);
        return liElem;
});

const listAddTextAndClass = (textContent, classList) => textContent.map((text) => {
    const liElem = `<li class="${classList}">${text}</li>`
        return liElem;
});
    

const generateElements = (el, classOrId, textContent) => {
    if (classOrId.length > 1 && !textContent) {
        return listAddToClass(classOrId);
    };
    if (classOrId.length === 1) {
        return listAddTextAndClass(textContent, classOrId[0]);
    }

    if (classOrId.length > 1 && !!textContent) {
        return listOrTable(el, classOrId, textContent);
    }
};

export const createElements = ({node, className, classNameLiOrId, arrLiTextContent }) => {
    const element = document.createElement(node);
    if (!!className) {
        element.classList.add(className);
    }
    const el = node === 'ul' ? 'li' : 'td';
    const result = generateElements(el, classNameLiOrId, arrLiTextContent);
    element.innerHTML = result.join('');
    return element;
}

export const createNodeElement = (element, className, id) => {
    const content = document.createElement(element);
    if (!!id) {
        const {i, j} = id;
        content.setAttribute('data-id', `${j}-${i}`);
    }
    content.classList.add(className);
    return content;
};

export const randomNumber = (min, max) => (min + Math.random() * (max + 1 - min)).toFixed();
