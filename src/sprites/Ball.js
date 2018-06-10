import Style from '../display/Style.js';
import Vector from '../core/Vector.js';

export default class Ball {
	constructor (options) {
		this.r = options.radius;

		this.position = new Vector(options.x, options.y);

		this.velocity = new Vector(options.vx || 1, options.vy || 0);

		this.acceleration = new Vector(options.ax || 0, options.ay || 0);

		this.mass = options.mass || .5; //kg
		this.restitution = options.restitution || -0.9; // bounce

		// coefficient of friction with another surface with COF = 1?
		this.surfaceFriction = options.friction || 0.55;
		this.airFriction = 0.95;

		this.canvas = options.canvas;
		this.style = new Style(options.style, this.canvas);
	}

	update (T, G) {
		this.velocity.add({
			x: this.acceleration.x * T * this.friction,
			y: this.acceleration.y * T + G
		});

		this.position.add({
			x: this.velocity.x,
			y: this.velocity.y
		});

		// console.log('x', this.friction, this.position.x - this.position.lastX);
		console.log('', this.velocity.x, this.acceleration.x);
	}

	get friction () {
		// console.log('f', Math.round(this.position.y) === Math.round(this.position.lastY));
		if (Math.round(this.position._y) === Math.round(this.position.lastY)) {
			return this.surfaceFriction;
		}
		return this.airFriction;
	}

	get radius () {
		return this.r;
	}

	render () {
		this.style.start();
		this.canvas.circle(this.position.x, this.position.y, this.r);
		this.style.end();
	}

	get area () {
		return Math.PI * this.r * this.r / (10000);
	}
}