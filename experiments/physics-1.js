
/* Burak Kanber */
const width = 500;
const height = 400;
let canvas = false;
let ctx = false;
const frameRate = 1/60; // Seconds
const frameDelay = frameRate * 1000; // ms
let loopTimer = false;

/*
 * Experiment with values of mass, radius, restitution,
 * gravity (ag), and density (rho)!
 * 
 * Changing the constants literally changes the environment
 * the ball is in. 
 * 
 * Some settings to try:
 * the moon: ag = 1.6
 * water: rho = 1000, mass 5
 * beach ball: mass 0.05, radius 30
 * lead ball: mass 10, restitution -0.05
 */
const ball = {
	position: {x: width/2, y: height/2},
	velocity: {x: 0, y: 0},
	mass: 0.1, //kg
	radius: 15, // 1px = 1cm
	restitution: -0.7
};

const Cd = 0.47;  // coefficient of drag - Dimensionless
const rho = 1.22; // kg / m^3 - density of the fluid the ball is in
const A = Math.PI * ball.radius * ball.radius / (10000); // m^2 - area
const ag = 9.81;  // m / s^2 - gravity

const mouse = {x: 0, y: 0, isDown: false};

function getMousePosition(e) {
	mouse.x = e.pageX - canvas.offsetLeft;
	mouse.y = e.pageY - canvas.offsetTop;
}

const mouseDown = function(e) {
	if (e.which === 1) {
		getMousePosition(e);
		mouse.isDown = true;
		ball.position.x = mouse.x;
		ball.position.y = mouse.y;
	}
};

const mouseUp = function(e) {
	if (e.which === 1) {
		mouse.isDown = false;
		ball.velocity.y = (ball.position.y - mouse.y) /10;
		ball.velocity.x = (ball.position.x - mouse.x) / 10;
	}
};

const setup = function() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	canvas.onmousemove = getMousePosition;
	canvas.onmousedown = mouseDown;
	canvas.onmouseup = mouseUp;

	ctx.fillStyle = 'red';
	ctx.strokeStyle = '#000000';
	loopTimer = setInterval(loop, frameDelay);
};

const loop = function() {
	if ( ! mouse.isDown) {
		// Do physics
		// Drag force: Fd = -1/2 * Cd * A * rho * v * v
		let Fx = -0.5 * Cd * A * rho * ball.velocity.x * ball.velocity.x * ball.velocity.x / Math.abs(ball.velocity.x);
		let Fy = -0.5 * Cd * A * rho * ball.velocity.y * ball.velocity.y * ball.velocity.y / Math.abs(ball.velocity.y);

		Fx = (isNaN(Fx) ? 0 : Fx);
		Fy = (isNaN(Fy) ? 0 : Fy);

		// Calculate acceleration ( F = ma )
		const ax = Fx / ball.mass;
		const ay = ag + (Fy / ball.mass);
		// Integrate to get velocity
		ball.velocity.x += ax*frameRate;
		ball.velocity.y += ay*frameRate;

		// Integrate to get position
		ball.position.x += ball.velocity.x*frameRate*100;
		ball.position.y += ball.velocity.y*frameRate*100;
	}
	// Handle collisions
	if (ball.position.y > height - ball.radius) {
		console.log('botto');
		ball.velocity.y *= ball.restitution;
		ball.position.y = height - ball.radius;
	}
	if (ball.position.x > width - ball.radius) {
		ball.velocity.x *= ball.restitution;
		ball.position.x = width - ball.radius;
	}
	if (ball.position.x < ball.radius) {
		ball.velocity.x *= ball.restitution;
		ball.position.x = ball.radius;
	}
	// Draw the ball


	ctx.clearRect(0,0,width,height);

	ctx.save();

	ctx.translate(ball.position.x, ball.position.y);
	ctx.beginPath();
	ctx.arc(0, 0, ball.radius, 0, Math.PI*2, true);
	ctx.fill();
	ctx.closePath();

	ctx.restore();



	// Draw the slingshot
	if (mouse.isDown) {
		ctx.beginPath();
		ctx.moveTo(ball.position.x, ball.position.y);
		ctx.lineTo(mouse.x, mouse.y);
		ctx.stroke();
		ctx.closePath();
	}

};

setup();