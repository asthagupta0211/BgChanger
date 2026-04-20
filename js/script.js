let autoInterval = null;

// Apply background helper (IMPORTANT FIX)
function applyBackground(bg) {
    document.body.style.background = bg;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
}

// Gradient
function setRandomGradient() {
    const gradients = [
        ["#ff7e5f", "#feb47b"],
        ["#6a11cb", "#2575fc"],
        ["#00c6ff", "#0072ff"],
        ["#ff9966", "#ff5e62"],
        ["#56ab2f", "#a8e063"]
    ];

    const g = gradients[Math.floor(Math.random() * gradients.length)];
    applyBackground(`linear-gradient(135deg, ${g[0]}, ${g[1]})`);
}

// Image
function setImage() {
    const url = "https://picsum.photos/1600/900?random=" + Date.now();
    applyBackground(`url(${url})`);
}

// Custom Color
function setCustomColor(color) {
    applyBackground(color);
}

// Upload Image
function uploadImage(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        applyBackground(`url(${e.target.result})`);
    };
    reader.readAsDataURL(file);
}

// Save
function saveBg() {
    localStorage.setItem("bg", document.body.style.background);
    alert("Saved!");
}

// Load
window.onload = function () {
    const saved = localStorage.getItem("bg");
    if (saved) applyBackground(saved);
};

// Reset
function resetBg() {
    applyBackground("linear-gradient(135deg, #667eea, #764ba2)");
    localStorage.removeItem("bg");
}

// Auto Mode
function startAuto() {
    stopAuto();
    autoInterval = setInterval(setRandomGradient, 2000);
}

function stopAuto() {
    clearInterval(autoInterval);
}

// Theme
function toggleTheme() {
    document.body.classList.toggle("dark");
}