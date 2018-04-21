
const Cd = 1;//0.47;  // coefficient of drag - Dimensionless
const rho = 1; //1.22; // kg / m^3 - density of the fluid the sprite is in
//const A = Math.PI * sprite.radius * sprite.radius / (10000); // m^2 - area
const gravity = .1;//9.81;  // m / s^2 - gravity
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

			const frameRate = time / 15;
			const A = 1; //sprite.area;

			let ax = sprite.vx + sprite.ax;
			let ay = sprite.vy + sprite.ay + gravity;

			ax *= frameRate;
			ay *= frameRate;

			sprite.vx = Math.min(ax, sprite.vx_max);
			sprite.vy = Math.min(maxGravity * sprite.mass, ay);

			let x = sprite.x + sprite.vx;
			let y = sprite.y + sprite.vy;

			const segY = y - sprite.y;

			if (y > this.height) {
				y = this.height - (y - this.height);
				sprite.vy *= -0.5;
				sprite.ay = 0;
			}

			const orgY = sprite.y;

			sprite.x = x;
			sprite.y = y;


			console.log('sprite', y - orgY, orgY, y);
		});
	}
}
