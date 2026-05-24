const knowledgeBase = [
    "يۈسۈپ خاس ھاجىپنىڭ «قۇتادغۇبىلىك» ئەسىرىدە، ئادالەت ۋە بىلىمنىڭ ئەڭ كۈچلۈك قورال ئىكەنلىكى ئېيتىلغان.",
    "مەھمۇد قەشقىرى «دىۋان لۇغەت تۈرك» ئارقىلىق مىللىتىمىزنىڭ بىلىم ۋە مەدەنىيىتىنى دۇنياغا تونۇتقان.",
    "سۇلتان سۇتۇق بۇغراخان ئىسلام نۇرىنى قوبۇل قىلىپ، باتۇرلۇقى بىلەن خەلقىمىزنى نادانلىقتىن قۇتۇلدۇرغان.",
    "سەئىدخان ئۆزىنىڭ يۈكسەك ئىرادىسى، قەيسەرلىكى ۋە شىجائىتى بىلەن يېڭى بىر مەدەنىيەت دۆلىتىنى قۇرۇپ چىققان.",
    "سابىت داموللام ئىسلام شەرىئىتى ۋە زامانىۋى بىلىملەرنى بىرلەشتۈرۈپ، قورقماس باتۇرلۇقى بىلەن خەلقنى ئويغاتقان.",
    "ماتېماتىكا مەشىقى: تانكىمىزدا 10 ئوق بار، ھەر قېتىمدا 2 ئوقتىن ئاتساق قانچە قېتىم ئاتالايمىز؟ 5 قېتىم! ئەقىللىق!",
    "ئەخلاق: ۋەتەننى سۆيۈش ئىماندىندۇر. تاجاۋۇزچىلارغا قارشى تۇرۇش، ھەق ئۈچۈن كۈرەش قىلىش مۇسۇلماننىڭ بۇرچىدۇر.",
    "ئەرەبچە ھىكمەت: «الجنة تحت ظلال السيوف» - يەنى جەننەت قىلىچلارنىڭ سايىسى ئاستىدىدۇر.",
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
let floatingTexts = [];
let keys = {};
let smokeParticles = [];
let bulletTrails = [];

let score = 0;
let killCount = 0;
let combo = 0;
let bestCombo = 0;
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

// Screen shake
let shakeAmount = 0;
let shakeDecay = 0.9;

// Muzzle flash
let muzzleFlash = 0;

// Background images
let backgroundImages = [];
let currentBgIndex = 0;

function loadImages() {
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

const powerUpTypes = [
    { name: "تېز ئاتىش", color: "#fbbf24", duration: 8000, symbol: "⚡" },
    { name: "قەلب قورۇنى", color: "#60a5fa", duration: 10000, symbol: "🛡️" },
    { name: "3X پوئېنت", color: "#10b981", duration: 15000, symbol: "⭐" }
];
let scoreMultiplier = 1;
let scoreMultTimer = 0;

// Sound Effects
let audioCtx = null;
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
    else if(type === 'playerHit') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'square';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(60, now + 0.4);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
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
        osc.frequency.setValueAtTime(880, now + 0.45);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
        osc.start(now);
        osc.stop(now + 0.6);
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
    else if(type === 'combo') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(659, now);
        osc.frequency.setValueAtTime(880, now + 0.1);
        osc.frequency.setValueAtTime(1047, now + 0.2);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
    }
    else if(type === 'start') {
        const notes = [392, 440, 494, 523];
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
}

// Levels setup
const levels = [
    { time: 90, name: "قەشقەر مەيدانى", enemyCount: 5 },
    { time: 90, name: "خوتەن مەيدان", enemyCount: 8 },
    { time: 90, name: "ئاقسۇ مەيدان", enemyCount: 10 },
    { time: 90, name: "ئۈرۈمچى مەيدان", enemyCount: 12 }
];

const enemyTypes = [
    { name: 'normal', color: '#b91c1c', hp: 1, speed: 0.3, size: 1, score: 1, symbol: '' },
    { name: 'fast', color: '#ea580c', hp: 1, speed: 0.6, size: 0.8, score: 2, symbol: '⚡' },
    { name: 'heavy', color: '#7c3aed', hp: 3, speed: 0.2, size: 1.2, score: 3, symbol: '🛡️' },
    { name: 'boss', color: '#dc2626', hp: 5, speed: 0.15, size: 1.5, score: 5, symbol: '👑' }
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
    loadImages();
    changeBackgroundImage();
    resetGame();
    startKnowledgeRotation();
    setupJoystick();
    initAudio();
    playSound('start');
    
    if(gameLoop) cancelAnimationFrame(gameLoop);
    requestAnimationFrame(update);
}

function resetGame() {
    score = 0;
    killCount = 0;
    combo = 0;
    bestCombo = 0;
    level = 1;
    timeLeft = levels[0].time;
    lastTimeUpdate = Date.now();
    scoreMultiplier = 1;
    scoreMultTimer = 0;
    hasRapidFire = false;
    hasShield = false;
    shakeAmount = 0;
    muzzleFlash = 0;
    bulletTrails = [];
    floatingTexts = [];
    smokeParticles = [];
    
    document.getElementById('score-text').innerText = score;
    document.getElementById('level-name').innerText = levels[0].name;
    document.getElementById('time-text').innerText = timeLeft;
    document.getElementById('logs-content').innerHTML = '<div class="log-entry">تانكا بېرىلدى، ۋەزىپە باشلاندى!</div>';
    
    // Update HP display
    updateHpDisplay();
    
    // Update combo
    updateComboDisplay();
    
    player = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        dir: 0,
        width: 30,
        height: 40,
        speed: 3,
        cooldown: 0,
        hp: 3,
        maxHp: 3,
        invincibleTimer: 0,
        isMoving: false
    };
    
    enemies = [];
    bullets = [];
    particles = [];
    blocks = [];
    powerUps = [];
    generateMap();
}

function updateHpDisplay() {
    if(!player) return;
    const hpEl = document.getElementById('hp-text');
    if(hpEl) {
        let hearts = '';
        for(let i = 0; i < player.maxHp; i++) {
            hearts += i < player.hp ? '❤️' : '🖤';
        }
        hpEl.innerText = hearts;
    }
}

function updateComboDisplay() {
    const comboEl = document.getElementById('combo-text-val');
    const comboBox = document.getElementById('combo-box');
    if(!comboEl || !comboBox) return;
    if(combo >= 2) {
        comboEl.innerText = combo + '× 🔥';
        comboBox.classList.remove('hidden');
    } else {
        comboBox.classList.add('hidden');
    }
}

function generateMap() {
    blocks = [];
    let numBlocks = 8 + level * 2;
    
    for(let i = 0; i < numBlocks; i++) {
        let rand = Math.random();
        let type;
        let hp = 1;
        
        if(rand < 0.15) { type = 'tree'; hp = 1; }
        else if(rand < 0.30) { type = 'stone'; hp = 5; }
        else if(rand < 0.45) { type = 'water'; hp = 999; }
        else if(rand < 0.60) { type = 'sand'; hp = 1; }
        else if(rand < 0.75) { type = 'highway'; hp = 999; }
        else { type = 'wall'; hp = 999; }
        
        blocks.push({
            x: 60 + Math.random() * (canvas.width - 120),
            y: 60 + Math.random() * (canvas.height - 120),
            type: type,
            width: type === 'highway' ? 60 : 40,
            height: type === 'highway' ? 30 : 40,
            hp: hp,
            maxHp: hp,
            animOffset: Math.random() * Math.PI * 2
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

function setupJoystick() {
    const joystickBase = document.getElementById('joystick-base');
    const joystickStick = document.getElementById('joystick-stick');
    const fireBtn = document.getElementById('fire-btn-large');
    const dirBtns = document.querySelectorAll('.dir-btn');
    
    if (!joystickBase) return;
    
    joystickBase.addEventListener('touchstart', handleJoystickStart, { passive: false });
    joystickBase.addEventListener('touchmove', handleJoystickMove, { passive: false });
    joystickBase.addEventListener('touchend', handleJoystickEnd, { passive: false });
    joystickBase.addEventListener('touchcancel', handleJoystickEnd, { passive: false });
    
    if (fireBtn) {
        fireBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            mobileFire = true;
            shoot(player, true);
        }, { passive: false });
        fireBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            mobileFire = false;
        }, { passive: false });
    }
    
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
    const maxEnemies = levels[level > levels.length ? levels.length : level - 1]?.enemyCount || 8;
    if(Math.random() < 0.005 + (level * 0.002) && enemies.length < maxEnemies) {
        let edge = Math.floor(Math.random() * 4);
        let x, y, dir;
        if(edge === 0) { x = Math.random() * canvas.width; y = -40; dir = 2; }
        else if(edge === 1) { x = canvas.width + 40; y = Math.random() * canvas.height; dir = 3; }
        else if(edge === 2) { x = Math.random() * canvas.width; y = canvas.height + 40; dir = 0; }
        else { x = -40; y = Math.random() * canvas.height; dir = 1; }
        
        // Choose enemy type based on level
        let typeIdx = 0;
        if(level >= 2 && Math.random() < 0.2) typeIdx = 1; // fast
        if(level >= 3 && Math.random() < 0.15) typeIdx = 2; // heavy
        if(level >= 4 && Math.random() < 0.05) typeIdx = 3; // boss
        
        const eType = enemyTypes[typeIdx];
        enemies.push({
            x: x, y: y, dir: dir,
            speed: eType.speed + (Math.random() * 0.1),
            cooldown: 180 + Math.floor(Math.random() * 60),
            type: eType,
            hp: eType.hp,
            maxHp: eType.hp,
            hitFlash: 0
        });
    }
    
    // Spawn power-ups
    if(Math.random() < 0.002 && powerUps.length < 2) {
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
    let cooldownTime = isPlayer ? (hasRapidFire ? 25 : 40) : 180;
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
    playSound(isPlayer ? 'fire' : 'enemyFire');
    
    // Muzzle flash
    if(isPlayer) {
        muzzleFlash = 8;
    }
    
    // Bullet trail smoke
    for(let i = 0; i < 3; i++) {
        bulletTrails.push({
            x: bx + (Math.random() - 0.5) * 6,
            y: by + (Math.random() - 0.5) * 6,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            life: 10 + Math.random() * 5,
            maxLife: 15,
            color: isPlayer ? '#fbbf24' : '#f87171'
        });
    }
}

function addFloatingText(x, y, text, color) {
    floatingTexts.push({
        x: x, y: y,
        text: text,
        color: color || '#ffffff',
        life: 40,
        maxLife: 40,
        vy: -2
    });
}

function createExplosion(x, y, color, big) {
    const count = big ? 30 : 15;
    for(let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * (big ? 8 : 5);
        particles.push({
            x: x, y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 30 + Math.random() * 20,
            maxLife: 50,
            color: color,
            size: 2 + Math.random() * (big ? 4 : 2)
        });
    }
    // Smoke particles
    for(let i = 0; i < (big ? 10 : 5); i++) {
        smokeParticles.push({
            x: x + (Math.random() - 0.5) * 10,
            y: y + (Math.random() - 0.5) * 10,
            vx: (Math.random() - 0.5) * 1.5,
            vy: -0.5 - Math.random() * 1.5,
            life: 40 + Math.random() * 30,
            maxLife: 70,
            size: 5 + Math.random() * 10
        });
    }
    if(big) {
        shakeAmount = 15;
    } else {
        shakeAmount = Math.max(shakeAmount, 5);
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
        
        addLog(`🏁 يېڭى مەيدان: ${nextLevel.name}`, true);
        
        generateMap();
        enemies = [];
        bullets = [];
        showScreen('level-up-screen');
    } else {
        document.getElementById('level-up-title').innerText = "سىز غەلبە قىلدىڭىز!";
        document.getElementById('level-up-text').innerText = "پۈتۈن ۋەتەننى ئازاد قىلدىڭىز! تەبرىكلەيمىز!";
        isPaused = true;
        addLog("🏆 غەلبە! پۈتۈن ۋەتەن ئازاد!", true);
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
    // Loop is already running via the update() animate chain
}

function gameOver() {
    gameState = 'gameover';
    document.getElementById('final-score').innerText = score;
    document.getElementById('final-kills').innerText = killCount;
    document.getElementById('final-combo').innerText = bestCombo + '×';
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
        
        // Background change
        if(backgroundImages.length > 0) {
            if(Date.now() - lastBgChange > 20000) {
                changeBackgroundImage();
                lastBgChange = Date.now();
            }
        }

        // Power-up timer
        if(scoreMultTimer > 0) {
            scoreMultTimer--;
            if(scoreMultTimer <= 0) {
                scoreMultiplier = 1;
                document.getElementById('powerup-indicator').classList.add('hidden');
            }
        }
        
        // Shield from rapid fire: no, shield is separate
        
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
        const margin = 20;
        if(player.x < margin) player.x = margin;
        if(player.x > canvas.width - margin) player.x = canvas.width - margin;
        if(player.y < margin) player.y = margin;
        if(player.y > canvas.height - margin) player.y = canvas.height - margin;
        
        if(player.cooldown > 0) player.cooldown--;
        if(keys[' '] || mobileFire) shoot(player, true);
        
        if(player.invincibleTimer > 0) player.invincibleTimer--;
        
        // Collect power-ups
        for(let i = powerUps.length - 1; i >= 0; i--) {
            let p = powerUps[i];
            let dist = Math.sqrt((player.x - p.x) ** 2 + (player.y - p.y) ** 2);
            if(dist < 35) {
                let type = p.type;
                createExplosion(p.x, p.y, type.color, false);
                playSound('collect');
                addFloatingText(p.x, p.y - 20, type.symbol + ' ' + type.name, type.color);
                
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
                    scoreMultTimer = 900; // ~15 seconds at 60fps
                    document.getElementById('powerup-indicator').classList.remove('hidden');
                    addLog("⭐ 3X پوئېنت! 15 سېكۇند!", true);
                }
                
                powerUps.splice(i, 1);
            }
        }
        
        // Enemies
        spawnEnemy();
        for(let i = enemies.length - 1; i >= 0; i--) {
            let e = enemies[i];
            
            if(e.hitFlash > 0) e.hitFlash--;
            
            let eOldX = e.x, eOldY = e.y;
            let eSpeedMod = getTerrainSpeedMod(e.x, e.y);
            let eMoveSpeed = e.speed * eSpeedMod;
            
            // Move toward player
            if(Math.abs(e.x - player.x) > Math.abs(e.y - player.y)) {
                if(e.x < player.x) { e.x += eMoveSpeed; e.dir = 1; }
                else { e.x -= eMoveSpeed; e.dir = 3; }
            } else {
                if(e.y < player.y) { e.y += eMoveSpeed; e.dir = 2; }
                else { e.y -= eMoveSpeed; e.dir = 0; }
            }
            if(checkBlockCollision(e.x, e.y, 24 * e.type.size, 40 * e.type.size)) {
                e.x = eOldX;
                e.y = eOldY;
            }
            
            // Enemy shooting
            if(e.cooldown > 0) e.cooldown--;
            if(Math.random() < (e.type.name === 'boss' ? 0.005 : 0.002) && e.cooldown === 0) {
                shoot(e, false);
            }
            
            // Collision with player
            const collDist = 30 * e.type.size;
            if(Math.abs(e.x - player.x) < collDist && Math.abs(e.y - player.y) < collDist) {
                if(player.invincibleTimer <= 0) {
                    takeDamage(e.x, e.y);
                }
            }
        }
        
        // Bullets
        for(let i = 0; i < bullets.length; i++) {
            let b1 = bullets[i];
            if(b1.destroyed) continue;
            
            b1.x += b1.dx;
            b1.y += b1.dy;
            
            // Bullet trail
            if(Math.random() < 0.3) {
                bulletTrails.push({
                    x: b1.x + (Math.random() - 0.5) * 4,
                    y: b1.y + (Math.random() - 0.5) * 4,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    life: 8 + Math.random() * 4,
                    maxLife: 12,
                    color: b1.isPlayer ? '#fbbf24' : '#f87171'
                });
            }
            
            // Out of bounds
            if(b1.x < -20 || b1.x > canvas.width + 20 || b1.y < -20 || b1.y > canvas.height + 20) {
                b1.destroyed = true;
                continue;
            }
            
            // Block collision
            let hitBlock = false;
            for(let k = blocks.length - 1; k >= 0; k--) {
                let blk = blocks[k];
                if(Math.abs(b1.x - blk.x) < blk.width/2 + 5 && Math.abs(b1.y - blk.y) < blk.height/2 + 5) {
                    createExplosion(b1.x, b1.y, '#94a3b8', false);
                    b1.destroyed = true;
                    hitBlock = true;
                    
                    if(blk.hp > 0 && blk.hp < 999) {
                        blk.hp--;
                        playSound('hit');
                        if(blk.hp <= 0) {
                            createExplosion(blk.x, blk.y, getBlockColor(blk.type), true);
                            playSound('destroy');
                            if(blk.type === 'tree' || blk.type === 'stone') {
                                addLog(`${getBlockEmoji(blk.type)} ${blk.type} ۋەيران!`, true);
                            }
                            blocks.splice(k, 1);
                        }
                    }
                    break;
                }
            }
            if(hitBlock) continue;
            
            // Bullet vs Bullet
            for(let j = i + 1; j < bullets.length; j++) {
                let b2 = bullets[j];
                if(b2.destroyed) continue;
                if(b1.isPlayer !== b2.isPlayer && Math.abs(b1.x - b2.x) < 15 && Math.abs(b1.y - b2.y) < 15) {
                    createExplosion((b1.x+b2.x)/2, (b1.y+b2.y)/2, '#f59e0b', false);
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
                    const hitDist = 25 * e.type.size;
                    if(Math.abs(b1.x - e.x) < hitDist && Math.abs(b1.y - e.y) < hitDist) {
                        b1.destroyed = true;
                        e.hp--;
                        e.hitFlash = 8;
                        playSound('hit');
                        
                        if(e.hp <= 0) {
                            createExplosion(e.x, e.y, e.type.color, e.type.name === 'boss');
                            playSound('explosion');
                            
                            // Combo
                            combo++;
                            if(combo > bestCombo) bestCombo = combo;
                            updateComboDisplay();
                            
                            // Score with combo multiplier
                            const comboMult = Math.min(combo, 5);
                            const points = e.type.score * scoreMultiplier * comboMult;
                            score += points;
                            killCount++;
                            
                            document.getElementById('score-text').innerText = score;
                            
                            addFloatingText(e.x, e.y - 30, '+' + points + (scoreMultiplier > 1 ? ' ×' + scoreMultiplier : '') + (combo >= 2 ? ' 🔥' + combo : ''), '#fbbf24');
                            addLog(`💥 ${e.type.name} تانكىسى ۋەيران! +${points}`, true);
                            
                            if(combo >= 3) {
                                playSound('combo');
                                addFloatingText(e.x, e.y - 60, '🔥 ' + combo + '× كومبو!', '#ff6b6b');
                            }
                            
                            enemies.splice(j, 1);
                        } else {
                            addFloatingText(e.x, e.y - 20, '💢', '#ffffff');
                            createExplosion(b1.x, b1.y, '#fbbf24', false);
                        }
                        break;
                    }
                }
            } else {
                // Hit player
                if(Math.abs(b1.x - player.x) < 15 && Math.abs(b1.y - player.y) < 15) {
                    b1.destroyed = true;
                    if(player.invincibleTimer <= 0) {
                        takeDamage(b1.x, b1.y);
                    }
                }
            }
        }
        bullets = bullets.filter(b => !b.destroyed);
        
        // Particles
        for(let i = particles.length - 1; i >= 0; i--) {
            let p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.05; // gravity
            p.life--;
            if(p.life <= 0) particles.splice(i, 1);
        }
        
        // Smoke particles
        for(let i = smokeParticles.length - 1; i >= 0; i--) {
            let s = smokeParticles[i];
            s.x += s.vx;
            s.y += s.vy;
            s.vx *= 0.98;
            s.vy *= 0.98;
            s.life--;
            if(s.life <= 0) smokeParticles.splice(i, 1);
        }
        
        // Bullet trails
        for(let i = bulletTrails.length - 1; i >= 0; i--) {
            let t = bulletTrails[i];
            t.x += t.vx;
            t.y += t.vy;
            t.life--;
            if(t.life <= 0) bulletTrails.splice(i, 1);
        }
        
        // Floating texts
        for(let i = floatingTexts.length - 1; i >= 0; i--) {
            let f = floatingTexts[i];
            f.y += f.vy;
            f.vy *= 0.95;
            f.life--;
            if(f.life <= 0) floatingTexts.splice(i, 1);
        }
        
        // Shake decay
        if(shakeAmount > 0) shakeAmount *= shakeDecay;
        if(shakeAmount < 0.5) shakeAmount = 0;
        
        // Muzzle flash decay
        if(muzzleFlash > 0) muzzleFlash--;
    }
    
    draw();
    if(gameState === 'playing') requestAnimationFrame(update);
}

function takeDamage(sourceX, sourceY) {
    if(player.invincibleTimer > 0) return;
    
    if(hasShield) {
        hasShield = false;
        createExplosion(player.x, player.y, '#60a5fa', true);
        playSound('shield');
        addLog("🛡️ قەلب قورۇنى سىڭدى!", true);
        player.invincibleTimer = 20;
        return;
    }
    
    player.hp--;
    player.invincibleTimer = 60; // ~1 second invincibility
    createExplosion(player.x, player.y, '#f87171', false);
    playSound('playerHit');
    shakeAmount = 10;
    updateHpDisplay();
    
    combo = 0;
    updateComboDisplay();
    
    addFloatingText(player.x, player.y - 20, '💔', '#ff4444');
    addLog("💔 تانكا زەخمىلەندى! قالغان ھايات: " + "❤️".repeat(player.hp) + "🖤".repeat(player.maxHp - player.hp), true);
    
    if(player.hp <= 0) {
        createExplosion(player.x, player.y, '#3b82f6', true);
        playSound('gameOver');
        gameOver();
    }
}

function drawTank(x, y, dir, isPlayer, enemyType) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(dir * Math.PI/2);
    
    const size = enemyType ? enemyType.size : 1;
    const w = 24 * size;
    const h = 40 * size;
    const color = isPlayer ? '#2563eb' : (enemyType ? enemyType.color : '#b91c1c');
    const darkColor = isPlayer ? '#1e3a8a' : (enemyType ? '#000000' : '#7f1d1d');
    const trackColor = isPlayer ? '#1e293b' : '#1c1917';
    
    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath();
    ctx.ellipse(0, h/2 + 5, w/2 + 4, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Tracks
    ctx.fillStyle = trackColor;
    ctx.fillRect(-w/2 - 4, -h/2, 8, h);
    ctx.fillRect(w/2 - 4, -h/2, 8, h);
    
    // Track details
    ctx.strokeStyle = isPlayer ? '#334155' : '#292524';
    ctx.lineWidth = 1;
    for(let i = -h/2 + 4; i < h/2 - 4; i += 6) {
        ctx.beginPath();
        ctx.moveTo(-w/2 - 3, i);
        ctx.lineTo(-w/2 + 5, i);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(w/2 - 5, i);
        ctx.lineTo(w/2 + 3, i);
        ctx.stroke();
    }
    
    // Body
    ctx.fillStyle = color;
    ctx.fillRect(-w/2 + 4, -h/2 + 4, w - 8, h - 8);
    
    // Body highlight
    ctx.fillStyle = isPlayer ? '#3b82f6' : (enemyType ? lightenColor(enemyType.color, 30) : '#ef4444');
    ctx.fillRect(-w/2 + 6, -h/2 + 6, (w - 12) / 2, h - 12);
    
    // Turret base (circle)
    const turretR = w/2 - 2;
    ctx.fillStyle = darkColor;
    ctx.beginPath();
    ctx.arc(0, 0, turretR, 0, Math.PI*2);
    ctx.fill();
    
    // Turret top
    ctx.fillStyle = isPlayer ? '#1d4ed8' : (enemyType ? darkenColor(enemyType.color, 20) : '#991b1b');
    ctx.beginPath();
    ctx.arc(0, -2, turretR - 4, 0, Math.PI*2);
    ctx.fill();
    
    // Gun barrel
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-3, -h/2 - 4, 6, h/2 + 4);
    ctx.fillStyle = '#334155';
    ctx.fillRect(-2, -h/2 - 2, 4, 4);
    
    // Boss special: extra gun
    if(enemyType && enemyType.name === 'boss') {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(-8, -h/2 - 6, 4, h/2 - 10);
        ctx.fillRect(4, -h/2 - 6, 4, h/2 - 10);
    }
    
    // Emblem for player
    if(isPlayer) {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(0, 4, 5, 0, Math.PI*2);
        ctx.fill();
        ctx.fillStyle = '#2563eb';
        ctx.beginPath();
        ctx.arc(1, 3, 4, 0, Math.PI*2);
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.font = "bold 8px Arial";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText("★", 1, -1);
    }
    
    // Enemy type symbol
    if(enemyType && enemyType.symbol) {
        ctx.fillStyle = 'white';
        ctx.font = `bold ${10 * size}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(enemyType.symbol, 0, -4);
    }
    
    // HP bar for multi-HP enemies
    if(enemyType && enemyType.maxHp > 1) {
        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.fillRect(-15, -h/2 - 10, 30, 5);
        const hpPct = enemyType.hp / enemyType.maxHp;
        ctx.fillStyle = hpPct > 0.5 ? '#22c55e' : hpPct > 0.25 ? '#fbbf24' : '#ef4444';
        ctx.fillRect(-14, -h/2 - 9, 28 * hpPct, 3);
    }
    
    ctx.restore();
}

function lightenColor(hex, amt) {
    let r = parseInt(hex.slice(1,3), 16);
    let g = parseInt(hex.slice(3,5), 16);
    let b = parseInt(hex.slice(5,7), 16);
    r = Math.min(255, r + amt);
    g = Math.min(255, g + amt);
    b = Math.min(255, b + amt);
    return `rgb(${r},${g},${b})`;
}

function darkenColor(hex, amt) {
    let r = parseInt(hex.slice(1,3), 16);
    let g = parseInt(hex.slice(3,5), 16);
    let b = parseInt(hex.slice(5,7), 16);
    r = Math.max(0, r - amt);
    g = Math.max(0, g - amt);
    b = Math.max(0, b - amt);
    return `rgb(${r},${g},${b})`;
}

function draw() {
    ctx.save();
    
    // Screen shake
    if(shakeAmount > 0) {
        ctx.translate(
            (Math.random() - 0.5) * shakeAmount,
            (Math.random() - 0.5) * shakeAmount
        );
    }
    
    ctx.clearRect(-10, -10, canvas.width + 20, canvas.height + 20);
    
    // Background
    if(backgroundImages[currentBgIndex] && backgroundImages[currentBgIndex].complete) {
        ctx.save();
        ctx.globalAlpha = 0.12;
        ctx.drawImage(backgroundImages[currentBgIndex], 0, 0, canvas.width, canvas.height);
        ctx.restore();
    }
    
    // Ground gradient
    const grad = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 0, canvas.width/2, canvas.height/2, canvas.width/2);
    grad.addColorStop(0, 'rgba(30, 41, 59, 0.3)');
    grad.addColorStop(1, 'rgba(2, 6, 23, 0.5)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    const time = Date.now() / 1000;
    for(let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
    }
    for(let i = 0; i < canvas.height; i += 40) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }
    
    // Draw Blocks
    blocks.forEach(b => {
        let color = getBlockColor(b.type);
        const pulse = Math.sin(time * 0.5 + b.animOffset) * 0.05 + 0.95;
        
        ctx.save();
        ctx.translate(b.x, b.y);
        
        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.beginPath();
        ctx.ellipse(0, b.height/2 + 3, b.width/2, 4, 0, 0, Math.PI * 2);
        ctx.fill();
        
        if(b.type === 'tree') {
            ctx.fillStyle = '#22c55e';
            ctx.beginPath();
            ctx.moveTo(0, -20 * pulse);
            ctx.lineTo(-15, 15);
            ctx.lineTo(15, 15);
            ctx.closePath();
            ctx.fill();
            // Lighter top
            ctx.fillStyle = '#4ade80';
            ctx.beginPath();
            ctx.moveTo(0, -16 * pulse);
            ctx.lineTo(-10, 10);
            ctx.lineTo(10, 10);
            ctx.closePath();
            ctx.fill();
            // Trunk
            ctx.fillStyle = '#78350f';
            ctx.fillRect(-3, 10, 6, 10);
        } else if(b.type === 'stone') {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.ellipse(0, 0, b.width/2, b.height/2 - 2, 0, 0, Math.PI * 2);
            ctx.fill();
            // Highlight
            ctx.fillStyle = '#9ca3af';
            ctx.beginPath();
            ctx.ellipse(-4, -6, b.width/4, b.height/4, 0, 0, Math.PI * 2);
            ctx.fill();
            // Cracks
            ctx.strokeStyle = '#4b5563';
            ctx.lineWidth = 2;
            if(b.maxHp - b.hp > 0) {
                ctx.beginPath();
                ctx.moveTo(-10, -5);
                ctx.lineTo(5, 5);
                ctx.stroke();
            }
            if(b.maxHp - b.hp > 2) {
                ctx.beginPath();
                ctx.moveTo(8, -8);
                ctx.lineTo(-2, 8);
                ctx.stroke();
            }
        } else if(b.type === 'water') {
            ctx.fillStyle = color;
            ctx.globalAlpha = 0.7;
            ctx.fillRect(-b.width/2, -b.height/2, b.width, b.height);
            ctx.globalAlpha = 1;
            ctx.strokeStyle = 'rgba(96, 165, 250, 0.4)';
            ctx.lineWidth = 2;
            for(let w = -2; w <= 2; w++) {
                ctx.beginPath();
                ctx.moveTo(-b.width/2 + 5, w * 8 + Math.sin(time + w) * 2);
                ctx.quadraticCurveTo(0, w * 8 + 4 + Math.sin(time * 1.3 + w) * 2, b.width/2 - 5, w * 8 + Math.sin(time * 0.7 + w) * 2);
                ctx.stroke();
            }
        } else if(b.type === 'sand') {
            ctx.fillStyle = color;
            ctx.fillRect(-b.width/2, -b.height/2, b.width, b.height);
            ctx.fillStyle = '#b8956e';
            for(let d = 0; d < 5; d++) {
                ctx.beginPath();
                ctx.arc(-10 + d * 8, -5 + (d % 2) * 10 + Math.sin(time + d) * 1, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        } else if(b.type === 'highway') {
            ctx.fillStyle = color;
            ctx.fillRect(-b.width/2, -b.height/2, b.width, b.height);
            ctx.fillStyle = '#fbbf24';
            ctx.setLineDash([8, 8]);
            ctx.lineDashOffset = -time * 20;
            ctx.beginPath();
            ctx.moveTo(-b.width/2 + 5, 0);
            ctx.lineTo(b.width/2 - 5, 0);
            ctx.stroke();
            ctx.setLineDash([]);
        } else {
            // Wall with brick pattern
            ctx.fillStyle = color;
            ctx.fillRect(-b.width/2, -b.height/2, b.width, b.height);
            ctx.strokeStyle = '#64748b';
            ctx.lineWidth = 1;
            ctx.strokeRect(-b.width/2, -b.height/2, b.width, b.height);
            // Brick lines
            ctx.strokeStyle = 'rgba(100, 116, 139, 0.3)';
            for(let row = 0; row < 3; row++) {
                ctx.beginPath();
                ctx.moveTo(-b.width/2, -b.height/2 + (row + 1) * b.height / 3);
                ctx.lineTo(b.width/2, -b.height/2 + (row + 1) * b.height / 3);
                ctx.stroke();
            }
            for(let col = 0; col < 2; col++) {
                ctx.beginPath();
                ctx.moveTo(-b.width/2 + (col + 1) * b.width / 2, -b.height/2);
                ctx.lineTo(-b.width/2 + (col + 1) * b.width / 2, b.height/2);
                ctx.stroke();
            }
        }
        
        ctx.restore();
    });
    
    // Draw bullet trails
    bulletTrails.forEach(t => {
        const alpha = t.life / t.maxLife;
        ctx.fillStyle = t.color;
        ctx.globalAlpha = alpha * 0.5;
        ctx.beginPath();
        ctx.arc(t.x, t.y, 2 * alpha, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.globalAlpha = 1;
    
    // Draw Power-ups
    powerUps.forEach(p => {
        p.pulse += 0.08;
        let scale = 1 + Math.sin(p.pulse) * 0.15;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.scale(scale, scale);
        
        // Glow
        ctx.shadowBlur = 25;
        ctx.shadowColor = p.type.color;
        ctx.fillStyle = p.type.color;
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        ctx.arc(0, 0, 22, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        
        // Circle
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.arc(0, 0, 16, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = p.type.color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, 16, 0, Math.PI * 2);
        ctx.stroke();
        
        // Symbol
        ctx.fillStyle = 'white';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.type.symbol, 0, 0);
        
        ctx.shadowBlur = 0;
        ctx.restore();
    });
    
    // Shield glow
    if(hasShield) {
        ctx.strokeStyle = `rgba(96, 165, 250, ${0.5 + Math.sin(time * 3) * 0.3})`;
        ctx.lineWidth = 3;
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#60a5fa';
        ctx.beginPath();
        ctx.arc(player.x, player.y, 28, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;
    }
    
    // Invincibility flash
    if(player.invincibleTimer > 0 && Math.floor(player.invincibleTimer / 4) % 2 === 0) {
        ctx.globalAlpha = 0.5;
    }
    
    // Enemies
    enemies.forEach(e => {
        // Hit flash
        if(e.hitFlash > 0 && Math.floor(e.hitFlash / 2) % 2 === 0) {
            ctx.globalAlpha = 0.6;
        }
        drawTank(e.x, e.y, e.dir, false, e.type);
        ctx.globalAlpha = 1;
    });
    
    // Player
    if(gameState !== 'gameover') {
        drawTank(player.x, player.y, player.dir, true, null);
    }
    ctx.globalAlpha = 1;
    
    // Muzzle flash
    if(muzzleFlash > 0) {
        let fx = player.x, fy = player.y;
        if(player.dir === 0) fy -= 30;
        else if(player.dir === 1) fx += 30;
        else if(player.dir === 2) fy += 30;
        else fx -= 30;
        
        const flashGrad = ctx.createRadialGradient(fx, fy, 0, fx, fy, 15);
        flashGrad.addColorStop(0, 'rgba(255, 255, 200, 1)');
        flashGrad.addColorStop(0.5, 'rgba(255, 200, 50, 0.6)');
        flashGrad.addColorStop(1, 'rgba(255, 200, 50, 0)');
        ctx.fillStyle = flashGrad;
        ctx.beginPath();
        ctx.arc(fx, fy, 15, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Bullets with glow
    bullets.forEach(b => {
        ctx.shadowBlur = 12;
        ctx.shadowColor = b.isPlayer ? '#fbbf24' : '#f87171';
        ctx.fillStyle = b.isPlayer ? '#fbbf24' : '#f87171';
        ctx.beginPath();
        ctx.arc(b.x, b.y, 4, 0, Math.PI*2);
        ctx.fill();
        // Inner bright
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(b.x, b.y, 2, 0, Math.PI*2);
        ctx.fill();
    });
    ctx.shadowBlur = 0;
    
    // Smoke particles
    smokeParticles.forEach(s => {
        const alpha = (s.life / s.maxLife) * 0.4;
        const size = s.size * (1 + (1 - s.life / s.maxLife) * 0.5);
        ctx.fillStyle = `rgba(200, 200, 200, ${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, size, 0, Math.PI * 2);
        ctx.fill();
    });
    
    // Particles
    particles.forEach(p => {
        const alpha = p.life / p.maxLife;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI*2);
        ctx.fill();
    });
    ctx.globalAlpha = 1;
    
    // Floating texts
    floatingTexts.forEach(f => {
        const alpha = f.life / f.maxLife;
        ctx.fillStyle = f.color;
        ctx.globalAlpha = alpha;
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(0,0,0,0.8)';
        ctx.fillText(f.text, f.x, f.y);
        ctx.shadowBlur = 0;
    });
    ctx.globalAlpha = 1;
    
    // Minimap
    drawMinimap();
    
    ctx.restore();
}

function drawMinimap() {
    const mapSize = 120;
    const mapX = canvas.width - mapSize - 15;
    const mapY = 15;
    const scale = mapSize / Math.max(canvas.width, canvas.height);
    
    // Background
    ctx.fillStyle = 'rgba(2, 6, 23, 0.7)';
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(mapX, mapY, mapSize, mapSize, 8);
    ctx.fill();
    ctx.stroke();
    
    // Blocks on minimap
    blocks.forEach(b => {
        ctx.fillStyle = getBlockColor(b.type);
        ctx.globalAlpha = 0.3;
        ctx.fillRect(
            mapX + b.x * scale - 1,
            mapY + b.y * scale - 1,
            3, 3
        );
    });
    ctx.globalAlpha = 1;
    
    // Enemies
    enemies.forEach(e => {
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(
            mapX + e.x * scale,
            mapY + e.y * scale,
            3, 0, Math.PI * 2
        );
        ctx.fill();
    });
    
    // Player
    ctx.fillStyle = '#60a5fa';
    ctx.shadowBlur = 8;
    ctx.shadowColor = '#60a5fa';
    ctx.beginPath();
    ctx.arc(
        mapX + player.x * scale,
        mapY + player.y * scale,
        4, 0, Math.PI * 2
    );
    ctx.fill();
    ctx.shadowBlur = 0;
    
    // Label
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '10px Arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';
    ctx.fillText('🗺️ مىنىخەرىتە', mapX + 4, mapY + mapSize - 4);
}

// Canvas roundRect polyfill
if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
        if (r > w / 2) r = w / 2;
        if (r > h / 2) r = h / 2;
        this.moveTo(x + r, y);
        this.lineTo(x + w - r, y);
        this.quadraticCurveTo(x + w, y, x + w, y + r);
        this.lineTo(x + w, y + h - r);
        this.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        this.lineTo(x + r, y + h);
        this.quadraticCurveTo(x, y + h, x, y + h - r);
        this.lineTo(x, y + r);
        this.quadraticCurveTo(x, y, x + r, y);
        return this;
    };
}
