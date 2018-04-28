import Style from '../display/Style.js';
import Vector from '../core/Vector.js';

export default class Ball {
	constructor (options) {
		// x, y, r, speed, canvas, style
		this.r = options.radius;

		this.velocity = new Vector(10, 0);

		this.position = new Vector(options.x, options.y);

		this.mass = .5; //kg
		this.restitution = -0.9;

		this.canvas = options.canvas;
		this.style = new Style(options.style, this.canvas);
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