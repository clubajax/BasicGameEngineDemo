import createCanvas from './createCanvas.js';

const canvas = createCanvas(320, 240);

canvas.style({
	lineWidth: 3,
	strokeStyle: 'red',
	fillStyle: 'blue'
});
canvas.rect(10, 10, 50, 30);