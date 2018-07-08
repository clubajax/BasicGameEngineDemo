import Vector from './Vector.js';

const drag = 10.47 * -0.5;  // coefficient of drag - Dimensionless
const environment = 1.22; // kg / m^3 - density of the fluid the sprite is in
const gravity = 9.81;  // m / s^2 - gravity

export default class Physics {
	constructor (options) {
		this.width = options.width;
		this.height = options.height;
		this.frameRate = options.frameRate;
		this.sprites = [];
	}

	addSprite (sprite) {
		this.sprites.push(sprite);
	}

	render (time) {

		const width = this.width;
		const height = this.height;
		const frameRate = this.frameRate; //1/60; // Seconds - 0.01666

		// const T = 1/15;
		const G = 2 * frameRate;

		this.sprites.forEach((sprite) => {

			sprite.update(frameRate, G);

			if (sprite.position.y > height - sprite.radius) {
				sprite.velocity.y *= sprite.restitution;
				sprite.position.y = height - sprite.radius;
			}

			if (sprite.position.x > width - sprite.radius) {
				sprite.velocity.x *= sprite.restitution;
				sprite.position.x = width - sprite.radius;
			}

			if (sprite.position.x < sprite.radius) {
				sprite.velocity.x *= sprite.restitution;
				sprite.position.x = sprite.radius;
			}
		});
	}
}
