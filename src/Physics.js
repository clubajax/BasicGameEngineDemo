
const Cd = 1;//0.47;  // coefficient of drag - Dimensionless
const rho = 1; //1.22; // kg / m^3 - density of the fluid the sprite is in
//const A = Math.PI * sprite.radius * sprite.radius / (10000); // m^2 - area
const gravity = 9.81;  // m / s^2 - gravity
const maxGravity = 20;

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

			const frameRate = 1/60; // Seconds
			const ball = sprite;
			const A = ball.area;

			let Fx = -0.5 * Cd * A * rho * ball.velocity.x * ball.velocity.x * ball.velocity.x / Math.abs(ball.velocity.x);
			let Fy = -0.5 * Cd * A * rho * ball.velocity.y * ball.velocity.y * ball.velocity.y / Math.abs(ball.velocity.y);

			Fx = (isNaN(Fx) ? 0 : Fx);
			Fy = (isNaN(Fy) ? 0 : Fy);

			// Calculate acceleration ( F = ma )
			const ax = Fx / ball.mass;
			const ay = gravity + (Fy / ball.mass);
			// Integrate to get velocity
			ball.velocity.x += ax*frameRate;
			ball.velocity.y += ay*frameRate;

			// Integrate to get position
			ball.position.x += ball.velocity.x*frameRate*100;
			ball.position.y += ball.velocity.y*frameRate*100;

			if (ball.position.y > this.height - ball.radius) {
				ball.velocity.y *= ball.restitution;
				ball.position.y = this.height - ball.radius;
			}

			// console.log('', ball.position.y);
		});
	}
}
