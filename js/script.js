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

let lvl1Images = document.querySelector('.level-1__images');
const lvlSpecialWord = document.querySelector('.level-special__word');


const btnThemeRed = document.querySelector('.theme__btn--red');
const btnThemeBlue = document.querySelector('.theme__btn--blue');
const btnThemeWhite = document.querySelector('.theme__btn--white');

btnThemeRed.addEventListener('click', () => {
    document.body.classList = "";
    document.body.classList.toggle("red");
});
btnThemeBlue.addEventListener('click', () => {
    document.body.classList = "";
    document.body.classList.toggle("blue");
});
btnThemeWhite.addEventListener('click', () => {
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




const arrImages = ["bike", "bus", "cat", "dog", "rainbow", "stoun", "sun"];

const dictImages = {
    "bike": "велосипед",
    "bus": "автобус",
    "cat": "кошка",
    "dog": "собака",
    "rainbow": "радуга",
    "stoun": "камень",
    "sun": "солнце"
};

const arrWords = ["радуга", "собака", "кошка", "орфография", "иллюстрация", "огниво", "облако", "снегурочка"];

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
        tempArr[randomLetterIndex] = '#';
        localStorage.setItem(authName.value, Number(localStorage.getItem(authName.value)) + 10);
        lvlSpecialWord.innerHTML = tempArr.join('');
        drawScore(localStorage.getItem(authName.value));
        formTask.innerHTML = `Введите пропущенную в слове букву (Осталось слов: ${N})`;
        checkGameOver(LIVES);
    }
    else {
        LIVES--;
        formLives.innerHTML = `Жизней: ${LIVES}`;
        checkGameOver(LIVES);
    }
}



let randomChoiceWord = function (array) {
    randomItem = array[Math.floor(Math.random() * arrWords.length)];
    randomLetterIndex = Math.floor(Math.random() * randomItem.length);
    tempArr = randomItem.split('');
    tempArr[randomLetterIndex] = '#';
    lvlSpecialWord.innerHTML = tempArr.join('');
    console.log(randomLetterIndex, randomItem);
    document.addEventListener('keydown', funcKey, true);


};





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
    //let LIVES = 3;
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
            }
            else {
                LIVES--;
                formLives.innerHTML = `Жизней: ${LIVES}`;
                checkGameOver(LIVES);

            }


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
    N = 3;
    if (level == 3) {
        START_TIME = 15;
        LIVES = 3;
        randomChoiceWord(arrWords);
        formHeading.innerHTML = "Уровень 3 (Специальный)";
        formTask.innerHTML = `Введите пропущенную в слове букву (Осталось слов: ${N})`;
        formLives.innerHTML = `Жизней: ${LIVES}`;
        lvl1Images.classList.add('hidden');
        lvlSpecialWord.classList.remove('hidden');

    } else {
        lvl1Images.classList.remove('hidden');
        lvlSpecialWord.classList.add('hidden');

        if (level == 1) {
            formHeading.innerHTML = "Уровень 1";
            START_TIME = 30;
            LIVES = 3;
        } else if (level == 2) {
            formHeading.innerHTML = "Уровень 2";
            START_TIME = 15;
            LIVES = 2;
        }



        createImages();
    }
    formTime.innerHTML = `Время: ${START_TIME}`;
    drawScore(localStorage.getItem(authName.value));
    setTimeout(loop, 1500);
    console.log(11111);
    //loop();


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
            case 'Уровень 3 (Специальный)':
                wrapperLvl1.classList.toggle('hidden');
                wrapperMenu.classList.toggle('hidden');
                startLevel(3);
                break;
            default:
                break;
        }

    });
}


