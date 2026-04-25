const knowledgeBase = [
    "يۈسۈپ خاس ھاجىپنىڭ «قۇتادغۇبىلىك» ئەسىرىدە، ئادالەت ۋە بىلىمنىڭ ئەڭ كۈچلۈك قورال ئىكەنلىكى ئېيتىلغان.",
    "مەھمۇد قەشقىرى «دىۋان لۇغەت تۈرك» ئارقىلىق مىللىتىمىزنىڭ بىلىم ۋە مەدەنىيىتىنى دۇنياغا تونۇتقان.",
    "سۇلتان سۇتۇق بۇغراخان ئىسلام نۇرىنى قوبۇل قىلىپ، باتۇرلۇقى بىلەن خەلقىمىزنى نادانلىقتىن قۇتۇلدۇرغان.",
    "سەئىدخان ئۆزىنىڭ يۈكسەك ئىرادىسى، قەيسەرلىكى ۋە شىجائىتى بىلەن يېڭى بىر مەدەنىيەت دۆلىتىنى قۇرۇپ چىققان.",
    "سابىت داموللام ئىسلام شەرىئىتى ۋە زامانىۋى بىلىملەرنى بىرلەشتۈرۈپ، قورقماس باتۇرلۇقى بىلەن خەلقنى ئويغاتقان.",
    "ماتېماتىكا مەشىقى: تانكىمىزدا 10 ئوق بار، ھەر قېتىمدا 2 ئوقتىن ئاتساق قانچە قېتىم ئاتالايمىز؟ 5 قېتىم! ئەقىللىق!",
    "ئەخلاق: ۋەتەننى سۆيۈش ئىماندىندۇر. تاجاۋۇزچىلارغا قارشى تۇرۇش، ھەق ئۈچۈن كۈرەش قىلىش مۇسۇلماننىڭ بۇرچىدۇر.",
    "ئەرەبچە ھىكمەت: «الجنة تحت ظلال السيوف» - يەنى جەننەت قىلىچلارنىڭ سايىسى ئاستىدىدۇر (يەنى شىجائەت ۋە تىرىشچانلىق بىلەن كېلىدۇ).",
    "ئاتا-ئانياغا ياخشىلىق قىلىش جەننەتنىڭ ئاچقۇچىدۇر. باتۇرلار ئاتا-ئانياسىنى سۆيىدۇ ۋە ئۇلارنىڭ دۇئاسىنى ئالىدۇ.",
    "ئەل پۇقىتى قەلبىدە! مىللىتىنىڭ غەرىقىنى ساقلاپ كېلەيلى!",
    "بىلىم مەنىق، بىلىمسىز نالان. بىلىملىق يېڭىلىپ كېلەيلى!",
    "شەھىدە قەلبنىڭ، نىيەتتە بەندە. ھەق سەۋەدنىڭ غەلىبىسىگە كېلەيلى!",
    "ئىمان + ئىش = رەھمەت. قىلالمايمىز دەپ قورقۇمايمىز، تىرىشساقلايمىز!",
    "ئۇيغۇرنىڭ مىللىي قىسمى سائايت، مىللىي ھۇققەت كىشيلىكىنى لايىق!",
    "تىرىشچانلىق غەرىقىنىڭ بەندەسى. مەيلى قانچە قىيىن بولسۇن، يېڭىلىپ كېلەيلى!"
];

// Power-ups
let powerUps = [];
let hasRapidFire = false;
let rapidFireTimeout = null;
let hasShield = false;

let canvas, ctx;
let player;
let enemies = [];
let bullets = [];
let particles = [];
let keys = {};

let score = 0;
let level = 1;
let gameLoop;
let isPaused = false;
let gameState = 'start';
let playerName = "ئوسمان";

let knowledgeInterval;

let timeLeft = 90;
let lastTimeUpdate = 0;
let lastBgChange = 0;
let blocks = [];

// Tank image and background images
let tankImage = null;
let backgroundImages = [];
let currentBgIndex = 0;

function loadImages() {
    // Load player tank image
    tankImage = new Image();
    tankImage.src = 'tank.png';
    
    // Load background images
    const bgPaths = [
        'pics/1777150712591-019dc66f-267c-7cfc-a6cd-b4ce7794747e.png',
        'pics/1777150980393-019dc673-9686-7f62-b757-b50e3eae6d4b.png',
        'pics/1777150998754-019dc673-9686-7141-8023-9734218376fd.png',
        'pics/1777151052838-019dc674-af3a-72e2-9f38-3164c989fce6.png',
        'pics/1777151129549-019dc674-af3a-72e2-9f38-3164c989fce6.png',
        'pics/1777151145193-019dc674-af3a-765e-910e-16c7da6ca65b.png'
    ];
    
    bgPaths.forEach(path => {
        let img = new Image();
        img.src = path;
        backgroundImages.push(img);
    });
}

function changeBackgroundImage() {
    if(backgroundImages.length > 0) {
        currentBgIndex = Math.floor(Math.random() * backgroundImages.length);
    }
}

// Power-up types
const powerUpTypes = [
    { name: "تېز ئاتىش", color: "#fbbf24", duration: 8000, symbol: "⚡" },
    { name: "قەلب قورۇنى", color: "#60a5fa", duration: 10000, symbol: "🛡️" },
    { name: "3X پوئېنت", color: "#10b981", duration: 15000, symbol: "⭐" }
];
let scoreMultiplier = 1;

// Sound Effects using Web Audio API
let audioCtx = null;
let bgmOsc = null;
let bgmGain = null;
let isMuted = false;

function initAudio() {
    if(!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if(audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

function toggleMute() {
    isMuted = !isMuted;
    if(bgmGain) {
        bgmGain.gain.setValueAtTime(isMuted ? 0 : 0.15, audioCtx.currentTime);
    }
    let icon = document.querySelector('#mute-btn i');
    if(icon) {
        icon.className = isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
    }
}
window.toggleMute = toggleMute;

function playSound(type) {
    if(!audioCtx || isMuted) return;
    
    const now = audioCtx.currentTime;
    
    if(type === 'fire') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.3);
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
    }
    else if(type === 'enemyFire') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'square';
        osc.frequency.setValueAtTime(80, now);
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.4);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
    }
    else if(type === 'explosion') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const noise = audioCtx.createOscillator();
        noise.type = 'sawtooth';
        noise.connect(gain);
        gain.connect(audioCtx.destination);
        noise.frequency.setValueAtTime(100, now);
        noise.frequency.exponentialRampToValueAtTime(20, now + 0.5);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        noise.start(now);
        noise.stop(now + 0.5);
    }
    else if(type === 'destroy') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.2);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
    }
    else if(type === 'hit') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, now);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
    }
    else if(type === 'collect') {
        const osc1 = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(audioCtx.destination);
        osc1.type = 'sine';
        osc2.type = 'sine';
        osc1.frequency.setValueAtTime(523, now);
        osc1.frequency.setValueAtTime(659, now + 0.1);
        osc2.frequency.setValueAtTime(784, now + 0.2);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc1.start(now);
        osc1.stop(now + 0.3);
        osc2.start(now + 0.2);
        osc2.stop(now + 0.3);
    }
    else if(type === 'gameOver') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + 1);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 1);
        osc.start(now);
        osc.stop(now + 1);
    }
    else if(type === 'levelUp') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(554, now + 0.15);
        osc.frequency.setValueAtTime(659, now + 0.3);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
    }
    else if(type === 'shield') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.3);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
    }
    else if(type === 'shotHit') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'square';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.1);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
    }
    else if(type === 'bonus') {
        // Bonus/powerup activate
        const osc1 = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(audioCtx.destination);
        osc1.type = 'sine';
        osc2.type = 'sine';
        osc1.frequency.setValueAtTime(523, now);
        osc1.frequency.setValueAtTime(659, now + 0.08);
        osc1.frequency.setValueAtTime(784, now + 0.16);
        osc1.frequency.setValueAtTime(880, now + 0.24);
        osc2.frequency.setValueAtTime(523*1.5, now + 0.24);
        osc2.frequency.setValueAtTime(659*1.5, now + 0.32);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        osc1.start(now);
        osc1.stop(now + 0.5);
        osc2.start(now + 0.24);
        osc2.stop(now + 0.5);
    }
    else if(type === 'bulletBounce') {
        // Bullet hits something and bounces
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.setValueAtTime(400, now + 0.05);
        osc.frequency.setValueAtTime(600, now + 0.1);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
    }
    else if(type === 'move') {
        // Movement/engine sound
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(30, now);
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
    }
    else if(type === 'start') {
        // Game start - patriotic
        const notes = [392, 440, 494, 523]; // G A B C
        notes.forEach((freq, idx) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + idx * 0.15);
            gain.gain.setValueAtTime(0.3, now + idx * 0.15);
            gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.15 + 0.3);
            osc.start(now + idx * 0.15);
            osc.stop(now + idx * 0.15 + 0.3);
        });
    }
    else if(type === 'warning') {
        // Warning beep
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'square';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.setValueAtTime(0, now + 0.1);
        osc.frequency.setValueAtTime(880, now + 0.2);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.setValueAtTime(0, now + 0.1);
        gain.gain.setValueAtTime(0.2, now + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
    }
    else if(type === 'countdown') {
        // Countdown beep
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
    }
}

// Levels setup
const levels = [
    { time: 90, name: "قەشقەر مەيدانى" },
    { time: 90, name: "خوتەن مەيدان" },
    { time: 90, name: "ئاقسۇ مەيدان" },
    { time: 90, name: "ئۈرۈمچى مەيدان" }
];

function initCanvas() {
    canvas = document.getElementById('game-canvas');
    ctx = canvas.getContext('2d');
    
    const container = document.querySelector('.canvas-container');
    canvas.width = container.clientWidth - 20;
    canvas.height = container.clientHeight - 20;
}

window.addEventListener('resize', () => {
    if(gameState === 'start' || gameState === 'gameover') initCanvas();
});

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}

function showStartScreen() {
    gameState = 'start';
    showScreen('start-screen');
}

function startGame() {
    const nameInput = document.getElementById('playerName').value.trim();
    if(nameInput) playerName = nameInput;
    
    document.getElementById('display-name').innerText = playerName;
    
    gameState = 'playing';
    showScreen('game-screen');
    
    initCanvas();
    loadImages(); // Load tank and background images
    changeBackgroundImage(); // Set initial random background
    resetGame();
    startKnowledgeRotation();
    setupJoystick();
    initAudio();
    playSound('start'); // Play start sound
    
    if(gameLoop) cancelAnimationFrame(gameLoop);
    requestAnimationFrame(update);
}

function resetGame() {
    score = 0;
    level = 1;
    timeLeft = levels[0].time;
    lastTimeUpdate = Date.now();
    scoreMultiplier = 1;
    hasRapidFire = false;
    hasShield = false;
    document.getElementById('score-text').innerText = score;
    document.getElementById('level-name').innerText = levels[0].name;
    document.getElementById('time-text').innerText = timeLeft;
    document.getElementById('logs-content').innerHTML = '<div class="log-entry">تانكا بېرىلدى، ۋەزىپە باشلاندى!</div>';
    
    player = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        dir: 0, // 0:up, 1:right, 2:down, 3:left
        width: 30,
        height: 40,
        speed: 3, // Slower player speed
        cooldown: 0,
        isMoving: false
    };
    
    enemies = [];
    bullets = [];
    particles = [];
    blocks = [];
    powerUps = [];
    generateMap();
}

function generateMap() {
    blocks = [];
    let numBlocks = 8 + level * 2;
    
    for(let i = 0; i < numBlocks; i++) {
        let rand = Math.random();
        let type;
        let hp = 1;
        
        if(rand < 0.15) { type = 'tree'; hp = 1; } // Tree - destroy with 1 shot
        else if(rand < 0.30) { type = 'stone'; hp = 5; } // Stone - 5 hits
        else if(rand < 0.45) { type = 'water'; hp = 999; } // Water - cannot pass
        else if(rand < 0.60) { type = 'sand'; hp = 1; } // Sand - slower
        else if(rand < 0.75) { type = 'highway'; hp = 999; } // Highway - faster
        else { type = 'wall'; hp = 999; } // Wall - cannot pass
        
        blocks.push({
            x: 60 + Math.random() * (canvas.width - 120),
            y: 60 + Math.random() * (canvas.height - 120),
            type: type,
            width: type === 'highway' ? 60 : 40,
            height: type === 'highway' ? 30 : 40,
            hp: hp,
            maxHp: hp
        });
    }
}

function checkBlockCollision(x, y, w, h) {
    for(let b of blocks) {
        if(Math.abs(x - b.x) < w/2 + b.width/2 && Math.abs(y - b.y) < h/2 + b.height/2) {
            if(b.type === 'water' || b.type === 'wall') return true;
        }
    }
    return false;
}

function getTerrainSpeedMod(x, y) {
    for(let b of blocks) {
        if(Math.abs(x - b.x) < b.width/2 && Math.abs(y - b.y) < b.height/2) {
            if(b.type === 'highway') return 1.5;
            if(b.type === 'sand') return 0.5;
            if(b.type === 'water') return 0;
        }
    }
    return 1;
}

// Input handling
document.addEventListener('keydown', e => { keys[e.key] = true; });
document.addEventListener('keyup', e => { keys[e.key] = false; });

let mobileDir = -1;
let mobileFire = false;
let joystickActive = false;
let joystickStartX = 0;
let joystickStartY = 0;

// Joystick handling for mobile
function setupJoystick() {
    const joystickBase = document.getElementById('joystick-base');
    const joystickStick = document.getElementById('joystick-stick');
    const fireBtn = document.getElementById('fire-btn-large');
    const dirBtns = document.querySelectorAll('.dir-btn');
    
    if (!joystickBase) return;
    
    // Joystick touch handling
    joystickBase.addEventListener('touchstart', handleJoystickStart, { passive: false });
    joystickBase.addEventListener('touchmove', handleJoystickMove, { passive: false });
    joystickBase.addEventListener('touchend', handleJoystickEnd, { passive: false });
    joystickBase.addEventListener('touchcancel', handleJoystickEnd, { passive: false });
    
    // Fire button
    if (fireBtn) {
        fireBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            mobileFire = true;
            fireTank();
        }, { passive: false });
        fireBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            mobileFire = false;
        }, { passive: false });
    }
    
    // Direction buttons
    dirBtns.forEach(btn => {
        btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            mobileDir = parseInt(btn.dataset.dir);
        }, { passive: false });
        btn.addEventListener('touchend', (e) => {
            e.preventDefault();
            mobileDir = -1;
        }, { passive: false });
    });
}

function handleJoystickStart(e) {
    e.preventDefault();
    joystickActive = true;
    const touch = e.touches[0];
    const rect = document.getElementById('joystick-base').getBoundingClientRect();
    joystickStartX = rect.left + rect.width / 2;
    joystickStartY = rect.top + rect.height / 2;
}

function handleJoystickMove(e) {
    e.preventDefault();
    if (!joystickActive) return;
    
    const touch = e.touches[0];
    const stick = document.getElementById('joystick-stick');
    const maxDist = 35;
    
    let dx = touch.clientX - joystickStartX;
    let dy = touch.clientY - joystickStartY;
    let dist = Math.sqrt(dx * dx + dy * dy);
    
    if (dist > maxDist) {
        dx = dx / dist * maxDist;
        dy = dy / dist * maxDist;
    }
    
    if (stick) {
        stick.style.transform = `translate(${dx}px, ${dy}px)`;
    }
    
    // Convert to direction (0=up, 1=right, 2=down, 3=left)
    if (dist > 15) {
        if (Math.abs(dx) > Math.abs(dy)) {
            mobileDir = dx > 0 ? 1 : 3;
        } else {
            mobileDir = dy > 0 ? 2 : 0;
        }
    } else {
        mobileDir = -1;
    }
}

function handleJoystickEnd(e) {
    e.preventDefault();
    joystickActive = false;
    mobileDir = -1;
    const stick = document.getElementById('joystick-stick');
    if (stick) {
        stick.style.transform = 'translate(0px, 0px)';
    }
}

window.setDir = function(dir) { mobileDir = dir; };
window.stopDir = function() { mobileDir = -1; };
window.fireBullet = function() { mobileFire = true; setTimeout(()=>mobileFire=false, 100); };
window.fireTank = function() { mobileFire = true; setTimeout(()=>mobileFire=false, 100); };

function addLog(msg, isKill = false) {
    const logs = document.getElementById('logs-content');
    const div = document.createElement('div');
    div.className = 'log-entry' + (isKill ? ' kill' : '');
    div.innerText = msg;
    logs.insertBefore(div, logs.firstChild);
    if(logs.children.length > 5) logs.removeChild(logs.lastChild);
}

function startKnowledgeRotation() {
    if(knowledgeInterval) clearInterval(knowledgeInterval);
    updateKnowledge();
    knowledgeInterval = setInterval(updateKnowledge, 8000);
}
function updateKnowledge() {
    if(gameState !== 'playing' || isPaused) return;
    let r = Math.floor(Math.random() * knowledgeBase.length);
    let el = document.getElementById('sidebar-content');
    el.style.animation = 'none';
    el.offsetHeight; 
    el.style.animation = 'popIn 0.5s ease';
    el.innerText = knowledgeBase[r];
}

function spawnEnemy() {
    if(Math.random() < 0.003 + (level * 0.001) && enemies.length < 1 + level) {
        let edge = Math.floor(Math.random() * 4);
        let x, y, dir;
        if(edge === 0) { x = Math.random() * canvas.width; y = -40; dir = 2; } // top
        else if(edge === 1) { x = canvas.width + 40; y = Math.random() * canvas.height; dir = 3; } // right
        else if(edge === 2) { x = Math.random() * canvas.width; y = canvas.height + 40; dir = 0; } // bottom
        else { x = -40; y = Math.random() * canvas.height; dir = 1; } // left
        
        enemies.push({ x: x, y: y, dir: dir, speed: 0.3 + (Math.random() * 0.2), cooldown: 180 }); // Slower enemy, slower fire
    }
    
    // Spawn power-ups occasionally
    if(Math.random() < 0.001 && powerUps.length < 2) {
        let type = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
        powerUps.push({
            x: 50 + Math.random() * (canvas.width - 100),
            y: 50 + Math.random() * (canvas.height - 100),
            type: type,
            pulse: 0
        });
    }
}

function shoot(entity, isPlayer) {
    if(entity.cooldown > 0) return;
    let cooldownTime = isPlayer ? (hasRapidFire ? 25 : 40) : 200;
    entity.cooldown = cooldownTime;
    
    let bx = entity.x;
    let by = entity.y;
    let bdx = 0, bdy = 0;
    
    let bulletSpeed = isPlayer ? 8 : 3;
    
    if(entity.dir === 0) { by -= 25; bdy = -bulletSpeed; }
    else if(entity.dir === 1) { bx += 25; bdx = bulletSpeed; }
    else if(entity.dir === 2) { by += 25; bdy = bulletSpeed; }
    else if(entity.dir === 3) { bx -= 25; bdx = -bulletSpeed; }
    
    bullets.push({ x: bx, y: by, dx: bdx, dy: bdy, isPlayer: isPlayer });
    
    // Play shooting sound
    playSound(isPlayer ? 'fire' : 'enemyFire');
}

function createExplosion(x, y, color) {
    for(let i=0; i<15; i++) {
        particles.push({
            x: x, y: y,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 10,
            life: 30 + Math.random() * 20,
            color: color
        });
    }
}

function checkLevelUpByTime() {
    playSound('levelUp');
    if(level < levels.length) {
        let nextLevel = levels[level];
        level++;
        timeLeft = nextLevel.time;
        document.getElementById('level-name').innerText = nextLevel.name;
        document.getElementById('time-text').innerText = timeLeft;
        document.getElementById('level-up-title').innerText = nextLevel.name + "گە كىردۇق!";
        document.getElementById('level-up-text').innerText = "سىز تاجاۋۇزچىلارنى چېكىندۈردىڭىز! ئەمدى كېيىنكى شەھەرنى قوغدايمىز!";
        isPaused = true;
        
        generateMap(); // Generate new map for next level
        enemies = [];
        bullets = [];
        showScreen('level-up-screen');
    } else {
        document.getElementById('level-up-title').innerText = "سىز غەلبە قىلدىڭىز!";
        document.getElementById('level-up-text').innerText = "پۈتۈن ۋەتەننى ئازاد قىلدىڭىز! تەبرىكلەيمىز!";
        isPaused = true;
        showScreen('level-up-screen');
    }
}

function getBlockColor(type) {
    switch(type) {
        case 'tree': return '#22c55e';
        case 'stone': return '#6b7280';
        case 'water': return '#3b82f6';
        case 'sand': return '#d4a574';
        case 'highway': return '#374151';
        default: return '#475569';
    }
}

function getBlockEmoji(type) {
    switch(type) {
        case 'tree': return '🌲';
        case 'stone': return '🪨';
        case 'water': return '💧';
        case 'sand': return '🏜️';
        case 'highway': return '🛣️';
        default: return '🧱';
    }
}

window.resumeGame = function() {
    isPaused = false;
    showScreen('game-screen');
    requestAnimationFrame(update);
}

function gameOver() {
    gameState = 'gameover';
    document.getElementById('final-score').innerText = score;
    showScreen('game-over-screen');
}

function update() {
    if(gameState !== 'playing') return;
    if(!isPaused) {
        // Timer
        if(Date.now() - lastTimeUpdate > 1000) {
            timeLeft--;
            lastTimeUpdate = Date.now();
            document.getElementById('time-text').innerText = timeLeft;
            if(timeLeft <= 0) {
                checkLevelUpByTime();
                return;
            }
        }
        
        // Change background image periodically (every 20 seconds for variety)
        if(backgroundImages.length > 0) {
            if(Date.now() - lastBgChange > 20000) {
                changeBackgroundImage();
                lastBgChange = Date.now();
            }
        }

        // Player movement
        player.isMoving = false;
        let oldX = player.x, oldY = player.y;
        let speedMod = getTerrainSpeedMod(player.x, player.y);
        let moveSpeed = player.speed * speedMod;
        
        if(keys['ArrowUp'] || keys['w'] || mobileDir === 0) { player.y -= moveSpeed; player.dir = 0; player.isMoving = true; }
        else if(keys['ArrowDown'] || keys['s'] || mobileDir === 2) { player.y += moveSpeed; player.dir = 2; player.isMoving = true; }
        else if(keys['ArrowLeft'] || keys['a'] || mobileDir === 3) { player.x -= moveSpeed; player.dir = 3; player.isMoving = true; }
        else if(keys['ArrowRight'] || keys['d'] || mobileDir === 1) { player.x += moveSpeed; player.dir = 1; player.isMoving = true; }
        
        if(checkBlockCollision(player.x, player.y, 24, 40)) { player.x = oldX; player.y = oldY; }
        
        // Bounds
        if(player.x < 15) player.x = 15;
        if(player.x > canvas.width - 15) player.x = canvas.width - 15;
        if(player.y < 20) player.y = 20;
        if(player.y > canvas.height - 20) player.y = canvas.height - 20;
        
if(player.cooldown > 0) player.cooldown--;
if(keys[' '] || mobileFire) shoot(player, true);

// Collect power-ups
for(let i = powerUps.length - 1; i >= 0; i--) {
    let p = powerUps[i];
    let dist = Math.sqrt((player.x - p.x) ** 2 + (player.y - p.y) ** 2);
    if(dist < 35) {
        let type = p.type;
        createExplosion(p.x, p.y, type.color);
        playSound('collect');
        
        if(type.name === "تېز ئاتىش") {
            hasRapidFire = true;
            if(rapidFireTimeout) clearTimeout(rapidFireTimeout);
            rapidFireTimeout = setTimeout(() => { hasRapidFire = false; }, type.duration);
            addLog("⚡ تېز ئاتىش! 8 سېكۇند!", true);
        } else if(type.name === "قەلب قورۇنى") {
            hasShield = true;
            playSound('shield');
            addLog("🛡️ قەلب قورۇنىنىڭىز بار!", true);
        } else if(type.name === "3X پوئېنت") {
            scoreMultiplier = 3;
            setTimeout(() => { scoreMultiplier = 1; }, type.duration);
            addLog("⭐ 3X پوئېنت! 15 سېكۇند!", true);
        }
        
        powerUps.splice(i, 1);
    }
}
        
        // Enemies
        spawnEnemy();
        for(let i = enemies.length - 1; i >= 0; i--) {
            let e = enemies[i];
            
            // Move toward player slowly - tanks don't move fast!
            let eOldX = e.x, eOldY = e.y;
            let eSpeedMod = getTerrainSpeedMod(e.x, e.y);
            let eMoveSpeed = e.speed * eSpeedMod;
            
            if(Math.abs(e.x - player.x) > Math.abs(e.y - player.y)) {
                if(e.x < player.x) { e.x += eMoveSpeed; e.dir = 1; }
                else { e.x -= eMoveSpeed; e.dir = 3; }
            } else {
                if(e.y < player.y) { e.y += eMoveSpeed; e.dir = 2; }
                else { e.y -= eMoveSpeed; e.dir = 0; }
            }
            if(checkBlockCollision(e.x, e.y, 24, 40)) {
                e.x = eOldX;
                e.y = eOldY;
            }
            
            // Enemy shooting - slower! real tanks take time to reload
            if(e.cooldown > 0) e.cooldown--;
            if(Math.random() < 0.002 && e.cooldown === 0) {
                // Only shoot if roughly facing player
                shoot(e, false);
            }
            
            // Collision with player
            if(Math.abs(e.x - player.x) < 30 && Math.abs(e.y - player.y) < 30) {
                if(hasShield) {
                    hasShield = false;
                    createExplosion(e.x, e.y, '#60a5fa');
                    createExplosion(player.x, player.y, '#60a5fa');
                    playSound('shield');
                    addLog("🛡️ قەلب قورۇنى قويۇپ بەردىڭىز!", true);
                } else {
                    createExplosion(player.x, player.y, '#3b82f6');
                    playSound('gameOver');
                    gameOver();
                    return;
                }
            }
        }
        
        // Bullets Collision
        for(let i = 0; i < bullets.length; i++) {
            let b1 = bullets[i];
            if(b1.destroyed) continue;
            
            b1.x += b1.dx;
            b1.y += b1.dy;
            
            // Out of bounds
            if(b1.x < 0 || b1.x > canvas.width || b1.y < 0 || b1.y > canvas.height) {
                b1.destroyed = true;
                continue;
            }
            
            // Block collision
            let hitBlock = false;
            for(let k = blocks.length - 1; k >= 0; k--) {
                let blk = blocks[k];
                if(Math.abs(b1.x - blk.x) < blk.width/2 + 5 && Math.abs(b1.y - blk.y) < blk.height/2 + 5) {
                    createExplosion(b1.x, b1.y, '#94a3b8');
                    b1.destroyed = true;
                    hitBlock = true;
                    
                    // Damage block
                    if(blk.hp > 0) {
                        blk.hp--;
                        playSound('hit');
                        if(blk.hp <= 0) {
                            createExplosion(blk.x, blk.y, getBlockColor(blk.type));
                            playSound('destroy');
                            if(blk.type === 'tree' || blk.type === 'stone') {
                                addLog(`${getBlockEmoji(blk.type)} ${blk.type} destroyed!`, true);
                            }
                            blocks.splice(k, 1);
                        }
                    }
                    break;
                }
            }
            if(hitBlock) continue;
            
            // Bullet vs Bullet collision
            for(let j = i + 1; j < bullets.length; j++) {
                let b2 = bullets[j];
                if(b2.destroyed) continue;
                if(b1.isPlayer !== b2.isPlayer && Math.abs(b1.x - b2.x) < 15 && Math.abs(b1.y - b2.y) < 15) {
                    createExplosion((b1.x+b2.x)/2, (b1.y+b2.y)/2, '#f59e0b'); // Spark explosion
                    b1.destroyed = true;
                    b2.destroyed = true;
                    break;
                }
            }
            if(b1.destroyed) continue;

            // Hit enemy
            if(b1.isPlayer) {
                for(let j = enemies.length - 1; j >= 0; j--) {
                    let e = enemies[j];
                    if(Math.abs(b1.x - e.x) < 35 && Math.abs(b1.y - e.y) < 35) {
                        createExplosion(e.x, e.y, '#ef4444');
                        playSound('explosion');
                        enemies.splice(j, 1);
                        b1.destroyed = true;
                        score += scoreMultiplier;
                        document.getElementById('score-text').innerText = score;
                        addLog(`تانكا باشلىقى ${playerName} تاجاۋۇزچىنى ۋەيران قىلدى!`, true);
                        if(scoreMultiplier > 1) {
                            addLog(`+${scoreMultiplier} پوئېنت!`, true);
                        }
                        break;
                    }
                }
            } else {
                // Hit player
                if(Math.abs(b1.x - player.x) < 12 && Math.abs(b1.y - player.y) < 12) {
                    createExplosion(player.x, player.y, '#3b82f6');
                    playSound('gameOver');
                    gameOver();
                    return;
                }
            }
        }
        bullets = bullets.filter(b => !b.destroyed);
        
        // Particles
        for(let i = particles.length - 1; i >= 0; i--) {
            let p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life--;
            if(p.life <= 0) particles.splice(i, 1);
        }
    }
    
    draw();
    if(gameState === 'playing') requestAnimationFrame(update);
}

function drawTank(x, y, dir, isPlayer) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(dir * Math.PI/2);
    
    // Tracks
    ctx.fillStyle = '#334155';
    ctx.fillRect(-18, -25, 8, 50);
    ctx.fillRect(10, -25, 8, 50);
    
    // Body
    ctx.fillStyle = isPlayer ? '#2563eb' : '#b91c1c';
    ctx.fillRect(-12, -20, 24, 40);
    
    // Turret
    ctx.fillStyle = isPlayer ? '#1e3a8a' : '#7f1d1d';
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI*2);
    ctx.fill();
    
    // Gun
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-2, -30, 4, 30);
    
    // Emblem
    if(isPlayer) {
        ctx.fillStyle = 'white';
        ctx.beginPath(); ctx.arc(0, 5, 4, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = '#2563eb';
        ctx.beginPath(); ctx.arc(1, 4, 3, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = 'white';
        ctx.font = "6px Arial";
        ctx.fillText("★", 1, 1);
    }
    
    ctx.restore();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background image with low opacity (randomly changed)
    if(backgroundImages[currentBgIndex] && backgroundImages[currentBgIndex].complete) {
        ctx.save();
        ctx.globalAlpha = 0.15; // Low opacity for background
        ctx.drawImage(backgroundImages[currentBgIndex], 0, 0, canvas.width, canvas.height);
        ctx.restore();
    }
    
    // Grid overlay for combat feel
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for(let i=0; i<canvas.width; i+=40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke(); }
    for(let i=0; i<canvas.height; i+=40) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke(); }
    
    // Draw Blocks
    blocks.forEach(b => {
        let color = getBlockColor(b.type);
        ctx.fillStyle = color;
        
        if(b.type === 'tree') {
            // Draw tree
            ctx.beginPath();
            ctx.moveTo(b.x, b.y - 20);
            ctx.lineTo(b.x - 15, b.y + 15);
            ctx.lineTo(b.x + 15, b.y + 15);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = '#78350f';
            ctx.fillRect(b.x - 3, b.y + 10, 6, 10);
        } else if(b.type === 'stone') {
            // Draw stone with cracks based on HP
            ctx.beginPath();
            ctx.ellipse(b.x, b.y, b.width/2, b.height/2 - 5, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#4b5563';
            ctx.lineWidth = 2;
            if(b.maxHp - b.hp > 0) {
                ctx.beginPath();
                ctx.moveTo(b.x - 10, b.y - 5);
                ctx.lineTo(b.x + 5, b.y + 5);
                ctx.stroke();
            }
            if(b.maxHp - b.hp > 2) {
                ctx.beginPath();
                ctx.moveTo(b.x + 8, b.y - 8);
                ctx.lineTo(b.x - 2, b.y + 8);
                ctx.stroke();
            }
        } else if(b.type === 'water') {
            // Draw water with waves
            ctx.fillRect(b.x - b.width/2, b.y - b.height/2, b.width, b.height);
            ctx.strokeStyle = '#60a5fa';
            ctx.lineWidth = 2;
            for(let w = -2; w <= 2; w++) {
                ctx.beginPath();
                ctx.moveTo(b.x - b.width/2 + 5, b.y + w * 8);
                ctx.quadraticCurveTo(b.x, b.y + w * 8 + 4, b.x + b.width/2 - 5, b.y + w * 8);
                ctx.stroke();
            }
        } else if(b.type === 'sand') {
            // Draw sand with dots
            ctx.fillRect(b.x - b.width/2, b.y - b.height/2, b.width, b.height);
            ctx.fillStyle = '#b8956e';
            for(let d = 0; d < 5; d++) {
                ctx.beginPath();
                ctx.arc(b.x - 10 + d * 8, b.y - 5 + (d % 2) * 10, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        } else if(b.type === 'highway') {
            // Draw highway with stripes
            ctx.fillRect(b.x - b.width/2, b.y - b.height/2, b.width, b.height);
            ctx.fillStyle = '#fbbf24';
            ctx.setLineDash([8, 8]);
            ctx.beginPath();
            ctx.moveTo(b.x - b.width/2 + 5, b.y);
            ctx.lineTo(b.x + b.width/2 - 5, b.y);
            ctx.stroke();
            ctx.setLineDash([]);
        } else {
            // Normal wall
            ctx.fillRect(b.x - b.width/2, b.y - b.height/2, b.width, b.height);
            ctx.strokeStyle = '#64748b';
            ctx.lineWidth = 2;
            ctx.strokeRect(b.x - b.width/2, b.y - b.height/2, b.width, b.height);
        }
    });
    
    // Draw Power-ups
    powerUps.forEach(p => {
        p.pulse += 0.1;
        let scale = 1 + Math.sin(p.pulse) * 0.15;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.scale(scale, scale);
        
        ctx.fillStyle = p.type.color;
        ctx.shadowBlur = 20;
        ctx.shadowColor = p.type.color;
        ctx.beginPath();
        ctx.arc(0, 0, 15, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = 'white';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.type.symbol, 0, 0);
        
        ctx.restore();
    });
    
    // Draw player shield glow if active
    if(hasShield) {
        ctx.strokeStyle = '#60a5fa';
        ctx.lineWidth = 3;
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#60a5fa';
        ctx.beginPath();
        ctx.arc(player.x, player.y, 25, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;
    }
    
    // Enemies
    enemies.forEach(e => drawTank(e.x, e.y, e.dir, false));
    
    // Player
    if(gameState !== 'gameover') drawTank(player.x, player.y, player.dir, true);
    
    // Bullets
    bullets.forEach(b => {
        ctx.fillStyle = b.isPlayer ? '#fbbf24' : '#f87171';
        ctx.beginPath();
        ctx.arc(b.x, b.y, 4, 0, Math.PI*2);
        ctx.fill();
        ctx.shadowBlur = 10;
        ctx.shadowColor = ctx.fillStyle;
        ctx.fill();
        ctx.shadowBlur = 0;
    });
    
    // Particles
    particles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life / 50;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2 + Math.random()*2, 0, Math.PI*2);
        ctx.fill();
    });
    ctx.globalAlpha = 1;
}
