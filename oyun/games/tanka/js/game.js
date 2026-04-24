const knowledgeBase = [
    "يۈسۈپ خاس ھاجىپنىڭ «قۇتادغۇبىلىك» ئەسىرىدە، ئادالەت ۋە بىلىمنىڭ ئەڭ كۈچلۈك قورال ئىكەنلىكى ئېيتىلغان.",
    "مەھمۇد قەشقىرى «دىۋان لۇغەت تۈرك» ئارقىلىق مىللىتىمىزنىڭ بىلىم ۋە مەدەنىيىتىنى دۇنياغا تونۇتقان.",
    "سۇلتان سۇتۇق بۇغراخان ئىسلام نۇرىنى قوبۇل قىلىپ، باتۇرلۇقى بىلەن خەلقىمىزنى نادانلىقتىن قۇتۇلدۇرغان.",
    "سەئىدخان ئۆزىنىڭ يۈكسەك ئىرادىسى، قەيسەرلىكى ۋە شىجائىتى بىلەن يېڭى بىر مەدەنىيەت دۆلىتىنى قۇرۇپ چىققان.",
    "سابىت داموللام ئىسلام شەرىئىتى ۋە زامانىۋى بىلىملەرنى بىرلەشتۈرۈپ، قورقماس باتۇرلۇقى بىلەن خەلقنى ئويغاتقان.",
    "ماتېماتىكا مەشىقى: تانكىمىزدا 10 ئوق بار، ھەر قېتىمدا 2 ئوقتىن ئاتساق قانچە قېتىم ئاتالايمىز؟ 5 قېتىم! ئەقىللىق!",
    "ئەخلاق: ۋەتەننى سۆيۈش ئىماندىندۇر. تاجاۋۇزچىلارغا قارشى تۇرۇش، ھەق ئۈچۈن كۈرەش قىلىش مۇسۇلماننىڭ بۇرچىدۇر.",
    "ئەرەبچە ھىكمەت: «الجنة تحت ظلال السيوف» - يەنى جەننەت قىلىچلارنىڭ سايىسى ئاستىدىدۇر (يەنى شىجائەت ۋە تىرىشچانلىق بىلەن كېلىدۇ).",
    "ئاتا-ئانىغا ياخشىلىق قىلىش جەننەتنىڭ ئاچقۇچىدۇر. باتۇرلار ئاتا-ئانىسىنى سۆيىدۇ ۋە ئۇلارنىڭ دۇئاسىنى ئالىدۇ."
];

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

let timeLeft = 60;
let lastTimeUpdate = 0;
let blocks = [];

// Levels setup
const levels = [
    { time: 60, name: "قەشقەر مەيدانى" },
    { time: 60, name: "خوتەن مەيدانى" },
    { time: 60, name: "ئاقسۇ مەيدانى" },
    { time: 60, name: "ئۈرۈمچى مەيدانى" }
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
    resetGame();
    startKnowledgeRotation();
    
    if(gameLoop) cancelAnimationFrame(gameLoop);
    requestAnimationFrame(update);
}

function resetGame() {
    score = 0;
    level = 1;
    timeLeft = levels[0].time;
    lastTimeUpdate = Date.now();
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
        speed: 4,
        cooldown: 0,
        isMoving: false
    };
    
    enemies = [];
    bullets = [];
    particles = [];
    blocks = [];
    generateMap();
}

function generateMap() {
    blocks = [];
    let numBlocks = 10 + level * 2;
    for(let i = 0; i < numBlocks; i++) {
        let isCrate = Math.random() < 0.3; // 30% chance for a crate
        blocks.push({
            x: 60 + Math.random() * (canvas.width - 120),
            y: 60 + Math.random() * (canvas.height - 120),
            type: isCrate ? 'crate' : 'wall',
            width: 40,
            height: 40
        });
    }
}

function checkBlockCollision(x, y, w, h) {
    for(let b of blocks) {
        if(Math.abs(x - b.x) < w/2 + b.width/2 && Math.abs(y - b.y) < h/2 + b.height/2) return true;
    }
    return false;
}

// Input handling
document.addEventListener('keydown', e => { keys[e.key] = true; });
document.addEventListener('keyup', e => { keys[e.key] = false; });

let mobileDir = -1;
let mobileFire = false;

window.setDir = function(dir) { mobileDir = dir; if(e) e.preventDefault(); };
window.stopDir = function() { mobileDir = -1; if(e) e.preventDefault(); };
window.fireBullet = function() { mobileFire = true; setTimeout(()=>mobileFire=false, 100); if(e) e.preventDefault(); };

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
    if(Math.random() < 0.005 + (level * 0.002) && enemies.length < 2 + level) {
        let edge = Math.floor(Math.random() * 4);
        let x, y, dir;
        if(edge === 0) { x = Math.random() * canvas.width; y = -40; dir = 2; } // top
        else if(edge === 1) { x = canvas.width + 40; y = Math.random() * canvas.height; dir = 3; } // right
        else if(edge === 2) { x = Math.random() * canvas.width; y = canvas.height + 40; dir = 0; } // bottom
        else { x = -40; y = Math.random() * canvas.height; dir = 1; } // left
        
        enemies.push({ x: x, y: y, dir: dir, speed: 0.5 + (Math.random() * 0.5), cooldown: 60 });
    }
}

function shoot(entity, isPlayer) {
    if(entity.cooldown > 0) return;
    entity.cooldown = isPlayer ? 15 : 120; // Player shoots faster, enemy very slow
    
    let bx = entity.x;
    let by = entity.y;
    let bdx = 0, bdy = 0;
    
    let bulletSpeed = isPlayer ? 10 : 4;
    
    if(entity.dir === 0) { by -= 25; bdy = -bulletSpeed; }
    else if(entity.dir === 1) { bx += 25; bdx = bulletSpeed; }
    else if(entity.dir === 2) { by += 25; bdy = bulletSpeed; }
    else if(entity.dir === 3) { bx -= 25; bdx = -bulletSpeed; }
    
    bullets.push({ x: bx, y: by, dx: bdx, dy: bdy, isPlayer: isPlayer });
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

        // Player movement
        player.isMoving = false;
        let oldX = player.x, oldY = player.y;
        if(keys['ArrowUp'] || keys['w'] || mobileDir === 0) { player.y -= player.speed; player.dir = 0; player.isMoving = true; }
        else if(keys['ArrowDown'] || keys['s'] || mobileDir === 2) { player.y += player.speed; player.dir = 2; player.isMoving = true; }
        else if(keys['ArrowLeft'] || keys['a'] || mobileDir === 3) { player.x -= player.speed; player.dir = 3; player.isMoving = true; }
        else if(keys['ArrowRight'] || keys['d'] || mobileDir === 1) { player.x += player.speed; player.dir = 1; player.isMoving = true; }
        
        if(checkBlockCollision(player.x, player.y, 24, 40)) { player.x = oldX; player.y = oldY; }
        
        // Bounds
        if(player.x < 15) player.x = 15;
        if(player.x > canvas.width - 15) player.x = canvas.width - 15;
        if(player.y < 20) player.y = 20;
        if(player.y > canvas.height - 20) player.y = canvas.height - 20;
        
        if(player.cooldown > 0) player.cooldown--;
        if(keys[' '] || mobileFire) shoot(player, true);
        
        // Enemies
        spawnEnemy();
        for(let i = enemies.length - 1; i >= 0; i--) {
            let e = enemies[i];
            
            // Move toward player simply
            let eOldX = e.x, eOldY = e.y;
            if(Math.abs(e.x - player.x) > Math.abs(e.y - player.y)) {
                if(e.x < player.x) { e.x += e.speed; e.dir = 1; }
                else { e.x -= e.speed; e.dir = 3; }
            } else {
                if(e.y < player.y) { e.y += e.speed; e.dir = 2; }
                else { e.y -= e.speed; e.dir = 0; }
            }
            if(checkBlockCollision(e.x, e.y, 24, 40)) {
                e.x = eOldX;
                e.y = eOldY;
            }
            
            // Enemy shooting
            if(e.cooldown > 0) e.cooldown--;
            if(Math.random() < 0.005 && e.cooldown === 0) {
                // Only shoot if roughly facing player
                shoot(e, false);
            }
            
            // Collision with player
            if(Math.abs(e.x - player.x) < 30 && Math.abs(e.y - player.y) < 30) {
                createExplosion(player.x, player.y, '#3b82f6');
                gameOver();
                return;
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
                    if(blk.type === 'crate') {
                        createExplosion(blk.x, blk.y, '#f59e0b');
                        blocks.splice(k, 1);
                        if(b1.isPlayer) {
                            addLog(`ساندۇق ئېچىلدى! بارلىق دۈشمەن بىتچىت قىلىندى!`, true);
                            enemies.forEach(en => createExplosion(en.x, en.y, '#ef4444'));
                            score += enemies.length;
                            document.getElementById('score-text').innerText = score;
                            enemies = [];
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
                        enemies.splice(j, 1);
                        b1.destroyed = true;
                        score++;
                        document.getElementById('score-text').innerText = score;
                        addLog(`تانكا باشلىقى ${playerName} تاجاۋۇزچىنى ۋەيران قىلدى!`, true);
                        break;
                    }
                }
            } else {
                // Hit player
                if(Math.abs(b1.x - player.x) < 12 && Math.abs(b1.y - player.y) < 12) {
                    createExplosion(player.x, player.y, '#3b82f6');
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
    
    // Grid overlay for combat feel
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for(let i=0; i<canvas.width; i+=40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke(); }
    for(let i=0; i<canvas.height; i+=40) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke(); }
    
    // Draw Blocks
    blocks.forEach(b => {
        ctx.fillStyle = b.type === 'crate' ? '#b45309' : '#475569';
        ctx.fillRect(b.x - b.width/2, b.y - b.height/2, b.width, b.height);
        if(b.type === 'crate') {
            ctx.strokeStyle = '#fcd34d';
            ctx.strokeRect(b.x - b.width/2 + 5, b.y - b.height/2 + 5, b.width - 10, b.height - 10);
            ctx.fillStyle = '#fcd34d';
            ctx.font = "bold 20px Arial";
            ctx.fillText("?", b.x - 5, b.y + 7);
        }
    });
    
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
