const puzzleBox = document.querySelectorAll('.gem-puzzle');

const rowBox = document.querySelectorAll('.row');

const timeLi = document.querySelector('.time');
const counterLi = document.querySelector('.counter');
const menuNavLi = document.querySelector('.menu__nav');

const navTimeAndMoves = {
    time: {
        seconds: 0,
        minutes: 0,
        hours: 0,
    },

    showTimeStart: true,
    counter: 0,
    showSeconds: 0,
    showMinutes: 0
}


const timeToStringClock = (number) => number < 10 ? `0${number}` : String(number);

const showTime = () => {
    navTimeAndMoves.time.seconds += 1;
    if (navTimeAndMoves.time.seconds === 60) {
        navTimeAndMoves.time.seconds = 0;
        navTimeAndMoves.time.minutes += 1;
    }
    navTimeAndMoves.showSeconds = timeToStringClock(navTimeAndMoves.time.seconds);
    navTimeAndMoves.showMinutes = timeToStringClock(navTimeAndMoves.time.minutes);
    saveGames.time = `${navTimeAndMoves.showMinutes}:${navTimeAndMoves.showSeconds}`;
    timeLi.innerHTML = `Время: ${saveGames.time}`;
    navTimeAndMoves.startShowTimes = setTimeout(showTime, 1000)
};

const playAudio = () => {
    let myAudio = new Audio;
    myAudio.src = 'click.mp3';
    myAudio.play();
}



const elementSelection = (e) => {
    const elements = document.querySelectorAll('.cell');
    const objElement = {
        active: {},
        click: {},
        checkLength: [],
    };
    const sizeMatrix = Math.sqrt(elements.length);
    const activeElement = document.querySelector('.active');
    
    for (let i = 0; i < elements.length; i += 1) {
        if (e.target.textContent === elements[i].textContent) objElement.click.index = i;
        if ([...elements[i].classList].includes('active')) objElement.active.index = i;
    }

    objElement.active.x = Math.ceil((objElement.active.index + 1) / sizeMatrix);
    objElement.click.x = Math.ceil((objElement.click.index + 1) / sizeMatrix);

    objElement.active.y = objElement.active.index % sizeMatrix;
    objElement.click.y = objElement.click.index % sizeMatrix;

    const iterClick = [
        objElement.click.index - 1,
        objElement.click.index + 1,
        objElement.click.index + sizeMatrix, 
        objElement.click.index- sizeMatrix
    ];
    const cellAndRow = [
        objElement.active.x === objElement.click.x,
        objElement.active.y === objElement.click.y,
    ]

    const resultIter = iterClick.some((item) => item === objElement.active.index);
    const resultCellAndRow = cellAndRow.some((item) => item);



    if (resultIter && resultCellAndRow) {
        if (navTimeAndMoves.showTimeStart) {
            showTime();
            navTimeAndMoves.showTimeStart = false;
        }
        playAudio();
        navTimeAndMoves.counter += 1;
        saveGames.count = navTimeAndMoves.counter;
        counterLi.innerHTML = `Количество ходов: ${navTimeAndMoves.counter}`;
        let count = e.target.textContent;
        e.target.classList.add('active');
        e.target.textContent = '';
        activeElement.classList.remove('active');
        activeElement.textContent = count;
    };

    for (let i = 0; i < elements.length - 1; i += 1) {
        if (i + 1 === +elements[i].textContent && !objElement.checkLength.includes(i + 1)) {
            objElement.checkLength.push(i + 1);
        }
    };

    if (elements.length === objElement.checkLength.length + 1) {
        const arrRecord = [];
        saveGames.date = `${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`;
        const tempLocalStorage = JSON.parse(localStorage.getItem('puzzle-win')) === null ? [] : JSON.parse(localStorage.getItem('puzzle-win'));
        arrRecord.push(...tempLocalStorage, saveGames);
        localStorage.setItem(`puzzle-win`, `${JSON.stringify(arrRecord)}`);
        const record = createElement('div', 'record');
        record.innerHTML = `<h1>Ура ты победил!</h1><p>за ${saveGames.time} минут</p><p>и ${saveGames.count} ходов</p>`
        document.querySelector('.active__menu').classList.toggle('hidden');
        document.querySelector('.active__menu').classList.toggle('active__menu');
        record.classList.toggle('active__menu');
        document.querySelector('.menu__container').prepend(record);
        document.querySelector('.menu').classList.toggle('none');
    }
}

puzzleBox.forEach((puzzle) => {
    puzzle.addEventListener('click', elementSelection)
})


