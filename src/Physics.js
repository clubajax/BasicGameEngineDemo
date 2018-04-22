
const drag = 10.47;  // coefficient of drag - Dimensionless
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
			const frameRate = 1/60; // Seconds
			const ball = sprite;

			let forceX = -0.5 * drag * ball.area * environment * Math.pow(ball.velocity.x, 3) / Math.abs(ball.velocity.x);
			let forceY = -0.5 * drag * ball.area * environment * Math.pow(ball.velocity.y, 3) / Math.abs(ball.velocity.y);

			forceX = (isNaN(forceX) ? 0 : forceX);
			forceY = (isNaN(forceY) ? 0 : forceY);

			const ax = forceX / ball.mass;
			const ay = gravity + (forceY / ball.mass);

			const ox = ball.velocity.x;
			ball.velocity.x += ax * frameRate;
			ball.velocity.y += ay * frameRate;

			if (Math.abs(ball.velocity.x - ox) <= 0.0005) {
				ball.velocity.x = 0;
			}


			console.log(ball.velocity.x - ox, ox, ball.velocity.x);

			ball.position.x += ball.velocity.x * frameRate * 100;
			ball.position.y += ball.velocity.y * frameRate * 100;

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

			// console.log('', ball.position.y);
		});
	}
}
