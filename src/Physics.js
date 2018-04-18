
const Cd = 1;//0.47;  // coefficient of drag - Dimensionless
const rho = 1; //1.22; // kg / m^3 - density of the fluid the sprite is in
//const A = Math.PI * sprite.radius * sprite.radius / (10000); // m^2 - area
const gravity = .5;//9.81;  // m / s^2 - gravity
const maxGravity = 20;

export default class Physics {
	constructor () {
		this.sprites = [];
	}

	addSprite (sprite) {
		this.sprites.push(sprite);
	}

	render (time) {
		this.sprites.forEach((sprite) => {

			const frameRate = time / 60;
			const A = 1; //sprite.area;

			let ax = sprite.vx + sprite.ax;
			let ay = sprite.vy + sprite.ay + gravity;

			ax *= frameRate * 60;
			ay *= frameRate * 60;

			sprite.vx = Math.min(ax, sprite.vx_max);
			sprite.vy = Math.min(maxGravity * sprite.mass, ay);

			sprite.x += sprite.vx;
			sprite.y += sprite.vy;


			console.log('sprite', parseInt(sprite.vx), parseInt(sprite.vy));
		});
	}
}
