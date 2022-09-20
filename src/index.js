/* eslint-disable prettier/prettier */
import { cards } from './cards.js';

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

const fillGameFieldShirt = (difficult) => {
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
                alert('Вы победили!');
                setTimeout(() => {
                    location.href = 'index.html';
                }, 1000);
            } else if (cardOne && cardTwo) {
                alert('Вы проиграли!');
                setTimeout(() => {
                    location.href = 'index.html';
                }, 1000);
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
            const newGame = document.querySelector('.new-game');
            newGame.addEventListener('click', () => {
                location.href = 'index.html';
            });

            fillGameFieldCardsOpen(difficultChoice);
            setTimeout(() => {
                fillGameFieldShirt(difficultChoice);
            }, 5000);
        };
    }
});
