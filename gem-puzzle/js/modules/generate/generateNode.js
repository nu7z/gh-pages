import { nodeElements } from './data.js';

const generate = (node) => {
    const { nodeElement, className, text, children } = node;
    if (!children) {
        return `<${nodeElement} class="${className}">${!!text ? text : ''}</${nodeElement}>`
    }
    return `<${nodeElement} class="${className}">
        ${children.map((item) => {
            return generate(item);
        }).join('')}
        </${nodeElement}>`
};

export default generate(nodeElements);