export const saveGames = {
    puzzle: [],
    count: 0,
    time: '00:00',
    size: 4,
};

export const nodeElements = {
    nodeElement: 'div',
    className: 'content',
    children: [
        {
            nodeElement: 'div',
            className: 'navigation',
            children: [
                {
                    nodeElement: 'p',
                    className: 'time',
                    text: `Время: ${saveGames.time}`
                },
                {
                    nodeElement: 'p',
                    className: 'counter',
                    text: `Количество ходов: ${saveGames.count}`
                },
                {
                    nodeElement: 'p',
                    className: 'menu__list',
                    text: 'меню'
                }
            ]
        },
        {
            nodeElement: 'div',
            className: 'menu none',
            children: [
                {
                    nodeElement: 'div',
                    className: 'menu__container',
                    children: [
                        {
                            nodeElement: 'div',
                            className: 'screen__container nav active__menu',
                        },
                        {
                            nodeElement: 'div',
                            className: 'screen__container saved hidden',
                            children: [
                                {
                                    nodeElement: 'h2',
                                    className: 'card__title saves',
                                    text: 'Загрузить игру'
                                }
                            ]
                        },
                        {   
                            nodeElement: 'div',
                            className: 'screen__container best hidden',
                            children: [
                                {
                                    nodeElement: 'h2',
                                    className: 'card__title',
                                    text: 'Лучший результат'
                                },
                                {
                                    nodeElement: 'div',
                                    className: 'best__scores'
                                }
                            ]
                        },
                        {
                            nodeElement: 'div',
                            className: 'screen__container settings hidden',
                            children: [
                                {
                                    nodeElement: 'h2',
                                    className: 'card__title',
                                    text: 'Укажите размер поля'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
};

export const listMenu = {
    node: 'ul',
    className: 'nav__menu',
    classNameLiOrId: ['aside'],
    arrLiTextContent: [
        'продолжить',
        'новая игра', 
        'сохранить игру', 
        'загрузить игру', 
        'лучший результат', 
        'настройки'
    ]
};

export const listSettings = {
    node: 'ul',
    className: 'list__settings',
    classNameLiOrId: [3, 4, 5, 6, 7, 8],
    arrLiTextContent: ['3x3', '4x4', '5x5', '6x6', '7x7', '8x8'],
}

export const tableBest = {
    node: 'tr',
    classNameLiOrId: ['title__data', 'title__moves', 'title__size', 'title__time'],
    arrLiTextContent: ['Дата', 'Количество ходов', 'Размер', 'Время']
}

export const sizeSquare = {
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
};


