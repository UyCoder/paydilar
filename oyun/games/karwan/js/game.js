const knowledgeBase = [
    { title: "قەھرىمان ھۇنلار ۋە كۆكتۈركلەر", text: "ھۇنلار ۋە كۆكتۈركلەر تارىختا ئات ئۈستىدە جەڭ قىلىپ، شىجائەت ۋە باتۇرلۇق بىلەن ياۋروپا ۋە ئاسىيانى تىترىتىپ، ئەجدادلىرىمىزنىڭ قۇدرىتىنى نامايان قىلغان." },
    { title: "ئىسلام نۇرى - قاراخانىيلار", text: "قاراخانىيلار دەۋرىدە سۇلتان سۇتۇق بۇغراخان ئىسلامنى قوبۇل قىلىپ، بىلىم ۋە ئىمان بىلەن شەرقىي تۈركىستان تارىخىدا يېڭى سەھىپە ئاچقان. ئادالەتپەرۋەرلىك ئۇلارنىڭ شۇئارى ئىدى." },
    { title: "ئالتۇن دەۋر - سەئىدىيە", text: "سەئىدىيە خانلىقى دەۋرىدە، سۇلتان سەئىدخاننىڭ تەۋرەنمەس ئىرادىسى ۋە باتۇرلۇقى بىلەن ئىسلام ئىلىملىرى ۋە مەدەنىيىتىمىز گۈللەندى." },
    { title: "قورقماس شىجائەت - سابىت داموللام", text: "1933-يىلى، سابىت داموللام ھەزرەتلىرى ئۆزىنىڭ تېرەن ئىسلام بىلىمى، ھىكمىتى ۋە قورقماس شىجائىتى بىلەن شەرقىي تۈركىستان ئىسلام جۇمھۇرىيىتىنى قۇرۇپ چىقىپ، زامانىۋى دۆلەتچىلىك تارىخىمىزنى ياراتتى." },
    { title: "كارۋان ئەخلاقى - شەرئىي ھۆكۈم", text: "سودىدا ئادىل بولۇش ۋە ئامانەتكە خىيانەت قىلماسلىق ئىسلامدىكى ئەڭ گۈزەل پەزىلەتلەردىندۇر. كارۋان ئادىللىق ۋە ھالاللىق بىلەن ماڭىدۇ." },
    { title: "ماتېماتىكا مەشىقى", text: "ئەگەر كارۋاندا 5 تۆگە بولسا، ھەر بىر تۆگىگە 4 تىن ساندۇق ئارتىلسا، جەمئىي قانچە ساندۇق بولىدۇ؟ ئەلۋەتتە 20 ساندۇق! ئەقىللىق باھادىر!" },
    { title: "ئەخلاق ۋە پەزىلەت", text: "ئاتا-ئانىغا ياخشىلىق قىلىش، ئۇلارنى ھۆرمەتلەش ئاللاھنى رازى قىلىشنىڭ ئاچقۇچىدۇر. جەننەت ئانىلارنىڭ ئايىغى ئاستىدىدۇر." },
    { title: "ئەرەب تىلى ھىكمىتى", text: "«العلم نور» يەنى بىلىم - نۇردۇر. ئىلىم ئىزدەڭ، زۇلۇمدىن ۋە نادانلىقتىن قۇتۇلۇڭ! بىلىم ئىگىسى ھەمىشە غالىپتۇر." },
    { title: "تەپەككۇر ۋە بىرلىك", text: "بىر تامچە سۇ دېڭىزغا قوشۇلسا قۇرۇپ كەتمەيدۇ، بىر مۇسۇلمانمۇ ئۆز قېرىنداشلىرى بىلەن بىرگە بولسا ۋە ئىتتىپاقلاشسا ھەرگىز يېڭىلمەيدۇ!" }
];

let canvas, ctx;
let gridSize = 20, tileCountX, tileCountY;
let caravan = [];
let foods = [], obstacles = [], powerUps = [], particles = [], sparkles = [];
let dx = 1, dy = 0;
let score = 0, highScore = 0, combo = 0, level = 1;
let lastKnowledgeScore = 0, currentKnowledgeIndex = 0;
let speed = 250, gameLoop, animFrame;
let isPaused = false, gameState = 'start';
let playerName = "ئالىپ";
let audioCtx;
let shakeX = 0, shakeY = 0, shakeAmount = 0;
let frameCount = 0;
let activePowerUp = null; // 'shield', 'magnet', 'double', 'speed'
let powerUpTimer = 0;
let starField = [];
let sandAnim = 0;

// ===== AUDIO =====
function initAudio() { if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)(); if (audioCtx.state === 'suspended') audioCtx.resume(); }
function playSound(type) {
    if (!audioCtx) return; try {
        const o = audioCtx.createOscillator(), g = audioCtx.createGain(), t = audioCtx.currentTime;
        o.connect(g); g.connect(audioCtx.destination);
        if (type === 'collect') {
            o.type = 'sine'; o.frequency.setValueAtTime(600, t); o.frequency.exponentialRampToValueAtTime(900, t + 0.08);
            g.gain.setValueAtTime(0.06, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
        } else if (type === 'gold') {
            o.type = 'sine'; o.frequency.setValueAtTime(523, t); o.frequency.setValueAtTime(659, t + 0.1); o.frequency.setValueAtTime(784, t + 0.2);
            g.gain.setValueAtTime(0.08, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        } else if (type === 'powerup') {
            o.type = 'triangle'; o.frequency.setValueAtTime(400, t); o.frequency.setValueAtTime(600, t + 0.1); o.frequency.setValueAtTime(800, t + 0.2);
            g.gain.setValueAtTime(0.07, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        } else if (type === 'hit') {
            o.type = 'sawtooth'; o.frequency.setValueAtTime(200, t); o.frequency.exponentialRampToValueAtTime(80, t + 0.2);
            g.gain.setValueAtTime(0.1, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
        } else if (type === 'gameover') {
            o.type = 'sawtooth'; o.frequency.setValueAtTime(400, t); o.frequency.exponentialRampToValueAtTime(100, t + 0.5);
            g.gain.setValueAtTime(0.08, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
        } else if (type === 'levelup') {
            o.type = 'sine'; o.frequency.setValueAtTime(400, t); o.frequency.setValueAtTime(500, t + 0.1); o.frequency.setValueAtTime(600, t + 0.2); o.frequency.setValueAtTime(800, t + 0.3);
            g.gain.setValueAtTime(0.08, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
        } else if (type === 'knowledge') {
            o.type = 'sine'; o.frequency.setValueAtTime(300, t); o.frequency.setValueAtTime(500, t + 0.15);
            g.gain.setValueAtTime(0.05, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
        }
        o.start(t); o.stop(t + 0.35);
    } catch(e) {}
}

// ===== PARTICLES =====
function burstParticles(x, y, color, count = 12) {
    for (let i = 0; i < count; i++) {
        particles.push({
            x, y, vx: (Math.random() - 0.5) * 4, vy: (Math.random() - 0.5) * 4,
            life: 1, color, size: 2 + Math.random() * 3
        });
    }
}

function burstConfetti(count = 30) {
    const colors = ['#ffd700', '#ff6b6b', '#60a5fa', '#34d399', '#f472b6', '#fbbf24'];
    for (let i = 0; i < count; i++) {
        const c = colors[Math.floor(Math.random() * colors.length)];
        confetti.push({
            x: canvas.width / 2 + (Math.random() - 0.5) * 100,
            y: canvas.height / 2 + (Math.random() - 0.5) * 100,
            vx: (Math.random() - 0.5) * 6, vy: -Math.random() * 8 - 3,
            life: 1, color: c, size: 3 + Math.random() * 5, rot: Math.random() * 360, rv: (Math.random() - 0.5) * 20
        });
    }
}

let confetti = [];

function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy; p.vy += 0.15; p.life -= 0.025;
        if (p.life <= 0) particles.splice(i, 1);
    }
    for (let i = confetti.length - 1; i >= 0; i--) {
        const c = confetti[i];
        c.x += c.vx; c.y += c.vy; c.vy += 0.1; c.rot += c.rv; c.life -= 0.012;
        if (c.life <= 0 || c.y > canvas.height + 20) confetti.splice(i, 1);
    }
}

function drawParticles() {
    particles.forEach(p => {
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2); ctx.fill();
    });
    confetti.forEach(c => {
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(c.rot * Math.PI / 180);
        ctx.globalAlpha = Math.max(0, c.life);
        ctx.fillStyle = c.color;
        ctx.fillRect(-c.size / 2, -c.size / 4, c.size, c.size / 2);
        ctx.restore();
    });
    ctx.globalAlpha = 1;
}

// ===== SCENE DRAWING =====
function drawBackground() {
    // Sky gradient - desert sunset
    sandAnim = (sandAnim + 0.005) % (Math.PI * 2);
    const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    skyGrad.addColorStop(0, '#1a0a2e');
    skyGrad.addColorStop(0.15, '#2d1b69');
    skyGrad.addColorStop(0.3, '#e76f51');
    skyGrad.addColorStop(0.45, '#f4a261');
    skyGrad.addColorStop(0.6, '#e9c46a');
    skyGrad.addColorStop(0.75, '#d4a373');
    skyGrad.addColorStop(1, '#b68973');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Stars
    starField.forEach(s => {
        const twinkle = 0.5 + Math.sin(sandAnim * 3 + s.speed) * 0.5;
        ctx.fillStyle = `rgba(255,255,255,${twinkle * 0.8})`;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.size * twinkle, 0, Math.PI * 2); ctx.fill();
    });

    // Moon
    ctx.fillStyle = 'rgba(255,255,200,0.3)';
    ctx.beginPath();
    ctx.arc(canvas.width * 0.85, canvas.height * 0.15, 25, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,200,0.6)';
    ctx.beginPath();
    ctx.arc(canvas.width * 0.85, canvas.height * 0.15, 18, 0, Math.PI * 2);
    ctx.fill();

    // Distant dunes
    for (let i = 0; i < 5; i++) {
        const yBase = canvas.height * (0.5 + i * 0.12);
        ctx.fillStyle = `rgba(${180 + i * 15}, ${140 + i * 10}, ${100 + i * 8}, ${0.3 + i * 0.08})`;
        ctx.beginPath();
        ctx.moveTo(0, yBase + 20);
        for (let x = 0; x <= canvas.width; x += 5) {
            const waveY = Math.sin((x + sandAnim * 50 + i * 100) * 0.005) * 15 + Math.sin((x + i * 50) * 0.015) * 8;
            ctx.lineTo(x, yBase + waveY);
        }
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.fill();
    }

    // Ground / sand floor
    const floorY = canvas.height - 30;
    const sandGrad = ctx.createLinearGradient(0, floorY, 0, canvas.height);
    sandGrad.addColorStop(0, '#d4a373');
    sandGrad.addColorStop(0.5, '#b68973');
    sandGrad.addColorStop(1, '#8c6a4f');
    ctx.fillStyle = sandGrad;
    ctx.beginPath();
    ctx.moveTo(0, floorY);
    for (let x = 0; x <= canvas.width; x += 3) {
        const waveY = Math.sin((x + sandAnim * 30) * 0.01) * 4 + Math.sin(x * 0.03) * 2;
        ctx.lineTo(x, floorY + waveY);
    }
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.fill();

    // Palm trees (decorative)
    for (let i = 0; i < 3; i++) {
        const px = 50 + i * (canvas.width / 3);
        const py = floorY - 5;
        // Trunk
        ctx.strokeStyle = '#5d4037';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.quadraticCurveTo(px + Math.sin(i) * 5, py - 40, px + Math.sin(i * 0.5) * 3, py - 65);
        ctx.stroke();
        // Fronds
        for (let fr = 0; fr < 5; fr++) {
            const angle = -Math.PI / 2 + (fr - 2) * 0.5 + Math.sin(sandAnim + i + fr) * 0.08;
            ctx.strokeStyle = '#2d6a3f';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(px + Math.sin(i * 0.5) * 3, py - 65);
            const len = 20 + Math.random() * 10;
            ctx.quadraticCurveTo(
                px + Math.sin(i * 0.5) * 3 + Math.cos(angle) * len * 0.6,
                py - 65 + Math.sin(angle) * len * 0.6,
                px + Math.sin(i * 0.5) * 3 + Math.cos(angle) * len,
                py - 65 + Math.sin(angle) * len
            );
            ctx.stroke();
        }
    }
}

function drawCamel(x, y, size, isHead, index) {
    const cx = x * gridSize + gridSize / 2;
    const cy = y * gridSize + gridSize / 2;
    const s = size / 2 - 1;

    if (isHead) {
        // Body (bigger)
        ctx.fillStyle = '#c9956b';
        ctx.beginPath();
        ctx.ellipse(cx, cy, s * 0.85, s * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#8c6a4f';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Hump
        ctx.fillStyle = '#b8845a';
        ctx.beginPath();
        ctx.ellipse(cx - s * 0.25, cy - s * 0.45, s * 0.3, s * 0.25, 0, Math.PI, Math.PI * 2);
        ctx.fill();

        // Head
        ctx.fillStyle = '#c9956b';
        ctx.beginPath();
        ctx.ellipse(cx + s * 0.7, cy - s * 0.2, s * 0.3, s * 0.2, 0.3, 0, Math.PI * 2);
        ctx.fill();

        // Neck
        ctx.strokeStyle = '#c9956b';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cx + s * 0.4, cy - s * 0.15);
        ctx.lineTo(cx + s * 0.6, cy - s * 0.25);
        ctx.stroke();

        // Eye
        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.arc(cx + s * 0.85, cy - s * 0.25, 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Ears
        ctx.fillStyle = '#b8845a';
        ctx.beginPath();
        ctx.ellipse(cx + s * 0.6, cy - s * 0.5, 3, 5, -0.3, 0, Math.PI * 2);
        ctx.fill();

        // Legs (animated walk)
        const legPhase = frameCount * 0.3;
        ctx.strokeStyle = '#8c6a4f';
        ctx.lineWidth = 2;
        for (let l = 0; l < 4; l++) {
            const lx = cx - s * 0.4 + l * s * 0.4;
            const ly = cy + s * 0.4;
            const swing = Math.sin(legPhase + l * Math.PI / 2) * 3;
            ctx.beginPath();
            ctx.moveTo(lx, ly);
            ctx.lineTo(lx + swing, ly + s * 0.4);
            ctx.stroke();
        }

        // Tail
        ctx.strokeStyle = '#8c6a4f';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(cx - s * 0.75, cy - s * 0.1);
        ctx.quadraticCurveTo(cx - s - 3, cy + s * 0.1, cx - s + 2, cy + s * 0.05);
        ctx.stroke();

        // Leader glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#fbbf24';
        ctx.strokeStyle = 'rgba(251,191,36,0.4)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cx, cy, s + 3, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Saddle decoration
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(cx - s * 0.25, cy - s * 0.3, s * 0.5, 3);
        ctx.fillStyle = '#fbbf24';
        ctx.fillRect(cx - s * 0.2, cy - s * 0.25, s * 0.4, 2);

    } else {
        // Regular camel body
        ctx.fillStyle = '#c9956b';
        ctx.beginPath();
        ctx.ellipse(cx, cy, s * 0.75, s * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Hump
        ctx.fillStyle = '#b8845a';
        ctx.beginPath();
        ctx.ellipse(cx - s * 0.2, cy - s * 0.4, s * 0.25, s * 0.2, 0, Math.PI, Math.PI * 2);
        ctx.fill();

        // Legs
        const legPhase2 = frameCount * 0.3 + index;
        ctx.strokeStyle = '#8c6a4f';
        ctx.lineWidth = 1.5;
        for (let l = 0; l < 4; l++) {
            const lx = cx - s * 0.3 + l * s * 0.3;
            const ly = cy + s * 0.35;
            const swing = Math.sin(legPhase2 + l * Math.PI / 2) * 2;
            ctx.beginPath();
            ctx.moveTo(lx, ly);
            ctx.lineTo(lx + swing, ly + s * 0.35);
            ctx.stroke();
        }

        // Rope connecting to next camel
        if (index < caravan.length - 1) {
            const next = caravan[index + 1];
            const nx = next.x * gridSize + gridSize / 2;
            const ny = next.y * gridSize + gridSize / 2;
            ctx.strokeStyle = 'rgba(139,90,43,0.4)';
            ctx.lineWidth = 1.5;
            ctx.setLineDash([3, 4]);
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(nx, ny);
            ctx.stroke();
            ctx.setLineDash([]);
        }
    }
}

function drawFood(f) {
    const fx = f.x * gridSize + gridSize / 2;
    const fy = f.y * gridSize + gridSize / 2;
    const bob = Math.sin(frameCount * 0.05 + f.id) * 2;

    if (f.type === 'gold') {
        // Gold coin
        ctx.save();
        ctx.translate(fx, fy + bob);
        // Glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#ffd700';
        ctx.fillStyle = '#ffd700';
        ctx.beginPath();
        ctx.arc(0, 0, gridSize / 2 - 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        // Coin detail
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(0, 0, gridSize / 2 - 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffd700';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('₿', 0, 0);
        ctx.restore();
    } else if (f.type === 'scroll') {
        // Knowledge scroll
        ctx.save();
        ctx.translate(fx, fy + bob);
        ctx.fillStyle = '#f8fafc';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#60a5fa';
        ctx.beginPath();
        ctx.ellipse(0, 0, gridSize / 2 - 1, gridSize / 2 - 3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#3b82f6';
        ctx.font = '8px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('📜', 0, 0);
        ctx.restore();
    } else {
        // Regular treasure - gem
        ctx.save();
        ctx.translate(fx, fy + bob);
        ctx.shadowBlur = 10;
        ctx.shadowColor = f.color;
        ctx.fillStyle = f.color;
        ctx.beginPath();
        const s = gridSize / 2 - 1;
        ctx.moveTo(0, -s);
        ctx.lineTo(s, 0);
        ctx.lineTo(0, s);
        ctx.lineTo(-s, 0);
        ctx.fill();
        ctx.shadowBlur = 0;
        // Inner sparkle
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.beginPath();
        ctx.arc(-s * 0.2, -s * 0.2, s * 0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function drawObstacle(o) {
    const ox = o.x * gridSize + gridSize / 2;
    const oy = o.y * gridSize + gridSize / 2;

    if (o.type === 'rock') {
        ctx.fillStyle = '#6b7280';
        ctx.beginPath();
        ctx.ellipse(ox, oy, gridSize / 2 - 1, gridSize / 2 - 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#4b5563';
        ctx.beginPath();
        ctx.ellipse(ox - 1, oy - 2, gridSize / 3, gridSize / 4, 0, 0, Math.PI * 2);
        ctx.fill();
    } else {
        // Bandit camp
        ctx.fillStyle = '#374151';
        ctx.fillRect(ox - gridSize / 2 + 2, oy - gridSize / 2 + 2, gridSize - 4, gridSize - 4);
        ctx.fillStyle = '#ef4444';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🏴', ox, oy);
    }
}

function drawPowerUp(pu) {
    const px = pu.x * gridSize + gridSize / 2;
    const py = pu.y * gridSize + gridSize / 2;
    const bob = Math.sin(frameCount * 0.04 + pu.id * 2) * 3;
    const pulse = 1 + Math.sin(frameCount * 0.08 + pu.id) * 0.15;

    ctx.save();
    ctx.translate(px, py + bob);

    // Outer glow
    ctx.shadowBlur = 20;
    ctx.shadowColor = pu.color;

    // Icon box
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.beginPath();
    ctx.arc(0, 0, gridSize / 2 + 2, 0, Math.PI * 2);
    ctx.fill();

    const s = gridSize / 2 - 3;
    ctx.fillStyle = pu.color;
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(0, 0, s * pulse, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'white';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(pu.icon, 0, 0);
    ctx.restore();
}

function drawTrail() {
    if (caravan.length < 2) return;
    // Draw footsteps behind the caravan
    for (let i = 1; i < caravan.length; i++) {
        const seg = caravan[i];
        const cx = seg.x * gridSize + gridSize / 2;
        const cy = seg.y * gridSize + gridSize / 2;
        const alpha = 0.15 - (i / caravan.length) * 0.1;
        ctx.fillStyle = `rgba(139,90,43,${alpha})`;
        ctx.beginPath();
        ctx.ellipse(cx + 2, cy + 3, 3, 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(cx - 2, cy + 3, 3, 2, 0, 0, Math.PI * 2);
        ctx.fill();
    }
}

// ===== GAME LOGIC =====
function initCanvas() {
    canvas = document.getElementById('game-canvas');
    ctx = canvas.getContext('2d');

    const container = document.querySelector('.canvas-container');
    let w = container.clientWidth - 20;
    let h = container.clientHeight - 20;
    canvas.width = w - (w % gridSize);
    canvas.height = h - (h % gridSize);
    tileCountX = Math.floor(canvas.width / gridSize);
    tileCountY = Math.floor(canvas.height / gridSize);

    // Stars
    starField = [];
    for (let i = 0; i < 60; i++) {
        starField.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height * 0.5,
            size: 0.5 + Math.random() * 1.5,
            speed: 0.5 + Math.random() * 2
        });
    }
}

window.addEventListener('resize', () => {
    if (gameState === 'start' || gameState === 'gameover') { initCanvas(); }
});

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}

function showStartScreen() {
    gameState = 'start';
    showScreen('start-screen');
    if (animFrame) cancelAnimationFrame(animFrame);
}

function startGame() {
    initAudio();
    const nameInput = document.getElementById('playerName').value.trim();
    if (nameInput) playerName = nameInput;
    document.getElementById('display-name').innerText = playerName;

    gameState = 'playing';
    showScreen('game-screen');
    initCanvas();
    startSidebarFacts();
    resetGameVariables();
    if (gameLoop) clearInterval(gameLoop);
    gameLoop = setInterval(update, speed);
    if (animFrame) cancelAnimationFrame(animFrame);
    animFrame = requestAnimationFrame(drawLoop);
}

function resetGameVariables() {
    let startX = Math.floor(tileCountX / 2);
    let startY = Math.floor(tileCountY / 2);
    caravan = [
        { x: startX, y: startY },
        { x: startX - 1, y: startY },
        { x: startX - 2, y: startY }
    ];
    dx = 1; dy = 0;
    score = 0; combo = 0; level = 1;
    lastKnowledgeScore = 0; currentKnowledgeIndex = 0;
    speed = 250; shakeAmount = 0; shakeX = 0; shakeY = 0;
    activePowerUp = null; powerUpTimer = 0;
    foods = []; obstacles = []; powerUps = []; particles = []; confetti = [];
    document.getElementById('score-text').innerText = score;
    document.getElementById('combo-text').classList.add('hidden');
    spawnFoods();
    spawnInitialObstacles();
}

function spawnFoods() {
    // Spawn 3-4 items
    const count = 3 + Math.floor(Math.random() * 2);
    for (let i = 0; i < count; i++) {
        spawnFood();
    }
}

function spawnFood() {
    let nx, ny;
    let attempts = 0;
    do {
        nx = Math.floor(Math.random() * tileCountX);
        ny = Math.floor(Math.random() * tileCountY);
        attempts++;
    } while (isOccupied(nx, ny) && attempts < 50);

    const r = Math.random();
    let type, color, points;
    if (r < 0.15) { type = 'gold'; color = '#ffd700'; points = 5; }
    else if (r < 0.3) { type = 'scroll'; color = '#60a5fa'; points = 3; }
    else { type = 'gem'; color = '#10b981'; points = 1; }

    foods.push({ x: nx, y: ny, type, color, points, id: Math.random() * 1000 });
}

function spawnInitialObstacles() {
    const count = 2 + Math.floor(level * 0.5);
    for (let i = 0; i < count; i++) {
        spawnObstacle();
    }
}

function spawnObstacle() {
    let nx, ny;
    let attempts = 0;
    do {
        nx = Math.floor(Math.random() * tileCountX);
        ny = Math.floor(Math.random() * tileCountY);
        attempts++;
    } while (isOccupied(nx, ny) && attempts < 50);

    obstacles.push({
        x: nx, y: ny,
        type: Math.random() < 0.5 ? 'rock' : 'bandit',
        id: Math.random() * 1000
    });
}

function spawnPowerUpItem() {
    let nx, ny;
    let attempts = 0;
    do {
        nx = Math.floor(Math.random() * tileCountX);
        ny = Math.floor(Math.random() * tileCountY);
        attempts++;
    } while (isOccupied(nx, ny) && attempts < 50);

    const types = [
        { type: 'shield', icon: '🛡', color: '#60a5fa' },
        { type: 'magnet', icon: '🧲', color: '#f472b6' },
        { type: 'double', icon: '✖', color: '#ffd700' },
        { type: 'speed', icon: '⚡', color: '#a855f7' }
    ];
    const t = types[Math.floor(Math.random() * types.length)];
    powerUps.push({ x: nx, y: ny, ...t, id: Math.random() * 1000 });
}

function isOccupied(nx, ny) {
    for (let c of caravan) { if (c.x === nx && c.y === ny) return true; }
    for (let f of foods) { if (f.x === nx && f.y === ny) return true; }
    for (let o of obstacles) { if (o.x === nx && o.y === ny) return true; }
    for (let p of powerUps) { if (p.x === nx && p.y === ny) return true; }
    return false;
}

function update() {
    if (isPaused || gameState !== 'playing') return;

    let headX = caravan[0].x + dx;
    let headY = caravan[0].y + dy;

    // Wall collision
    if (headX < 0 || headX >= tileCountX || headY < 0 || headY >= tileCountY) {
        if (activePowerUp === 'shield') {
            activePowerUp = null;
            powerUpTimer = 0;
            playSound('powerup');
            // Bounce back
            headX = caravan[0].x;
            headY = caravan[0].y;
            showCombo('🛡 قورغاش ساقلىدى!', '#60a5fa');
            // Reverse direction
            dx *= -1; dy *= -1;
        } else {
            gameOver(); return;
        }
    }

    // Self collision
    for (let i = 0; i < caravan.length; i++) {
        if (headX === caravan[i].x && headY === caravan[i].y) {
            if (activePowerUp === 'shield') {
                activePowerUp = null;
                powerUpTimer = 0;
                playSound('powerup');
                showCombo('🛡 قورغاش ساقلىدى!', '#60a5fa');
                return; // Don't move this frame
            }
            gameOver(); return;
        }
    }

    // Obstacle collision
    for (let i = 0; i < obstacles.length; i++) {
        if (headX === obstacles[i].x && headY === obstacles[i].y) {
            if (activePowerUp === 'shield') {
                activePowerUp = null;
                powerUpTimer = 0;
                playSound('powerup');
                obstacles.splice(i, 1);
                showCombo('🛡 قورغاش ساقلىدى!', '#60a5fa');
            } else {
                gameOver(); return;
            }
        }
    }

    // Move forward
    caravan.unshift({ x: headX, y: headY });

    // Check food collection
    let ate = false;
    for (let i = foods.length - 1; i >= 0; i--) {
        if (headX === foods[i].x && headY === foods[i].y) {
            const f = foods[i];
            const pts = activePowerUp === 'double' ? f.points * 2 : f.points;
            score += pts;
            combo++;
            ate = true;

            if (f.type === 'gold') playSound('gold');
            else if (f.type === 'scroll') playSound('knowledge');
            else playSound('collect');

            document.getElementById('score-text').innerText = score;

            // Particles at screen position
            const sx = f.x * gridSize + gridSize / 2;
            const sy = f.y * gridSize + gridSize / 2;
            burstParticles(sx, sy, f.color, 10);
            if (f.type === 'gold') burstParticles(sx, sy, '#ffffff', 8);

            foods.splice(i, 1);
            setTimeout(() => { if (gameState === 'playing' && foods.length < 3) spawnFood(); }, 200);

            // Combo
            if (combo >= 3) showCombo(`🔥 ${combo} قاتار!`, '#ff6b6b');
            if (combo >= 5) showCombo(`💫 ${combo} قاتار مەرگەن!`, '#a855f7');

            // Speed up
            if (speed > 80) speed -= 3;
            clearInterval(gameLoop);
            gameLoop = setInterval(update, speed);

            // Level up every 10 points
            if (score >= level * 10 && level < 20) {
                level++;
                playSound('levelup');
                showCombo(`🎯 باسقۇچ ${level}!`, '#60a5fa');
                document.getElementById('level-text').innerText = level;
                spawnObstacle();
                burstParticles(canvas.width / 2, canvas.height / 2, '#ffd700', 20);
            }

            // Knowledge every 5 score
            if (score % 5 === 0 && score !== lastKnowledgeScore) {
                lastKnowledgeScore = score;
                setTimeout(() => showKnowledge(), 300);
            }

            break;
        }
    }

    if (!ate) {
        caravan.pop(); // No food, remove tail
    }

    // Check power-up collection
    for (let i = powerUps.length - 1; i >= 0; i--) {
        if (headX === powerUps[i].x && headY === powerUps[i].y) {
            const pu = powerUps[i];
            activePowerUp = pu.type;
            powerUpTimer = 100; // ~25 seconds at 250ms interval
            playSound('powerup');
            
            // Show indicator
            const indicator = document.getElementById('powerup-indicator');
            indicator.classList.remove('hidden');
            document.getElementById('powerup-icon').innerText = pu.icon;
            
            // Particles
            const sx = pu.x * gridSize + gridSize / 2;
            const sy = pu.y * gridSize + gridSize / 2;
            burstParticles(sx, sy, pu.color, 15);
            
            const names = { shield: '🛡 قورغاش', magnet: '🧲 ماگنىت', double: '✖ قوش نومۇر', speed: '⚡ تېزلىك' };
            showCombo(`${names[pu.type] || 'قۇۋۋەت'} يىغدىڭىز!`, pu.color);
            
            powerUps.splice(i, 1);
            break;
        }
    }

    // Magnet power-up - attract nearby food
    if (activePowerUp === 'magnet') {
        const head = caravan[0];
        for (let f of foods) {
            const dist = Math.abs(f.x - head.x) + Math.abs(f.y - head.y);
            if (dist < 5) {
                // Move toward head
                if (f.x < head.x) f.x++;
                else if (f.x > head.x) f.x--;
                if (f.y < head.y) f.y++;
                else if (f.y > head.y) f.y--;
            }
        }
    }

    // Power-up timer
    if (activePowerUp && powerUpTimer > 0) {
        powerUpTimer--;
        if (powerUpTimer <= 0) {
            activePowerUp = null;
            document.getElementById('powerup-indicator').classList.add('hidden');
            showCombo('قۇۋۋەت تۈگىدى', '#94a3b8');
        }
    }

    // Random power-up spawn
    if (Math.random() < 0.02 && powerUps.length < 2 && gameState === 'playing') {
        spawnPowerUpItem();
    }

    // Combo text auto-update
    document.getElementById('combo-text-val').innerText = combo;
    if (combo >= 3) document.getElementById('combo-box').style.display = 'flex';
    else document.getElementById('combo-box').style.display = 'none';

    highScore = Math.max(highScore, score);
    document.getElementById('high-score-text').innerText = highScore;
}

function showCombo(txt, color) {
    const el = document.getElementById('combo-text');
    el.innerText = txt;
    el.style.color = color || '#ffd700';
    el.classList.remove('hidden');
    el.style.animation = 'none';
    el.offsetHeight;
    el.style.animation = 'comboPop 0.8s ease-out forwards';
    setTimeout(() => el.classList.add('hidden'), 900);
}

// ===== DRAW LOOP =====
function drawLoop() {
    animFrame = requestAnimationFrame(drawLoop);
    frameCount++;

    if (gameState !== 'playing' && gameState !== 'gameover') return;

    ctx.save();

    // Screen shake
    if (shakeAmount > 0) {
        shakeX = (Math.random() - 0.5) * shakeAmount;
        shakeY = (Math.random() - 0.5) * shakeAmount;
        ctx.translate(shakeX, shakeY);
        shakeAmount *= 0.92;
        if (shakeAmount < 0.3) shakeAmount = 0;
    }

    ctx.clearRect(-5, -5, canvas.width + 10, canvas.height + 10);
    drawBackground();
    drawTrail();

    // Draw obstacles
    obstacles.forEach(o => drawObstacle(o));

    // Draw food
    foods.forEach(f => {
        // Sparkle around items
        if (f.type === 'gold' && frameCount % 20 === 0) {
            const fx = f.x * gridSize + gridSize / 2;
            const fy = f.y * gridSize + gridSize / 2;
            sparkles.push({ x: fx, y: fy, life: 1, size: 2 });
        }
        drawFood(f);
    });

    // Draw power-ups
    powerUps.forEach(pu => drawPowerUp(pu));

    // Draw caravan
    caravan.forEach((seg, index) => {
        drawCamel(seg.x, seg.y, gridSize, index === 0, index);
    });

    // Power-up indicator on leader
    if (activePowerUp) {
        const head = caravan[0];
        const hx = head.x * gridSize + gridSize / 2;
        const hy = head.y * gridSize + gridSize / 2;
        const colors = { shield: '#60a5fa', magnet: '#f472b6', double: '#ffd700', speed: '#a855f7' };
        ctx.strokeStyle = colors[activePowerUp] || '#fff';
        ctx.lineWidth = 2;
        ctx.setLineDash([3, 5]);
        ctx.beginPath();
        ctx.arc(hx, hy, gridSize / 2 + 4, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
    }

    // Update sparkles
    for (let i = sparkles.length - 1; i >= 0; i--) {
        sparkles[i].life -= 0.05;
        if (sparkles[i].life <= 0) sparkles.splice(i, 1);
    }

    // Draw sparkles
    sparkles.forEach(s => {
        ctx.fillStyle = `rgba(255,215,0,${s.life})`;
        ctx.beginPath();
        ctx.arc(s.x + (Math.random() - 0.5) * 10, s.y + (Math.random() - 0.5) * 10, s.size * s.life, 0, Math.PI * 2);
        ctx.fill();
    });

    updateParticles();
    drawParticles();

    ctx.restore();
}

// ===== KNOWLEDGE =====
function showKnowledge() {
    isPaused = true;
    let k = knowledgeBase[currentKnowledgeIndex % knowledgeBase.length];
    currentKnowledgeIndex++;
    document.getElementById('knowledge-title').innerText = k.title;
    document.getElementById('knowledge-text').innerText = k.text;
    playSound('knowledge');
    showScreen('knowledge-screen');
}

function resumeGame() {
    isPaused = false;
    showScreen('game-screen');
}

// ===== GAME OVER =====
function gameOver() {
    if (gameState !== 'playing') return;
    gameState = 'gameover';
    clearInterval(gameLoop);
    if (animFrame) cancelAnimationFrame(animFrame);
    playSound('gameover');
    shakeAmount = 8;

    // Explosion particles
    caravan.forEach(seg => {
        burstParticles(seg.x * gridSize + gridSize / 2, seg.y * gridSize + gridSize / 2, '#ef4444', 8);
        burstParticles(seg.x * gridSize + gridSize / 2, seg.y * gridSize + gridSize / 2, '#ffd700', 5);
    });

    // Draw one more frame with shake
    drawLoop();

    setTimeout(() => {
        document.getElementById('final-score').innerText = score;
        document.getElementById('final-high-score').innerText = highScore;
        document.getElementById('final-level').innerText = level;
        document.getElementById('final-combo').innerText = combo;
        showScreen('game-over-screen');
        localStorage.setItem('karwan_high', highScore);
    }, 600);
}

// ===== CONTROLS =====
document.addEventListener('keydown', e => {
    if (isPaused || gameState !== 'playing') return;
    if (e.key === 'ArrowUp' && dy !== 1) { dx = 0; dy = -1; }
    if (e.key === 'ArrowDown' && dy !== -1) { dx = 0; dy = 1; }
    if (e.key === 'ArrowLeft' && dx !== 1) { dx = -1; dy = 0; }
    if (e.key === 'ArrowRight' && dx !== -1) { dx = 1; dy = 0; }
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        update();
    }
});

// D-pad
window.changeDir = function (newDx, newDy) {
    if (isPaused || gameState !== 'playing') return;
    if (newDx === 1 && dx === -1) return;
    if (newDx === -1 && dx === 1) return;
    if (newDy === 1 && dy === -1) return;
    if (newDy === -1 && dy === 1) return;
    dx = newDx; dy = newDy;
    clearInterval(gameLoop);
    gameLoop = setInterval(update, speed);
    update();
};

window.startBoost = function (newDx, newDy) {
    if (gameState !== 'playing') return;
    changeDir(newDx, newDy);
};

window.stopBoost = function () {};

// Swipe
let touchStartX = 0, touchStartY = 0;
document.addEventListener('touchstart', e => {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.tagName === 'INPUT') return;
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}, { passive: false });

document.addEventListener('touchmove', e => {
    if (gameState === 'playing' && e.target.tagName !== 'BUTTON') {
        e.preventDefault();
    }
}, { passive: false });

document.addEventListener('touchend', e => {
    if (isPaused || gameState !== 'playing') return;
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.tagName === 'INPUT') return;
    const diffX = e.changedTouches[0].screenX - touchStartX;
    const diffY = e.changedTouches[0].screenY - touchStartY;
    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (Math.abs(diffX) > 30) {
            if (diffX > 0 && dx !== -1) { dx = 1; dy = 0; update(); }
            else if (diffX < 0 && dx !== 1) { dx = -1; dy = 0; update(); }
        }
    } else {
        if (Math.abs(diffY) > 30) {
            if (diffY > 0 && dy !== -1) { dx = 0; dy = 1; update(); }
            else if (diffY < 0 && dy !== 1) { dx = 0; dy = -1; update(); }
        }
    }
});

// Power-up collision detection in update is handled there
// Add power-up collection when head hits it
// This needs to be in the update function

// ===== GALLERY =====
const images = [
    'pics/1777151145193-019dc674-af3a-765e-910e-16c7da6ca65b.png',
    'pics/1777151129549-019dc674-af3a-72e2-9f38-3164c989fce6.png',
    'pics/1777151052838-019dc674-af3a-72e2-9f38-3164c989fce6.png',
    'pics/1777150998754-019dc673-9686-7141-8023-9734218376fd.png',
    'pics/1777150980393-019dc673-9686-7f62-b757-b50e3eae6d4b.png',
    'pics/1777150712591-019dc66f-267c-7cfc-a6cd-b4ce7794747e.png'
];
let currentImageIndex = 0;

function openGallery() {
    currentImageIndex = 0;
    showImage(0);
    document.getElementById('gallery-screen').classList.remove('hidden');
}
function closeGallery() { document.getElementById('gallery-screen').classList.add('hidden'); }

function showImage(index) {
    currentImageIndex = index;
    const img = document.getElementById('gallery-img');
    img.src = images[index];
    img.style.animation = 'none';
    img.offsetHeight;
    img.style.animation = 'fadeIn 0.3s ease';
    document.querySelectorAll('.gallery-thumbnails img').forEach((thumb, i) => thumb.classList.toggle('active', i === index));
    document.getElementById('gallery-counter').innerText = `${index + 1} / ${images.length}`;
}
function prevImage() { showImage((currentImageIndex - 1 + images.length) % images.length); }
function nextImage() { showImage((currentImageIndex + 1) % images.length); }

document.addEventListener('keydown', e => {
    if (!document.getElementById('gallery-screen').classList.contains('hidden')) {
        if (e.key === 'ArrowRight') prevImage();
        if (e.key === 'ArrowLeft') nextImage();
        if (e.key === 'Escape') closeGallery();
    }
});

// Sidebar
const sidebarFacts = [
    "ئىسلام ھىكمىتى: سەدىقە پۇلىڭىزنى كېمەيتىپ قويمايدۇ، ئەكسىچە بەرىكەت ئەكىلىدۇ.",
    "تۆگە ھەققىدە: تۆگە قۇملۇقتا كۈنلەپ سۇ ئىچمەي مېڭىش ئۈچۈن مەخسۇس ئاللاھ ياراتقان مۆجىزىلىك ھايۋاندۇر. بىر قېتىمدا 100 لېتىردىن ئارتۇق سۇ ئىچەلەيدۇ.",
    "كارۋان سۈننىتى: سەپەرگە چىققاندا بىر كىشىنى ئەمىر (باشلىق) قىلىپ تاللاش سۈننەتتۇر.",
    "ئەخلاق: كىشىلەرگە تەبەسسۇم قىلىشمۇ بىر خىل سەدىقىدۇر.",
    "تارىخ: يىپەك يولىدىكى ئۇيغۇر كارۋانلىرى دۇنيا سودىسىنىڭ ۋە مەدەنىيەت ئالماشتۇرۇشىنىڭ ئاچقۇچى بولغان.",
    "ھىكمەت: ئەڭ ياخشى ئادەم باشقىلارغا پايدىسى تېگىدىغان ئادەمدۇر."
];
let sidebarInterval;

function startSidebarFacts() {
    if (sidebarInterval) clearInterval(sidebarInterval);
    document.getElementById('sidebar-content').innerText = sidebarFacts[0];
    sidebarInterval = setInterval(() => {
        if (gameState === 'playing' && !isPaused) {
            let r = Math.floor(Math.random() * sidebarFacts.length);
            const el = document.getElementById('sidebar-content');
            el.style.animation = 'none';
            el.offsetHeight;
            el.style.animation = 'popIn 0.5s ease';
            el.innerText = sidebarFacts[r];
        }
    }, 10000);
}

// Load high score
highScore = parseInt(localStorage.getItem('karwan_high') || '0');
