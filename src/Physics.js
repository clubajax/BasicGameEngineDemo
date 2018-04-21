
const Cd = 1;//0.47;  // coefficient of drag - Dimensionless
const rho = 1; //1.22; // kg / m^3 - density of the fluid the sprite is in
//const A = Math.PI * sprite.radius * sprite.radius / (10000); // m^2 - area
const gravity = .15;//9.81;  // m / s^2 - gravity
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

			sprite.ay += gravity;

			let ax = sprite.vx + sprite.ax;
			let ay = sprite.vy + sprite.ay// + gravity;

			ax *= frameRate;
			ay *= frameRate;

			sprite.vx = Math.min(ax, sprite.vx_max);

			// console.log('sprite.vy', sprite.vy);

			ay = Math.min(maxGravity * sprite.mass, Math.abs(ay)) * (ay >= 0 ? 1 : -1);

			sprite.vy = ay; //sprite.vy > 0 ? Math.min(maxGravity * sprite.mass, ay) : Math.max(maxGravity * sprite.mass, ay);

			let x = sprite.x + sprite.vx;
			let y = sprite.y + sprite.vy;

			if (y > this.height) {
				y = this.height - (y - this.height);
				sprite.vy *= -0.5;
				sprite.ay = 0;
			}
			sprite.x = x;
			sprite.y = y;

		});
	}
}
