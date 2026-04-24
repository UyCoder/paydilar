const wordsList = [
    "ئاتا", "ئانا", "ئاي", "نۇر", "يەر", "كۆك",
    "ئىلىم", "ئىمان", "ئەدەپ", "ۋاقىت", "ئۇيغۇر",
    "ئىسلام", "ھۆرمەت", "ئادەم", "ۋەتەن", "ياخشى",
    "تېنچلىق", "ئادالەت", "ساداقەت", "قەھرىمان",
    "تۈركىستان", "مۇستەقىللىق", "پاراسەت", "كەلگۈسى"
];

const rewardsMessages = [
    "ماشائاللاھ!",
    "بارىكاللاھ!",
    "بەك ئەقىللىقكەنسەن!",
    "ئاپىرىن بىلىملىك بالام!",
    "قالتىس سىزدىڭ!",
    "تولىمۇ قالتىس!"
];

let gameState = {
    playerName: 'بالام',
    currentWordIndex: 0,
    score: 0,
    distanceDrawn: 0,
    requiredDistance: 1000
};

// Canvas Setup
const canvas = document.getElementById('draw-canvas');
const ctx = canvas.getContext('2d');
const container = document.querySelector('.drawing-area');

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let currentColor = '#ef4444';
let currentSize = 15;
let currentTool = 'pen'; // pen or eraser

// Initialize
function initCanvas() {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
}

window.addEventListener('resize', initCanvas);
initCanvas();

// UI Navigation
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}

function startGame() {
    const nameInput = document.getElementById('playerName').value.trim();
    if(nameInput) {
        gameState.playerName = nameInput;
    }
    
    // Shuffle words to make it fun every time
    wordsList.sort(() => Math.random() - 0.5);
    gameState.currentWordIndex = 0;
    gameState.score = 0;
    
    document.getElementById('score-text').innerText = gameState.score;
    loadWord();
    showScreen('game-screen');
}

function loadWord() {
    const word = wordsList[gameState.currentWordIndex];
    document.getElementById('current-word').innerText = word;
    
    const tracingEl = document.getElementById('tracing-word');
    tracingEl.innerText = word;
    
    // Adjust font size based on length
    if(word.length > 8) {
        tracingEl.style.fontSize = "10vw";
    } else {
        tracingEl.style.fontSize = "15vw";
    }

    // Reset canvas and logic
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameState.distanceDrawn = 0;
    
    // Required distance based on word length. Avg 200px per char.
    gameState.requiredDistance = word.length * 200;
    document.getElementById('btn-done').classList.add('hidden');
}

// Drawing Logic
function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    let clientX = e.clientX;
    let clientY = e.clientY;
    
    if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    }
    
    return {
        x: clientX - rect.left,
        y: clientY - rect.top
    };
}

function startPosition(e) {
    e.preventDefault();
    isDrawing = true;
    const pos = getPos(e);
    lastX = pos.x;
    lastY = pos.y;
    
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
}

function endPosition() {
    isDrawing = false;
    ctx.beginPath();
}

function draw(e) {
    if (!isDrawing) return;
    e.preventDefault();
    
    const pos = getPos(e);
    
    ctx.lineWidth = currentSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    if (currentTool === 'eraser') {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = currentSize * 2; // eraser is bigger
    } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = currentColor;
    }

    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    
    // Calculate distance
    let dx = pos.x - lastX;
    let dy = pos.y - lastY;
    
    if (currentTool === 'pen') {
        gameState.distanceDrawn += Math.sqrt(dx*dx + dy*dy);
        checkProgress();
    }
    
    lastX = pos.x;
    lastY = pos.y;
}

function checkProgress() {
    if(gameState.distanceDrawn > gameState.requiredDistance) {
        document.getElementById('btn-done').classList.remove('hidden');
    }
}

// Event Listeners for Canvas
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseout', endPosition);

canvas.addEventListener('touchstart', startPosition, {passive: false});
canvas.addEventListener('touchend', endPosition);
canvas.addEventListener('touchmove', draw, {passive: false});

// Toolbar Interactions
document.querySelectorAll('.color-swatch').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.color-swatch').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentColor = e.target.getAttribute('data-color');
        
        currentTool = 'pen';
        document.getElementById('btn-pen').classList.add('active');
        document.getElementById('btn-eraser').classList.remove('active');
    });
});

document.getElementById('pen-size').addEventListener('input', (e) => {
    currentSize = e.target.value;
});

document.getElementById('btn-pen').addEventListener('click', () => {
    currentTool = 'pen';
    document.getElementById('btn-pen').classList.add('active');
    document.getElementById('btn-eraser').classList.remove('active');
});

document.getElementById('btn-eraser').addEventListener('click', () => {
    currentTool = 'eraser';
    document.getElementById('btn-eraser').classList.add('active');
    document.getElementById('btn-pen').classList.remove('active');
});

document.getElementById('btn-clear').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameState.distanceDrawn = 0;
    document.getElementById('btn-done').classList.add('hidden');
});

// Done Button -> Reward
document.getElementById('btn-done').addEventListener('click', () => {
    gameState.score += 10;
    document.getElementById('score-text').innerText = gameState.score;
    
    // Prepare Reward Screen
    const msg = rewardsMessages[Math.floor(Math.random() * rewardsMessages.length)];
    document.getElementById('reward-msg').innerText = msg;
    document.getElementById('reward-name').innerText = gameState.playerName;
    
    showScreen('reward-screen');
    
    // Fire Confetti!
    fireConfetti();
});

// Next Word
document.getElementById('btn-next').addEventListener('click', () => {
    gameState.currentWordIndex++;
    if(gameState.currentWordIndex >= wordsList.length) {
        gameState.currentWordIndex = 0; // loop back
    }
    loadWord();
    showScreen('game-screen');
});

// Confetti logic
function fireConfetti() {
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      }));
      confetti(Object.assign({}, defaults, { particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      }));
    }, 250);
}
