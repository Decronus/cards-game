/* eslint-disable no-unused-vars */
import { cards } from '../public/cards.js';
import '../style.css';
import '/public/game-field.json';

const difficultWrapItem: NodeListOf<Element> = document.querySelectorAll(
    '.difficult-wrap__item'
);
const start = <HTMLElement>document.querySelector('.start');

let difficultChoice: number;
difficultWrapItem.forEach((el) => {
    el.addEventListener('click', (event) => {
        const target = <HTMLElement>event.target;
        difficultWrapItem.forEach((elem) => {
            elem.classList.remove('selected');
        });
        target.classList.add('selected');
        difficultChoice = Number(target.textContent);
        console.log(difficultChoice);
    });
});

const fillGameFieldShirt = (difficult: number) => {
    const timeSec = <HTMLElement>document.querySelector('.time-sec');
    const timeMin = <HTMLElement>document.querySelector('.time-min');
    let minutes = 0;
    let seconds = 0;
    const timerFunc = () => {
        seconds += 1;
        if (seconds < 10) {
            timeSec.textContent = '0' + seconds;
        } else if (seconds < 60) {
            timeSec.textContent = String(seconds);
        } else {
            seconds -= 60;
            timeSec.textContent = '0' + seconds;
            minutes += 1;
            if (minutes < 10) {
                timeMin.textContent = '0' + minutes;
            } else {
                timeMin.textContent = String(minutes);
            }
        }
        console.log(seconds);
    };
    const globalTimer = setInterval(timerFunc, 1000);
    const cardsWrap = <HTMLScriptElement>document.querySelector('.cards-wrap');
    cardsWrap.innerHTML = '';
    let cardAmount: number = difficult * 6;

    while (cardAmount !== 0) {
        const cardShirt = document.createElement('img');
        cardShirt.classList.add('card-shirt');
        cardShirt.setAttribute('src', 'img/card-shirt.png');
        cardsWrap.append(cardShirt);
        cardAmount--;
    }

    const cardsShirt: NodeListOf<Element> =
        document.querySelectorAll('.card-shirt');

    let cardOne: string;
    let cardTwo: string;
    const gameOverBackground = <HTMLElement>(
        document.querySelector('.game-over-background')
    );
    cardsShirt.forEach((card) => {
        card.addEventListener('click', (event) => {
            const target = <HTMLElement>event.target;
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
                    const time = <HTMLElement>document.querySelector('.time');
                    //Сюда вставляем
                    const timeAmount = <HTMLElement>(
                        document.querySelector('.time-amount')
                    );
                    timeAmount.textContent = time.textContent;
                    gameOverBackground.style.display = 'flex';
                }, 1200);
            } else if (cardOne && cardTwo) {
                clearInterval(globalTimer);

                setTimeout(() => {
                    //Отсюда извлекаем время
                    const time = <HTMLElement>document.querySelector('.time');
                    //Сюда вставляем
                    const timeAmount = <HTMLElement>(
                        document.querySelector('.time-amount')
                    );
                    const gameOverHeader = <HTMLElement>(
                        document.querySelector('.game-over-header')
                    );
                    gameOverHeader.textContent = 'Вы проиграли!';

                    const gameOverImg = <HTMLElement>(
                        document.querySelector('.game-over-img')
                    );
                    gameOverImg.setAttribute('src', 'img/lose.png');

                    timeAmount.textContent = time.textContent;
                    gameOverBackground.style.display = 'flex';
                }, 1200);
            }
        });
    });
};

let cardsFinal: string[];
const fillGameFieldCardsOpen = (difficult: number) => {
    const randomCards = cards.sort(() => Math.random() - 0.5);
    const cardsForGame = randomCards.slice(0, difficult * 3);
    const cardsForGameX2 = [];
    for (let card of cardsForGame) {
        cardsForGameX2.push(card);
        cardsForGameX2.push(card);
    }
    cardsFinal = cardsForGameX2.sort(() => Math.random() - 0.5);

    const cardsWrap = <HTMLElement>document.querySelector('.cards-wrap');
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
        request.open('GET', '/game-field.json');
        request.send();

        request.onload = () => {
            document.body.innerHTML = request.response.body;
            const newGame: NodeListOf<Element> =
                document.querySelectorAll('.new-game');
            newGame.forEach((el) => {
                el.addEventListener('click', () => {
                    location.href = 'index.html';
                });
            });

            fillGameFieldCardsOpen(difficultChoice);
            setTimeout(() => {
                fillGameFieldShirt(difficultChoice);
            }, 5000);
        };
    }
});
