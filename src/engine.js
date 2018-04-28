import Canvas from './display/Canvas.js';
import { pause, play, register } from './loop.js';
import Physics from './Physics.js';
import Renderer from './Renderer.js';
import Ball from './sprites/Ball.js';

const width = 500;
const height = 400;

const canvas = new Canvas(width, height);

const physics = new Physics(width, height);
const renderer = new Renderer(canvas);

function add (sprite) {
	physics.addSprite(sprite);
	renderer.addSprite(sprite);
}

register(physics);
register(renderer);

add(new Ball({
	x: 100,
	y: 300,
	radius: 20,
	canvas,
	style: {}
}));
add(new Ball({
	x: 50,
	y: 50,
	radius: 15,
	canvas,
	style: {}
}));

play();
setTimeout(() => {
	pause();
}, 6000);
