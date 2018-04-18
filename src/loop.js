let lastTime = 0;
function loop (elapsed) {

	handle = window.requestAnimationFrame(loop);
	if (!elapsed) {
		return;
	}
	const time = elapsed - lastTime;
	lastTime = elapsed;
	if (time > 100) {
		return;
	}
	// console.log('t', time);

	components.forEach((component) => {
		component.render(time);
	});
}

const components = [];
export function register (component) {
	components.push(component);
}


let handle;
export function play () {
	console.log('play');
	loop();
}

export function pause () {
	console.log('pause');
	window.cancelAnimationFrame(handle);
}