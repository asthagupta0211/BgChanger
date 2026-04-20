// Ensure everything loads properly
document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.getElementById("bgCanvas");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let stars = [];

    // create stars
    for (let i = 0; i < 120; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2,
            speed: Math.random() * 1 + 0.2
        });
    }

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

    // ===== FIX: Make functions global =====

    let autoInterval = null;

    window.setRandomGradient = function () {
        document.body.classList.add("gradient-animate");
        document.body.style.background = ""; // remove inline override
    };

    window.setCustomColor = function (color) {
        document.body.classList.remove("gradient-animate");
        document.body.style.background = color;
    };

    window.setImage = function () {
        document.body.classList.remove("gradient-animate");
        const url = "https://picsum.photos/1600/900?random=" + Date.now();
        document.body.style.background = `url(${url}) center/cover no-repeat`;
    };

    window.uploadImage = function (event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            document.body.classList.remove("gradient-animate");
            document.body.style.background =
                `url(${e.target.result}) center/cover no-repeat`;
        };
        reader.readAsDataURL(file);
    };

    window.saveBg = function () {
        localStorage.setItem("bg", document.body.style.background);
        alert("Background Saved!");
    };

    // load saved background safely
    const saved = localStorage.getItem("bg");
    if (saved) {
        document.body.style.background = saved;
    }

    window.resetBg = function () {
        document.body.classList.remove("gradient-animate");
        document.body.style.background = "black";
        localStorage.removeItem("bg");
    };

    window.startAuto = function () {
        stopAuto();
        autoInterval = setInterval(() => {
            setRandomGradient();
        }, 4000);
    };

    window.stopAuto = function () {
        clearInterval(autoInterval);
    };

    window.toggleTheme = function () {
        document.body.classList.toggle("dark");
    };

});