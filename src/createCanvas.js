
export default function createCanvas (w, h, parent = document.body) {
	const canvas = document.createElement('canvas');
	canvas.setAttribute('width', w);
	canvas.setAttribute('height', h);
	parent.appendChild(canvas);
	const ctx = canvas.getContext('2d');

	return {
		style (options) {
			Object.keys(options).forEach((key) => {
				console.log('set', key, options[key]);
				ctx[key] = options[key];
			});
		},

		rect (x, y, w, h) {
			ctx.beginPath();
			ctx.rect(x, y, w, h);
			ctx.fill();
			ctx.stroke();
			// ctx.stroke();
		}
	}
}


