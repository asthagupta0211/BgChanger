let autoInterval;

// Random Gradient
function setRandomGradient() {
    let colors = ["#ff7e5f", "#feb47b", "#6a11cb", "#2575fc", "#00c6ff", "#0072ff"];
    let c1 = colors[Math.floor(Math.random() * colors.length)];
    let c2 = colors[Math.floor(Math.random() * colors.length)];

    document.body.style.background = `linear-gradient(135deg, ${c1}, ${c2})`;
}

// Random Image
function setImage() {
    let url = "https://picsum.photos/1600/900?random=" + Math.random();
    document.body.style.background = `url(${url}) center/cover no-repeat`;
}

// Custom Color
function setCustomColor(color) {
    document.body.style.background = color;
}

// Upload Image
function uploadImage(event) {
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onload = function(e) {
        document.body.style.background = `url(${e.target.result}) center/cover no-repeat`;
    }

    reader.readAsDataURL(file);
}

// Save Background
function saveBg() {
    localStorage.setItem("bg", document.body.style.background);
    alert("Background Saved!");
}

// Load Saved
window.onload = function() {
    let saved = localStorage.getItem("bg");
    if (saved) {
        document.body.style.background = saved;
    }
}

// Reset
function resetBg() {
    document.body.style.background = "linear-gradient(135deg, #667eea, #764ba2)";
}

// Auto Mode
function startAuto() {
    autoInterval = setInterval(setRandomGradient, 2000);
}

function stopAuto() {
    clearInterval(autoInterval);
}

// Theme Toggle
function toggleTheme() {
    document.body.classList.toggle("dark");
}