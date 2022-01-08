const btnLogin = document.querySelector('.auth__btn');
const formAuth = document.querySelector('.auth');
const wrapperAuth = document.querySelector('.wrapper__auth');
const authName = document.querySelector('.auth__name');
const formMenu = document.querySelector('.menu');
const wrapperMenu = document.querySelector('.wrapper__menu');

const menuListItemBtns = document.querySelectorAll('.menu__btn');

const wrapperLvl1 = document.querySelector('.wrapper__level-1');
const wrapperLvl2 = document.querySelector('.wrapper__level-2');
const wrapperLvlSpecial = document.querySelector('.wrapper__level-special');
const wrapperGameOver = document.querySelector('.wrapper__game-over');

const headingGameWin = document.querySelector('.game-over__heading--win');
const headingGameFail = document.querySelector('.game-over__heading--fail');
const btnGameOver = document.querySelector('.game-over__menu-btn');

const formScrore = document.querySelector('.level-1__score');
const formTask = document.querySelector('.level-1__text');
const formLives = document.querySelector('.level-1__lives');
const formTime = document.querySelector('.level-1__time');
const formHeading = document.querySelector('.level-1__heading');


const listScore = document.querySelector('.score__list');
const clearScore = document.querySelector('.score__clear');

let lvl1Images = document.querySelector('.level-1__images');
const lvlSpecialWord = document.querySelector('.level-special__word');


const btnThemeRed = document.querySelector('.theme__btn--red');
const btnThemeBlue = document.querySelector('.theme__btn--blue');
const btnThemeWhite = document.querySelector('.theme__btn--white');

const textAttemptFail = document.querySelector('.text__attempt--fail');
const textAttemptRight = document.querySelector('.text__attempt--right');


const hider = document.querySelector('.pre-start');
const lastChoice = document.querySelector('.last__choice');

const listLetters = document.querySelector('.letters__list');
const pointLetter = document.querySelector('.point');
const wrapperDrag = document.querySelector('.level-drag');


clearScore.addEventListener('click', () => {
    localStorage.clear();
    updateScore();

});


btnThemeRed.addEventListener('click', () => {
    btnThemeWhite.classList.remove("selected");
    btnThemeBlue.classList.remove("selected");
    btnThemeRed.classList.add("selected");
    document.body.classList = "";
    document.body.classList.toggle("red");

});
btnThemeBlue.addEventListener('click', () => {
    btnThemeWhite.classList.remove("selected");
    btnThemeBlue.classList.add("selected");
    btnThemeRed.classList.remove("selected");
    document.body.classList = "";
    document.body.classList.toggle("blue");

});
btnThemeWhite.addEventListener('click', () => {
    btnThemeWhite.classList.add("selected");
    btnThemeBlue.classList.remove("selected");
    btnThemeRed.classList.remove("selected");
    document.body.classList = "";
    document.body.classList.toggle("white");

});


let updateScore = function () {
    listScore.innerHTML = "";
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let listScoreItem = document.createElement('li');
        listScoreItem.innerHTML = `Игрок ${key} набрал ${localStorage.getItem(key)}`;
        listScore.append(listScoreItem);
    }

}



let START_TIME = 30;
let LIVES = 3;
let N = 4;




const arrImages = ["bike", "bus", "cat", "dog", "rainbow", "snake", "sun", "grape", "tree", "rose", "notebook", "star"];

const dictImages = {
    "bike": "велосипед",
    "bus": "автобус",
    "cat": "кошка",
    "dog": "собака",
    "rainbow": "радуга",
    "snake": "змея",
    "sun": "солнце",
    "grape": "виноград",
    "tree": "елка",
    "rose": "роза",
    "notebook": "ноутбук",
    "star": "звезда"
};

const arrWords = ["радуга", "собака", "кошка", "орфография", "иллюстрация", "огниво", "облако", "снегурочка"];
const stringLetters = "абвгдежзийклмнопрстуфхцч";


let randomItem;
let randomLetterIndex;
let tempArr;

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

let isCorrect = function (name, k, letter) {
    if (name.length < k) {
        return false;
    }
    return (k - 1) == name.indexOf(letter);


};

let setAnimationMove = function () {
    const imgBlocks = document.querySelectorAll('.img-block');
    for (let index = 0; index < imgBlocks.length; index++) {
        imgBlocks[index].classList.add("move" + (Math.floor(Math.random() * 4) + 1));

    }

}

let randomChoice = function (array, count) {
    const randomItem = array[Math.floor(Math.random() * count)];
    const randomWord = dictImages[randomItem];
    const k = Math.floor(Math.random() * randomWord.length);
    const letter = randomWord[k];
    N = 0;

    for (let index = 0; index < array.length; index++) {
        if (isCorrect(dictImages[array[index]], k + 1, letter)) {
            N++;
        }


    }
    return [k + 1, letter];


};

let funcKey = function (e) {
    console.log(e);
    if (randomItem[randomLetterIndex] == e.key) {
        console.log(2222);
        N--;
        randomItem = arrWords[Math.floor(Math.random() * arrWords.length)];
        randomLetterIndex = Math.floor(Math.random() * randomItem.length);
        tempArr = randomItem.split('');
        let letterRed = document.createElement('span');
        letterRed.innerHTML = '#';
        letterRed.setAttribute("class", 'red-letter');
        //tempArr[randomLetterIndex] = '#';
        lvlSpecialWord.innerHTML = tempArr.slice(0, randomLetterIndex).join('') + letterRed.outerHTML + tempArr.slice(randomLetterIndex + 1).join('');
        localStorage.setItem(authName.value, Number(localStorage.getItem(authName.value)) + 10);
        // lvlSpecialWord.innerHTML = tempArr.join('');
        drawScore(localStorage.getItem(authName.value));
        formTask.innerHTML = `Введите пропущенную в слове букву, нажав на нужную клавишу (Осталось слов: ${N})`;
        checkGameOver(LIVES);
        animationAttempt(textAttemptRight, N, "right");
    }
    else {
        LIVES--;
        formLives.innerHTML = `Жизней: ${LIVES}`;
        checkGameOver(LIVES);
        animationAttempt(textAttemptFail, LIVES, "fail");
    }
}



let randomChoiceWord = function (array) {
    randomItem = array[Math.floor(Math.random() * arrWords.length)];
    randomLetterIndex = Math.floor(Math.random() * randomItem.length);
    tempArr = randomItem.split('');
    let letterRed = document.createElement('span');
    letterRed.innerHTML = '#';
    letterRed.setAttribute("class", 'red-letter');
    //tempArr[randomLetterIndex] = '#';
    lvlSpecialWord.innerHTML = tempArr.slice(0, randomLetterIndex).join('') + letterRed.outerHTML + tempArr.slice(randomLetterIndex + 1).join('');
    //console.log(letterRed.outerHTML);
    document.addEventListener('keydown', funcKey, true);


};

let randomLetter = function (str) {

    listLetters.innerHTML = "";
    tempArr = stringLetters.split('');
    tempArr = shuffle(tempArr).slice(0, 5);
    randomLetterIndex = Math.floor(Math.random() * tempArr.length);
    //pointLetter.innerHTML = tempArr[randomLetterIndex];
    formTask.innerHTML = `Перетащите в квадрат букву ${tempArr[randomLetterIndex]}  (Осталось букв: ${N})`;

    const boxAnswer = document.querySelector('.answer');

    for (let index = 0; index < tempArr.length; index++) {
        let letterLi = document.createElement('li');
        letterLi.innerHTML = tempArr[index];
        letterLi.setAttribute("class", 'list__letter');
        letterLi.onmousedown = function (event) { // (1) отследить нажатие

            // (2) подготовить к перемещению:
            // разместить поверх остального содержимого и в абсолютных координатах
            letterLi.style.position = 'absolute';
            letterLi.style.zIndex = 1000;


            moveAt(event.pageX, event.pageY);

            // передвинуть букву под координаты курсора
            // и сдвинуть на половину ширины/высоты для центрирования
            function moveAt(pageX, pageY) {
                letterLi.style.left = pageX - letterLi.offsetWidth / 2 + 'px';
                letterLi.style.top = pageY - letterLi.offsetHeight / 2 + 'px';

                console.log(boxAnswer.getBoundingClientRect().top);
                console.log(letterLi.getBoundingClientRect().top);

            }

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            // (3) перемещать по экрану
            document.addEventListener('mousemove', onMouseMove);

            // (4) положить букву, удалить более ненужные обработчики событий
            letterLi.onmouseup = function () {
                document.removeEventListener('mousemove', onMouseMove);
                letterLi.onmouseup = null;

                let coordBox = boxAnswer.getBoundingClientRect();
                let coordLetter = letterLi.getBoundingClientRect();
                if (coordBox.top < coordLetter.top &&
                    coordBox.bottom > coordLetter.bottom &&
                    coordBox.left < coordLetter.left &&
                    coordBox.right > coordLetter.right
                ) {

                    if (tempArr[randomLetterIndex] == letterLi.innerText) {
                        N--;
                        formTask.innerHTML = `Введите пропущенную в слове букву (Осталось слов: ${N})`;
                        animationAttempt(textAttemptRight, N, "right");
                        localStorage.setItem(authName.value, Number(localStorage.getItem(authName.value)) + 10);
                        drawScore(localStorage.getItem(authName.value));

                    } else {


                        LIVES--;
                        formLives.innerHTML = `Жизней: ${LIVES}`;
                        animationAttempt(textAttemptFail, LIVES, "fail");
                    }
                    checkGameOver(LIVES);

                    letterLi.remove();
                    tempArr.splice(tempArr.indexOf(letterLi.innerText), 1);
                    randomLetterIndex = Math.floor(Math.random() * tempArr.length);
                    //pointLetter.innerHTML = tempArr[randomLetterIndex];
                    formTask.innerHTML = `Перетащите в квадрат букву ${tempArr[randomLetterIndex]}  (Осталось букв: ${N})`;




                }

            };

        };
        listLetters.append(letterLi);

    }



}

let animationAttempt = function (textForm, parameter, className) {

    if (parameter > 0) {
        textForm.classList.add(className);
        setTimeout(() => {
            textForm.classList.remove(className);
        }, 700);
    }

}





let createImages = function (count = 5) {
    lvl1Images = document.querySelector('.level-1__images');
    lvl1Images.innerHTML = "";
    let currentArrImages = [].concat(arrImages);
    console.log(currentArrImages);
    currentArrImages = shuffle(currentArrImages).slice(0, count);
    console.log(currentArrImages);
    const arrLetter = randomChoice(currentArrImages, count);
    console.log(arrLetter);
    formTask.innerHTML = `Найти ${N} предметов, в которых ${arrLetter[0]}-я буква ${arrLetter[1]}`;
    formLives.innerHTML = `Жизней: ${LIVES}`;


    for (let index = 0; index < count; index++) {
        let img = document.createElement('img');
        img.setAttribute("src", './img/' + currentArrImages[index] + ".jpg");
        img.setAttribute("name", dictImages[currentArrImages[index]]);
        img.setAttribute("class", 'img-block');
        img.addEventListener('click', () => {
            console.log(img.name);
            if (isCorrect(img.name, arrLetter[0], arrLetter[1])) {
                localStorage.setItem(authName.value, Number(localStorage.getItem(authName.value)) + 10);
                img.classList.toggle("hidden");
                console.log(localStorage.getItem(authName.value));
                drawScore(localStorage.getItem(authName.value));
                N--;
                formTask.innerHTML = `Найти ${N} предметов, в которых ${arrLetter[0]}-я буква ${arrLetter[1]}`;
                checkGameOver(LIVES);
                animationAttempt(textAttemptRight, N, "right");

            }
            else {

                LIVES--;
                formLives.innerHTML = `Жизней: ${LIVES}`;
                checkGameOver(LIVES);

                animationAttempt(textAttemptFail, LIVES, "fail");

            }
            lastChoice.innerHTML = "Последнее выбранное слово:" + img.name;


        });
        lvl1Images.append(img);

    }

};



let drawScore = function (score) {
    formScrore.innerHTML = `Счет: ${score} очков`;
    console.log(formScrore);
};




let startLevel = function (level) {

    document.onkeydown = null;
    lastChoice.innerHTML = "";
    N = 3;
    if (level == 4) {
        START_TIME = 15;
        LIVES = 3;
        randomLetter(stringLetters);
        formHeading.innerHTML = "Уровень 4";
        formLives.innerHTML = `Жизней: ${LIVES}`;
        lvl1Images.classList.add('hidden');
        lvlSpecialWord.classList.add('hidden');
        wrapperDrag.classList.remove('hidden');
    }
    else if (level == 3) {
        START_TIME = 15;
        LIVES = 3;
        randomChoiceWord(arrWords);
        formHeading.innerHTML = "Уровень 3 ";
        formTask.innerHTML = `Введите пропущенную в слове букву, нажав на нужную клавишу (Осталось слов: ${N})`;
        formLives.innerHTML = `Жизней: ${LIVES}`;
        lvl1Images.classList.add('hidden');
        lvlSpecialWord.classList.remove('hidden');
        wrapperDrag.classList.add('hidden');

    } else {
        lvl1Images.classList.remove('hidden');
        lvlSpecialWord.classList.add('hidden');
        wrapperDrag.classList.add('hidden');

        if (level == 1) {

            formHeading.innerHTML = "Уровень 1";
            START_TIME = 30;
            LIVES = 3;
        } else if (level == 2) {
            formHeading.innerHTML = "Уровень 2";
            START_TIME = 15;
            LIVES = 2;

            console.log(lvl1Images.classList);
        }



        createImages();
        if (level == 2) {
            setAnimationMove();
        }
    }
    formTime.innerHTML = `Время: ${START_TIME}`;
    drawScore(Number(localStorage.getItem(authName.value)));
    hider.classList.add("hider");
    setTimeout(() => {
        hider.classList.remove("hider");
        loop();
    }, 1500);


};

let checkGameOver = function (lives) {

    if (N == 0) {
        wrapperLvl1.classList.add('hidden');
        wrapperGameOver.classList.remove('hidden');
        headingGameWin.classList.remove('hidden');
        headingGameFail.classList.add('hidden');
        return true;
    } else if (START_TIME < 0 || lives <= 0) {
        wrapperLvl1.classList.add('hidden');
        wrapperGameOver.classList.remove('hidden');
        headingGameFail.classList.remove('hidden');
        headingGameWin.classList.add('hidden');
        localStorage.setItem(authName.value, Number(localStorage.getItem(authName.value)) - 100);
        return true;
    }
    return false;
};

let loop = function () {
    console.log(START_TIME, LIVES, N);
    formTime.innerHTML = `Время: ${START_TIME}`;
    START_TIME--;
    console.log(START_TIME);
    if (checkGameOver(LIVES)) {
        return;
    }
    setTimeout(loop, 1000);
};



btnLogin.addEventListener('click', () => {
    console.log();
    localStorage.setItem(authName.value, (localStorage.getItem(authName.value)) ? (localStorage.getItem(authName.value)) : '0');
    console.log(localStorage.getItem(authName.value));
    wrapperAuth.classList.toggle('hidden');
    wrapperMenu.classList.toggle('hidden');
    updateScore();
});

btnGameOver.addEventListener('click', () => {
    wrapperGameOver.classList.toggle('hidden');
    updateScore();
    wrapperMenu.classList.toggle('hidden');
});

for (let index = 0; index < menuListItemBtns.length; index++) {

    menuListItemBtns[index].addEventListener('click', () => {
        switch (menuListItemBtns[index].value) {
            case 'Уровень 1':
                wrapperLvl1.classList.toggle('hidden');
                wrapperMenu.classList.toggle('hidden');
                startLevel(1);


                break;
            case 'Уровень 2':
                wrapperLvl1.classList.toggle('hidden');
                wrapperMenu.classList.toggle('hidden');
                startLevel(2);


                break;
            case 'Уровень 3':
                wrapperLvl1.classList.toggle('hidden');
                wrapperMenu.classList.toggle('hidden');
                startLevel(3);
                break;
            case 'Уровень 4':
                wrapperLvl1.classList.toggle('hidden');
                wrapperMenu.classList.toggle('hidden');
                startLevel(4);
                break;
            default:
                break;
        }

    });
}


