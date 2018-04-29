import Vector from './core/Vector.js';

const drag = 10.47 * -0.5;  // coefficient of drag - Dimensionless
const environment = 1.22; // kg / m^3 - density of the fluid the sprite is in
const gravity = 9.81;  // m / s^2 - gravity

export default class Physics {
	constructor (width, height) {
		this.width = width;
		this.height = height;
		this.sprites = [];
	}

	addSprite (sprite) {
		this.sprites.push(sprite);
	}

	render (time) {
		this.sprites.forEach((sprite) => {

			const width = this.width;
			const height = this.height;
			const frameRate = 1/60; // Seconds - 0.01666
			const ball = sprite;

			let forceX = drag * ball.area * environment * Math.pow(ball.velocity.x, 3) / Math.abs(ball.velocity.x);
			let forceY = drag * ball.area * environment * Math.pow(ball.velocity.y, 3) / Math.abs(ball.velocity.y);

			let force = new Vector(
				drag * ball.area * environment * Math.pow(ball.velocity.x, 3) / Math.abs(ball.velocity.x),
				drag * ball.area * environment * Math.pow(ball.velocity.y, 3) / Math.abs(ball.velocity.y)
			);

			let acceleration = new Vector(
				force.x / ball.mass * frameRate,
				(gravity + (force.y / ball.mass)) * frameRate
			);

			ball.velocity.add(acceleration);

			ball.velocity.mult(frameRate * 63 );

			// add friction

			ball.position.add(ball.velocity);

			if (ball.position.y > height - ball.radius) {
				ball.velocity.y *= ball.restitution;
				ball.position.y = height - ball.radius;
			}

			if (ball.position.x > width - ball.radius) {
				ball.velocity.x *= ball.restitution;
				ball.position.x = width - ball.radius;
			}

			if (ball.position.x < ball.radius) {
				ball.velocity.x *= ball.restitution;
				ball.position.x = ball.radius;
			}

			// console.log(ball.position.x);
			//
			// console.log('', ball.position.y);
		});
	}
}
