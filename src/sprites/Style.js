const DEFAULT = {
	lineWidth: 1,
	strokeStyle: '#333',
	fillStyle: '#ccc'
};
export default class Style{
	constructor (style, canvas) {
		this.style = Object.assign({}, DEFAULT, style);
		this.canvas = canvas;
	}

	start () {
		this.canvas.style(this.style);
	}

	end () {

	}
}