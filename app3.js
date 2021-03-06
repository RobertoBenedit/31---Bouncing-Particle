// canvas setup
const canvas = document.getElementById("canvas1");
// @ts-ignore
const ctx = canvas.getContext("2d");
// @ts-ignore
canvas.width = window.innerWidth;
// @ts-ignore
canvas.height = window.innerHeight;

let particleArray = [];
const numberOfParticles = 100;

// get mouse position
const mouse = {
    x: null,
    y: null,
};

window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    // console.log(mouse.x, mouse.y);
});

setInterval(() => {
    mouse.x = undefined;
    mouse.y = undefined;
}, 200);

// Create Particle Class
class Particle {
    constructor(x, y, size, color, weight) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.weight = weight;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        this.size -= 0.1;
        if (this.size <= 0) {
            this.x = mouse.x + Math.random() * 20 - 10;
            this.y = mouse.y + Math.random() * 20 - 10;
            this.size = Math.random() * 12 + 10;
            this.weight = Math.random() * 2 - 0.5;
        }
        this.y += this.weight;
        this.weight += 0.2;

        // @ts-ignore
        if (this.y > canvas.height - this.size) {
            this.weight *= -0.2;
        }
    }
}

function init() {
    particleArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        // @ts-ignore
        let x = Math.random() * canvas.width;
        // @ts-ignore
        let y = Math.random() * canvas.height;
        let size = Math.random() * 10 + 5;
        let color = "black";
        // let color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
        //     Math.random() * 255
        // })`;
        let weight = 1;
        particleArray.push(new Particle(x, y, size, color, weight));
    }
}

function animate() {
    // @ts-ignore
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();
    }
    requestAnimationFrame(animate);
}
init();
animate();

window.addEventListener("resize", () => {
    // @ts-ignore
    canvas.width = window.innerWidth;
    // @ts-ignore
    canvas.hight = window.innerHeight;
});
