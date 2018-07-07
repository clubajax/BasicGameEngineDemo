export default class Loop {
	constructor (options) {
		this.components = [];
		this.frameRate = options.frameRate || 1/100; // Seconds
		this.frameDelay = options.frameDelay || this.frameRate * 1000; // ms
		console.log('this.frameDelay', this.frameDelay);
	}

	register (component) {
		this.components.push(component);
	}

	play () {
		const frameRate = this.frameRate;
		const components = this.components;
		const frameDelay = this.frameDelay;
		let mark;
		function loop () {
			const elapsed = performance.now() - mark;
			mark = performance.now();

			components.forEach((component) => {
				component.render(frameRate, elapsed);
			});
		}

		mark = performance.now();
		this.loopTimer = setInterval(loop, frameDelay);
	}

	pause () {
		console.log('pause');
		clearInterval(this.loopTimer);
	}
}

// const loop = new Loop({
// 	frameRate,
// 	frameDelay: 9.0
// });