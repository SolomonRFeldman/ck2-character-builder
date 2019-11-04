import Character from './models/Character.js';

const mainBody = document.querySelector("main");

const character = new Character;
mainBody.append(character.buildCard());