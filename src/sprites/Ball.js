import Style from '../display/Style.js';

export default class Ball {
	constructor (x, y, r, speed, canvas, style) {
		this.r = r;

		this.velocity = {
			x: 10,
			y: 0
		};

		this.position = {
			x,
			y
		};

		this.mass = .5; //kg
		this.restitution = -0.9;

		this.canvas = canvas;
		this.style = new Style(style, canvas);
	}

	get friction () {

	}

	get x () {
		return this.position.x;
	}

	get y () {
		return this.position.y;
	}

	get vx () {
		return this.velocity.x;
	}

	get vy () {
		return this.velocity.x;
	}

	get radius () {
		return this.r;
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