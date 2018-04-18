import Style from './Style.js';

export default class Ball {
	constructor (x, y, r, speed, canvas, style) {
		this.x = x;
		this.y = y;
		this.r = r;

		this.ax = 2;
		this.ay = 0;

		this.vx_max = 1;

		this.vx = 0;
		this.vy = 0;

		this.mass = 1; //kg
		this.restitution = -0.7;

		this.canvas = canvas;
		this.style = new Style(style, canvas);
	}

	render () {
		this.style.start();
		this.canvas.circle(this.x, this.y, this.r);
		this.style.end();
	}

	get area () {
		return Math.PI * this.r * this.r / (10000);
	}
}