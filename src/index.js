// Упражнение №1

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const drawSnowman = (x, y, headRadius, ballsCount) => { //Вместо общей высоты задаём размер головы и кол-во снежных шаров

ctx.strokeStyle = "orange"; //Рисуем нос
ctx.lineWidth = headRadius / 6;
ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x + headRadius * 1.5, y + headRadius / 4);
ctx.stroke();

for (let i = 1; i <= ballsCount; i++) { 
    
    if (i === 1) {
        ctx.strokeStyle = "black";
        ctx.fillStyle = "black"; //Рисуем глаз
        ctx.beginPath();
        ctx.arc(x + headRadius * 1.07, y - headRadius / 5, headRadius / 22, 0, 2 * Math.PI, false);
        ctx.stroke();
        ctx.fill();

        ctx.strokeStyle = "black"; //Рисуем головной убор
        ctx.lineWidth = headRadius / 10;
        ctx.beginPath();
        ctx.moveTo(x - headRadius * 0.9, y - headRadius);
        ctx.lineTo(x - headRadius + headRadius / 5, y - headRadius * 2.5);
        ctx.lineTo(x - headRadius + headRadius * 1.8 , y - headRadius * 2.5);
        ctx.lineTo(x - headRadius + headRadius * 1.9 , y - headRadius);
        ctx.closePath();
        ctx.fill();
        }
    
    ctx.strokeStyle = "#b8e1ff"; // Рисуем само тело снеговика
    ctx.lineWidth = headRadius / 8;
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(x, y, headRadius, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.fill();
    headRadius *= 1.3; //Увеличиваем каждый последующий нижележащий шар на заданную величину
    y +=(headRadius * 1.7); //Смещаем шары по вертикали
    }

ctx.strokeStyle = "black"; //Рисуем руку
ctx.lineWidth = headRadius / 20;
ctx.beginPath();
ctx.moveTo(x, y - headRadius * ballsCount);
ctx.lineTo(x * 1.3, y / 2.5);
ctx.lineTo(x * 1.4, y / 2.3);
ctx.lineTo(x * 1.45, y / 2.1);
ctx.moveTo(x * 1.4, y / 2.3);
ctx.lineTo(x * 1.4, y / 2);
ctx.lineTo(x * 1.35, y / 1.9);
ctx.moveTo(x * 1.4, y / 2.3);
ctx.lineTo(x * 1.34, y / 2.05);
ctx.lineTo(x * 1.3, y / 2.0);
ctx.stroke();
}

drawSnowman(canvas.width / 2, canvas.height / 3, 50, 3);

// Упражнение №2

const scene = new THREE.Scene();

const fov = 70;
const aspectRatio = window.innerWidth / window.innerHeight;
const near = 0.1;
const far =1000;

const camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("#ccc");
document.body.prepend(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);

const geometry = new THREE.ConeGeometry(1, 3);

const material = new THREE.MeshPhongMaterial({
    color: "red"
}); 

const cone = new THREE.Mesh(geometry, material);
console.log(cone);
cone.scale.set(5, 5, 5);
scene.add(cone);

camera.position.z = 20;

controls.update();

const light = new THREE.DirectionalLight("#fff", 1);
scene.add(light);
light.position.set(-1, 2, 4);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    cone.rotation.x += 0.02;
    cone.rotation.y += 0.01;
    cone.rotation.z += 0.01;
    controls.update();
}
animate();