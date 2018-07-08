
export default class Renderer {
	constructor (canvas) {
		this.canvas = canvas;
		this.sprites = [];
	}

	addSprite (sprite) {
		this.sprites.push(sprite);
	}

	render (time) {
		this.canvas.clear();
		this.sprites.forEach((sprite) => {
			sprite.render();
		});
	}
}
