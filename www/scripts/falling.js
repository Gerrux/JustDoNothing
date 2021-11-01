const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let W = window.innerWidth,
	H = window.innerHeight;
let requestID;
const particleAmount = 20;
const x = W;
const y = 3;
const speed = 2;
const rotationSpeed = 1;
let paricles = [];

let init_canvas = () => {
	
	for(let i = 0; i < particleAmount; i++) {
		let image = new Image();
		image.src = images[playerStorage.visibleAnimal];
		paricles.push({
			image: image,
			w: 30,
			h: 30,
			x: Math.random() * x,
			y: Math.random() * y,
			angle: 0,
			speed: Math.random() * speed,
			rotationSpeed: randomFloatFromInverval(0.02, 0.005)
		});
	}
}

const draw = () => {
	ctx.clearRect(0, 0, W, H);
	
	for(let i = 0; i < particleAmount; i++) {
		ctx.save();
		ctx.translate(paricles[i].x, paricles[i].y);
		paricles[i].angle += paricles[i].rotationSpeed;
		paricles[i].angle %= Math.PI * 2;
		ctx.rotate(paricles[i].angle);
		ctx.drawImage(paricles[i].image, -paricles[i].w/2 , -paricles[i].h/2, paricles[i].w, paricles[i].h);
		ctx.restore();
		
		paricles[i].y += paricles[i].speed;
		
		if(paricles[i].y > H + (paricles[i].w > paricles[i].h ? paricles[i].w : paricles[i].h)) {
			paricles[i].y = -50;
			paricles[i].x = Math.random() * x;
		}
	}
}

let render_canvas = () => {
	draw();
	requestID = window.requestAnimationFrame(render_canvas);
}

function startCanvas() {
	canvas.width = W;
	canvas.height = H;
	
	init_canvas();
	render_canvas();
}

function clearCanvas() {
  window.cancelAnimationFrame(requestID);
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  paricles = [];
}

window.addEventListener('resize', this.debounce((event) => {
	W = window.innerWidth,
	H = window.innerHeight;
	
	canvas.width = W;
	canvas.height = H;
}), false);

function randomFloatFromInverval(min, max) {
	return  parseFloat((Math.random() * (max - min) + min).toFixed(4));
}

function debounce (func, timeout = 400) {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => { func.apply(this, args); }, timeout);
	};
} 

startCanvas();