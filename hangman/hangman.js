// get data from any API call
const getData = async (server) => {
    const fetchInitGET = {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
    };
    const response = await fetch(server, fetchInitGET);
    // console.log(response.status)
    if (response.status != 200) {
        throw new Error("couldn't fetch data!");
    }
    const data = await response.json();
    if (!localStorage.hangman) localStorage.setItem('hangman', data); // if the localStorage contains unused words, it's not replace to new one
    console.log(localStorage);
};

// get 5 random words from an API
getData('https://random-word-api.vercel.app/api?words=5');

const inputsContainer = document.getElementById('inputs');
const zombieMeterContainer = document.getElementById('zombie-meter');
let zombieImg = document.getElementById('zombie-img');
console.log(zombieImg);
let zombieMeter = 0;

let randWord;
let randWordArray = [];

// generates a random word and renders the divs
async function randomWords() {
    try {
        const response = await fetch(
            'https://random-word-api.vercel.app/api?words=5'
        );
        const words = await response.json();
        randWord =
            words[Math.floor(Math.random() * words.length)].toUpperCase();
        randWordArray = [...randWord];
        console.log(randWord);

        randWordArray.forEach((letter) => {
            const letterDiv = document.createElement('div');
            letterDiv.classList.add('letter-div');
            letterDiv.textContent = '';
            letterDiv.setAttribute('data-code', `${letter.toUpperCase()}`);
            inputsContainer.append(letterDiv);
        });
    } catch (error) {
        console.log(error);
    }
}
randomWords();

// find a letter in the random word
function findChar(pressedButton, key) {
    const divs = document.querySelectorAll('.letter-div');

    if (randWord.includes(pressedButton)) {
        for (let i in randWordArray) {
            if (randWordArray[i] === pressedButton) {
                divs[i].innerHTML = pressedButton;

                if (key.classList.contains('found')) {
                    console.log('Ezt a betűt már kérted, válassz újat!'); // dupla betűnél még hibás
                } else {
                    key.classList.add('found'); // ELTALÁLTA A BETŰT / Dóri, ide is jöhet egy üzike
                }
            }
        }
    } else if (key.classList.contains('not-found')) {
        console.log('Ezt a betűt már kérted, válassz újat!'); // dupla betűnél még hibás
    } else {
        key.classList.add('not-found');
        zombieMeter++;
        zombieMeterContainer.innerHTML = zombieMeter;
        zombieImg.innerHTML = '';
        zombieImg.innerHTML = `<img src="images/state${zombieMeter}.svg" alt="zombie">`;

        /*     if (zombieMeter == 5) {
            gameOver()
        } */
        //ide fognak jönni Esztinek, Dórinak és Misinek a függvényei
    }
}

// button click event
const keysContainer = document.getElementById('keys-container');

keysContainer.addEventListener('click', (event) => {
    const isButton = event.target.nodeName === 'BUTTON';
    if (!isButton) {
        return;
    }
    const pressedButton = event.target.dataset.code;

    findChar(pressedButton, event.target);
});

const keys = document.querySelectorAll('.key');

// key press down event
const keyPressDown = (event) => {
    keys.forEach((key) => {
        if (key.dataset.code == event.key.toUpperCase()) {
            const pressedKey = event.key.toUpperCase();
            findChar(pressedKey, key);
        } else {
            return;
        }
    });
};

window.addEventListener('keydown', keyPressDown);

// game over
