import Style from '../display/Style.js';
import Vector from '../core/Vector.js';

export default class Ball {
	constructor (options) {
		this.r = options.radius;

		this.position = new Vector(options.x, options.y);

		this.velocity = new Vector(options.vx || 10, options.vy || 1);

		this.mass = options.mass || .5; //kg
		this.restitution = options.restitution || -0.9; // bounce

		// coefficient of friction with another surface with COF = 1?
		this.surfaceFriction = options.friction || 0.01; //0.55;
		this.airFriction = 0.1;

		this.canvas = options.canvas;
		this.style = new Style(options.style, this.canvas);
	}

	update (time, gravity) {


		const friction = this.friction;
		const ax = 1 - (time * friction); // goal is 0.98 - 0.99
		const ay = 1.1; //1 - (time * gravity);

		this.velocity.x *= ax;

		//this.velocity.y *= ay;

		// this.velocity.mult({
		// 	x: ax,
		// 	y: ay
		// });

		// this.velocity.add({
		// 	x: this.acceleration.x * time * friction,
		// 	y: this.acceleration.y * time + gravity

		this.position.add({
			x: this.velocity.x,
			y: this.velocity.y
		});

		console.log('x', (this.position.x - this.position.lastX).toFixed(2), '\n    ', ax, this.velocity.x);
		// console.log('y', (this.position.y - this.position.lastY).toFixed(2), '\n    ', ay, this.velocity.y);
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