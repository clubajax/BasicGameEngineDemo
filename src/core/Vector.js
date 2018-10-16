export default class Vector {
	constructor (x, y, x1, y1) {
		this._x = x1;
		this._y = y1;
		this.x = isNaN(x) ? 0 : x;
		this.y = isNaN(y) ? 0 : y;
	}

	set x (x) {
		this.lastX = this._x;
		// this._x = +(x.toPrecision(4));
		this._x = x;
	}

	get x () {
		return this._x;
	}

	set y (y) {
		this.lastY = this._y;
		// this._y = +(y.toPrecision(4));
		this._y = y;
	}

	get y () {
		return this._y;
	}

	add (vector) {
		this.x += vector.x;
		this.y += vector.y;
	}

	subtract (vector) {
		this.x -= vector.x;
		this.y -= vector.y;
	}

	mult (scalar) {
		if (typeof scalar === 'number') {
			this.x *= scalar;
			this.y *= scalar;
		} else {
			this.x *= scalar.x;
			this.y *= scalar.y;
		}
	}

	div (scalar) {
		this.x /= scalar;
		this.y /= scalar;
	}

	mag () {
		return Math.sqrt(this.x * 2 + this.y * 2);
	}

	normalize () {
		const m = this.mag();
		if (m !== 0) {
			this.div(m);
		}
	}

	limit () {}

	copy () {
		return new Vector(this.x, this.y, this._x, this._y);
	}

	//
	static add (v1, v2) {
		return new Vector(v1.x + v2.x, v1.y + v2.y);
	}

	static subtract (v1, v2) {
		return new Vector(v1.x - v2.x, v1.y - v2.y);
	}

	static mult (vector, scalar) {
		return new Vector(vector.x * scalar, vector.y * scalar);
	}

	static div (vector, scalar) {
		return new Vector(vector.x / scalar, vector.y / scalar);
	}
}