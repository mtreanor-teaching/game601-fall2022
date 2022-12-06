let scl = 20;
let zRate = 0.1;
let zOffset = 0;
let noiseScl = 0.1;
let rows, cols;
let flowField = [];

let particles = [];
let p1, p2;
let springs = [];
let spacing = 10;
let numParticles = 10;
let gravity;
let k = 1.9;

let imgData;


function preload() {
	imaData = loadImage("star.png");
}


function setup() {
	createCanvas(600, 400);
	rows = height / scl;
	cols = width / scl;
	colorMode(HSB);
	
	gravity = createVector(0, 0.5);
	for (let i = 0; i < numParticles*spacing; i += spacing) {
		particles.push(new Particle(width/2, 20 + i));
	}
	// particles[0].locked = true;
	for (let i = 0; i < particles.length; i++) {
		if (i !== 0) {
			springs.push(new Spring(k, spacing, particles[i-1], particles[i]));
		}
	}

}

function draw() {
	background(0);

	image(imgData, 100, 100);

	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < cols; x++) {
			let xPos = x * scl;
			let yPos = y * scl;
			push();
			translate(xPos, yPos);
			let index = x + y * cols;
			let n = noise(x * noiseScl, y * noiseScl, zOffset);
			let v = p5.Vector.fromAngle(n * PI * 2);
			flowField[index] = v;
			let h = map(n * PI * 2, 0, 2 * PI, 200, 275);
			fill(h, 60, 100);
			noStroke();
			rect(0, 0, scl, scl);
			strokeWeight(1);
			stroke(255);
			line(0, 0, v.x * scl, v.y * scl);
			pop();
		}
	}
	zOffset += zRate;
	
	
	particles[0].pos.x = mouseX;
	particles[0].pos.y = mouseY;
	for (let p of particles) {
		let flowForce = flowField[floor(p.pos.x / scl, floor(p.pos.y / scl))];
		p.applyForce(p5.Vector.mult(flowForce, 5));
		p.update();
	}
	for (let s of springs) {
		s.update();
	}
	
	
}


class Particle {
	constructor(x, y) {
		this.pos = createVector(x, y);
		this.vel = createVector(0, 0);
		this.acc = createVector(0, 0);
		this.mass = 1;
		this.radius = 20;
		this.locked = false;
		this.maxSpeed = 4;
	}
	applyForce(f) {
		this.acc.add(p5.Vector.div(f, this.mass));
	}
	edges() {
		if (this.pos.x + this.radius > width) {
			this.vel.x *= -1;	
			this.pos.x += this.vel.x;
		}
		if (this.pos.x - this.radius < 0) {
			this.vel.x *= -1;	
			this.pos.x += this.vel.x;
		}
		if (this.pos.y + this.radius > height) {
			this.vel.y *= -1;	
			this.pos.y += this.vel.y;
		}
		if (this.pos.y - this.radius < 0) {
			this.vel.y *= -1;	
			this.pos.y += this.vel.y;
		}
	}
	update() {
		if (!this.locked) {
			this.vel.add(this.acc);
			this.vel.limit(this.maxSpeed);
			this.pos.add(this.vel);
			this.edges();
		}
		noStroke();
		ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
		this.acc.set(0, 0);
		this.vel.mult(0.9);
	}
}

class Spring {
	constructor(k, restLength, a, b) {
		this.k = k;
		this.restLength = restLength;
		this.a = a;
		this.b = b;
	}
	update() {
		let vec = p5.Vector.sub(this.b.pos, this.a.pos);
		let d = vec.mag();
		vec.normalize().mult(this.k);
		let stretchSquish = d - this.restLength;
		vec.mult(stretchSquish);
		this.a.applyForce(vec);
		this.b.applyForce(vec.mult(-1));
		strokeWeight(10);
		stroke(200);
		line(this.a.pos.x, this.a.pos.y, this.b.pos.x, this.b.pos.y);
	}
}