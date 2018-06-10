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

		const width = this.width;
		const height = this.height;
		const frameRate = 1/60; // Seconds - 0.01666

		const T = 1/15;
		const G = 2 * T;

		this.sprites.forEach((sprite) => {

			sprite.update(T, G);
			// sprite.velocity.add({
			// 	x: sprite.acceleration.x * T,
			// 	y: sprite.acceleration.y * T + G
			// });
			//
			// sprite.position.add({
			// 	x: sprite.velocity.x,
			// 	y: sprite.velocity.y
			// });
			// entity.vx += entity.ax * elapsed + gx;
			// entity.vy += entity.ay * elapsed + gy;
			// entity.x  += entity.vx * elapsed;
			// entity.y  += entity.vy * elapsed;

			// let force = new Vector(
			// 	drag * sprite.area * environment * Math.pow(sprite.velocity.x, 3) / Math.abs(sprite.velocity.x),
			// 	drag * sprite.area * environment * Math.pow(sprite.velocity.y, 3) / Math.abs(sprite.velocity.y)
			// );
			//
			//
			//
			// // console.log(force.x);
			// let acceleration = new Vector(
			// 	(force.x / sprite.mass) * frameRate,
			// 	(gravity + (force.y / sprite.mass)) * frameRate
			// );
			//
			// sprite.velocity.add(acceleration);
			// sprite.velocity.mult(frameRate * 63 );
			//
			// const fr = sprite.friction;
			// sprite.velocity.x *= fr;
			//
			// sprite.position.add(sprite.velocity);


			// sprite,resolveCollision(
			// height,
			// width,
			// 0
			// )
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
