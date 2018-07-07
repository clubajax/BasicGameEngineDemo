import Canvas from './display/Canvas.js';
import { pause, play, register } from './loop.js';
import Loop from './core/Loop.js';
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

// add(new Ball({
// 	x: 100,
// 	y: 200,
// 	radius: 20,
// 	mass: .45,
// 	restitution: -0.8,
// 	friction: 0.95,
// 	canvas,
// 	style: {}
// }));

add(new Ball({
	x: 50,
	y: 50,
	radius: 15,
	mass: 0.5,
	restitution: -0.75,
	// friction: 0.96,
	canvas,
	style: {}
}));

play();
setTimeout(() => {
	pause();
}, 7000);

document.body.addEventListener('click', pause);
