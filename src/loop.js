const frameRate = 1/60; // Seconds
const frameDelay = frameRate * 1000; // ms
let mark;
let loopTimer;

let lastTime = 0;
function loop () {
	const elapsed = performance.now() - mark;
	mark = performance.now();

	components.forEach((component) => {
		component.render(elapsed);
	});
}

const components = [];
export function register (component) {
	components.push(component);
}


let handle;
export function play () {
	console.log('play');
	mark = performance.now();
	loopTimer = setInterval(loop, frameDelay);
}

export function pause () {
	console.log('pause');
	clearTimeout(loopTimer);
}