const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
let autoInterval = null;

// Create stars
for (let i = 0; i < 120; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 1 + 0.2
    });
}

// Animate stars
function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";

    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        star.y += star.speed;

        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    });

    requestAnimationFrame(animateStars);
}

animateStars();

// Resize canvas
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Gradient animation
function setRandomGradient() {
    document.body.classList.add("gradient-animate");
}

// Custom color
function setCustomColor(color) {
    document.body.classList.remove("gradient-animate");
    document.body.style.background = color;
}

// Random image
function setImage() {
    document.body.classList.remove("gradient-animate");
    const url = "https://picsum.photos/1600/900?random=" + Date.now();
    document.body.style.background = `url(${url}) center/cover no-repeat`;
}

// Upload image
function uploadImage(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        document.body.style.background = `url(${e.target.result}) center/cover no-repeat`;
    };
    reader.readAsDataURL(file);
}

// Save
function saveBg() {
    localStorage.setItem("bg", document.body.style.background);
    alert("Background Saved!");
}

// Load saved
window.onload = function () {
    const saved = localStorage.getItem("bg");
    if (saved) document.body.style.background = saved;
};

// Reset
function resetBg() {
    document.body.classList.remove("gradient-animate");
    document.body.style.background = "black";
    localStorage.removeItem("bg");
}

// Auto mode
function startAuto() {
    stopAuto();
    autoInterval = setInterval(setRandomGradient, 4000);
}

function stopAuto() {
    clearInterval(autoInterval);
}

// Theme toggle
function toggleTheme() {
    document.body.classList.toggle("dark");
}