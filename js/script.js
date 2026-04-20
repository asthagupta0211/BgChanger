let autoInterval;

// Random Gradient
function setRandomGradient() {
    const gradients = [
        ["#ff7e5f", "#feb47b"],
        ["#6a11cb", "#2575fc"],
        ["#00c6ff", "#0072ff"],
        ["#ff9966", "#ff5e62"],
        ["#56ab2f", "#a8e063"]
    ];

    const random = gradients[Math.floor(Math.random() * gradients.length)];
    document.body.style.background = `linear-gradient(135deg, ${random[0]}, ${random[1]})`;
}

// Random Image
function setImage() {
    const url = "https://picsum.photos/1600/900?random=" + new Date().getTime();
    document.body.style.background = `url(${url}) center/cover no-repeat`;
}

// Custom Color Picker
function setCustomColor(color) {
    document.body.style.background = color;
}

// Upload Image
function uploadImage(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(e) {
        document.body.style.background = `url(${e.target.result}) center/cover no-repeat`;
    };

    reader.readAsDataURL(file);
}

// Save Background
function saveBg() {
    localStorage.setItem("bg", document.body.style.background);
    alert("✅ Background saved!");
}

// Load Saved Background
window.onload = function() {
    const saved = localStorage.getItem("bg");
    if (saved) {
        document.body.style.background = saved;
    }
};

// Reset Background
function resetBg() {
    document.body.style.background = "linear-gradient(135deg, #667eea, #764ba2)";
    localStorage.removeItem("bg");
}

// Auto Change Mode
function startAuto() {
    stopAuto(); // prevent duplicates
    autoInterval = setInterval(() => {
        setRandomGradient();
    }, 2500);
}

function stopAuto() {
    clearInterval(autoInterval);
}

// Dark Mode Toggle
function toggleTheme() {
    document.body.classList.toggle("dark");
}