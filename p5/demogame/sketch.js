let things = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	
	fill(240, 229, 197);
	rect(0, height-200, width, height/4)
	colorMode(HSB);
	
	for (let i=0; i < 100; i++) {
		let x = random(0, width);
		let y = random(0, height);
		things[i] = createThing(x,y);
	}
}

function draw() {
	background(181, 100, 75);
	fill(59, 25, 65);
	rect(0, height-200, width, height/4)

	for (let i=0; i<100; i++) {
		updateThing(things[i]);
	}
}
	
function createThing(x,y){
	let thing = {};
	thing.x = x;
	thing.y = y;
	thing.velX = random(-10, 10);
	thing.velY = random(-5, 5);
	thing.size = random(50,100);
	thing.hue = random(0, 360);
	return thing;
}

function updateThing(t){
	t.x = t.x+t.velX;
	t.y = t.y+t.velY;
	if (t.velX == 0) {
		t.velX = 1
	}
	if (t.velY == 0) {
		t.velY = 1
	}
	if (t.x > width || t.x < 0){
		t.velX = t.velX*-1;
	}
	if (t.y > height || t.y < 0){
		t.velY = t.velY*-1;
	}
	
	if (t.velX > 0) {
	fill(t.hue-50, 50, 75);
	triangle(t.x, t.y, t.x-50, t.y-50, t.x-50, t.y+50);

	fill (t.hue, 50, 75);
	ellipse(t.x,t.y, t.size);
	
	fill(t.hue-50, 50, 75);
	ellipse(t.x-10, t.y, t.size/4);
	} else {fill(t.hue-50, 50, 75);
	triangle(t.x, t.y, t.x+50, t.y+50, t.x+50, t.y-50);

	fill (t.hue, 50, 75);
	ellipse(t.x,t.y, t.size);
	
	fill(t.hue-50, 50, 75);
	ellipse(t.x+10, t.y, t.size/4);
	}
	
}