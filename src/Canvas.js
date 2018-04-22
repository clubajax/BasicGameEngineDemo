export default class Canvas {
	constructor (w, h, parent = document.body) {
		this.canvas = document.createElement('canvas');
		this.canvas.setAttribute('width', w);
		this.canvas.setAttribute('height', h);
		parent.appendChild(this.canvas);
		this.ctx = this.canvas.getContext('2d');
		this.width = w;
		this.height = h;
	}

	style (options) {
		Object.keys(options).forEach((key) => {
			// console.log('set', key, options[key]);
			this.ctx[key] = options[key];
		});
	}

	rect (x, y, w, h) {
		this.ctx.beginPath();
		this.ctx.rect(x, y, w, h);
		this.ctx.fill();
		this.ctx.stroke();
		// this.ctx.stroke();
	}

	circle (x, y, r) {
		this.ellipse(x, y, r, r);
	}

	ellipse (x, y, w, h) {
		this.ctx.beginPath();
		this.ctx.ellipse(x, y, w, h, 0, 0, 2 * Math.PI);
		this.ctx.fill();
		this.ctx.stroke();
	}

	clear () {
		this.ctx.clearRect(0, 0, this.width, this.height);
	}

}


