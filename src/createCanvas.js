
export default function createCanvas (w, h, parent = document.body) {
	const canvas = document.createElement('canvas');
	canvas.setAttribute('width', w);
	canvas.setAttribute('height', h);
	parent.appendChild(canvas);
	const ctx = canvas.getContext('2d');

	return {
		style (options) {
			Object.keys(options).forEach((key) => {
				// console.log('set', key, options[key]);
				ctx[key] = options[key];
			});
		},

		rect (x, y, w, h) {
			ctx.beginPath();
			ctx.rect(x, y, w, h);
			ctx.fill();
			ctx.stroke();
			// ctx.stroke();
		},

		circle (x, y, r) {
			this.ellipse(x, y, r, r);
		},

		ellipse (x, y, w, h) {
			ctx.beginPath();
			ctx.ellipse(x, y, w, h, 0, 0, 2 * Math.PI);
			ctx.fill();
			ctx.stroke();
		},

		clear () {
			ctx.clearRect(0, 0, w, h);
		},

		get width () {
			return w;
		},

		get height () {
			return h;
		}

	}
}


