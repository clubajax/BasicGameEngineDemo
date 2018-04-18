import createCanvas from './createCanvas.js';
import { pause, play, register } from './loop.js';
import Physics from './Physics.js';
import Renderer from './Renderer.js'

import Ball from './sprites/Ball.js';

const width = 500;
const height = 400;

const canvas = createCanvas(width, height);

const physics = new Physics();
const renderer = new Renderer(canvas);

function add (sprite) {
	physics.addSprite(sprite);
	renderer.addSprite(sprite);
}

register(physics);
register(renderer);

add(new Ball(width/2, 11, 20, 10, canvas, {}));

play();
setTimeout(() => {
	pause();
}, 500);
