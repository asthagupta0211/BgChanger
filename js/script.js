document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.getElementById("bgCanvas");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // ⭐ Stars
    let stars = [];
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

    // 🔥 HELPER (MAIN FIX)
    function clearBackground() {
        document.body.classList.remove("gradient-animate");
        document.body.style.background = "";
    }

    let autoInterval = null;

    // 🎨 Gradient
    window.setRandomGradient = function () {
        clearBackground();
        document.body.classList.add("gradient-animate");
    };

    // 🎨 Color
    window.setCustomColor = function (color) {
        clearBackground();
        document.body.style.background = color;
    };

    // 🖼 Image
    window.setImage = function () {
        clearBackground();
        const url = "https://picsum.photos/1600/900?random=" + Date.now();
        document.body.style.background = `url(${url}) center/cover no-repeat`;
    };

    // 📤 Upload
    window.uploadImage = function (event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            clearBackground();
            document.body.style.background =
                `url(${e.target.result}) center/cover no-repeat`;
        };
        reader.readAsDataURL(file);
    };

    // 💾 Save
    window.saveBg = function () {
        const currentBg = document.body.classList.contains("gradient-animate")
            ? "gradient"
            : document.body.style.background;

        localStorage.setItem("bg", currentBg);
        alert("Saved!");
    };

    // 🔄 Load
    const saved = localStorage.getItem("bg");
    if (saved) {
        if (saved === "gradient") {
            document.body.classList.add("gradient-animate");
        } else {
            document.body.style.background = saved;
        }
    }

    // 🔁 Reset
    window.resetBg = function () {
        clearBackground();
        document.body.style.background = "black";
        localStorage.removeItem("bg");
    };

    // 🔄 Auto mode
    window.startAuto = function () {
        stopAuto();
        autoInterval = setInterval(() => {
            setRandomGradient();
        }, 3000);
    };

    window.stopAuto = function () {
        clearInterval(autoInterval);
    };

    // 🌙 Theme
    window.toggleTheme = function () {
        document.body.classList.toggle("dark");
    };

});