/* eslint-disable no-unused-vars */
import { cards } from './cards.js';
// import '../style.css';

const difficultWrapItem = document.querySelectorAll('.difficult-wrap__item');
const start = document.querySelector('.start');

let difficultChoice;
difficultWrapItem.forEach((el) => {
    el.addEventListener('click', (event) => {
        const target = event.target;
        difficultWrapItem.forEach((elem) => {
            elem.classList.remove('selected');
        });
        target.classList.add('selected');
        difficultChoice = Number(target.textContent);
        console.log(difficultChoice);
    });
});

// eslint-disable-next-line no-unused-vars

const fillGameFieldShirt = (difficult) => {
    const timeSec = document.querySelector('.time-sec');
    const timeMin = document.querySelector('.time-min');
    let minutes = 0;
    let seconds = 0;
    const timerFunc = () => {
        seconds += 1;
        if (seconds < 10) {
            timeSec.textContent = '0' + seconds;
        } else if (seconds < 60) {
            timeSec.textContent = seconds;
        } else {
            seconds -= 60;
            timeSec.textContent = '0' + seconds;
            minutes += 1;
            if (minutes < 10) {
                timeMin.textContent = '0' + minutes;
            } else {
                timeMin.textContent = minutes;
            }
        }
        console.log(seconds);
    };
    const globalTimer = setInterval(timerFunc, 1000);
    const cardsWrap = document.querySelector('.cards-wrap');
    cardsWrap.innerHTML = '';
    let cardAmount = difficult * 6;

    while (cardAmount !== 0) {
        const cardShirt = document.createElement('img');
        cardShirt.classList.add('card-shirt');
        cardShirt.setAttribute('src', 'img/card-shirt.png');
        cardsWrap.append(cardShirt);
        cardAmount--;
    }

    const cardsShirt = document.querySelectorAll('.card-shirt');

    let cardOne;
    let cardTwo;
    const gameOverBackground = document.querySelector('.game-over-background');
    cardsShirt.forEach((card) => {
        card.addEventListener('click', (event) => {
            const target = event.target;
            const cardIndex = Array.from(cardsShirt).indexOf(target);
            target.setAttribute('src', cardsFinal[cardIndex]);
            if (!cardOne) {
                cardOne = cardsFinal[cardIndex];
            } else {
                cardTwo = cardsFinal[cardIndex];
            }
            if (cardOne === cardTwo) {
                clearInterval(globalTimer);

                setTimeout(() => {
                    //Отсюда извлекаем время
                    const time = document.querySelector('.time');
                    //Сюда вставляем
                    const timeAmount = document.querySelector('.time-amount');
                    timeAmount.textContent = time.textContent;
                    gameOverBackground.style.display = 'flex';
                }, 1200);
            } else if (cardOne && cardTwo) {
                clearInterval(globalTimer);

                setTimeout(() => {
                    //Отсюда извлекаем время
                    const time = document.querySelector('.time');
                    //Сюда вставляем
                    const timeAmount = document.querySelector('.time-amount');
                    const gameOverHeader =
                        document.querySelector('.game-over-header');
                    gameOverHeader.textContent = 'Вы проиграли!';

                    const gameOverImg =
                        document.querySelector('.game-over-img');
                    gameOverImg.setAttribute('src', 'img/lose.png');

                    timeAmount.textContent = time.textContent;
                    gameOverBackground.style.display = 'flex';
                }, 1200);
            }
        });
    });
};

let cardsFinal;
const fillGameFieldCardsOpen = (difficult) => {
    const randomCards = cards.sort(() => Math.random() - 0.5);
    const cardsForGame = randomCards.slice(0, difficult * 3);
    const cardsForGameX2 = [];
    for (let card of cardsForGame) {
        cardsForGameX2.push(card);
        cardsForGameX2.push(card);
    }
    cardsFinal = cardsForGameX2.sort(() => Math.random() - 0.5);

    const cardsWrap = document.querySelector('.cards-wrap');
    for (let card of cardsFinal) {
        const cardOpen = document.createElement('img');
        cardOpen.classList.add('card-open');
        cardOpen.setAttribute('src', card);
        cardsWrap.append(cardOpen);
    }
};

start.addEventListener('click', () => {
    if (difficultChoice) {
        const request = new XMLHttpRequest();
        request.responseType = 'json';
        request.open('GET', './src/game-field.json');
        request.send();

        request.onload = () => {
            document.body.innerHTML = request.response.body;
            const newGame = document.querySelectorAll('.new-game');
            newGame.forEach((el) => {
                el.addEventListener('click', () => {
                    location.href = 'index.html';
                });
            });

            fillGameFieldCardsOpen(difficultChoice);
            setTimeout(() => {
                fillGameFieldShirt(difficultChoice);
            }, 1000);
        };
    }
});
