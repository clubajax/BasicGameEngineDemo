import Canvas from './display/Canvas.js';
// import { pause, play, register } from './loop.js';
import Loop from './core/Loop.js';
import Physics from './core/Physics.js';
import Renderer from './core/Renderer.js';
import Ball from './sprites/Ball.js';

const width = 500;
const height = 400;
const frameRate = .1;

const canvas = new Canvas(width, height);
const physics = new Physics({ width, height, frameRate });
const renderer = new Renderer(canvas);
const loop = new Loop({
	frameRate,
	frameDelay: 1.0 // less is faster
});

function add (sprite) {
	physics.addSprite(sprite);
	renderer.addSprite(sprite);
}

loop.register(physics);
loop.register(renderer);

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

loop.play();
setTimeout(() => {
	loop.pause();
}, 3500);

document.body.addEventListener('click', loop.pause);
