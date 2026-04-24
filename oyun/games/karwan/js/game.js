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
let gridSize = 20;
let tileCountX, tileCountY;

let caravan = [];
let food = {x: 0, y: 0};
let dx = 1;
let dy = 0;

let score = 0;
let lastKnowledgeScore = 0;
let currentKnowledgeIndex = 0;

let speed = 250;
let gameLoop;
let isPaused = false;
let gameState = 'start'; // start, playing, gameover
let playerName = "ئالىپ";

// Initialize game environment
function initCanvas() {
    canvas = document.getElementById('game-canvas');
    ctx = canvas.getContext('2d');
    
    const container = document.querySelector('.canvas-container');
    
    // Canvas چوڭلۇقىنى بېكىتىش (تۆت چاسا ياكى ئېكرانغا ماس)
    let w = container.clientWidth - 20;
    let h = container.clientHeight - 20;
    
    // gridSize گە توغرا بۆلۈنىدىغان قىلىپ تەڭشەش
    canvas.width = w - (w % gridSize);
    canvas.height = h - (h % gridSize);
    
    tileCountX = canvas.width / gridSize;
    tileCountY = canvas.height / gridSize;
}

window.addEventListener('resize', () => {
    if(gameState === 'start' || gameState === 'gameover') {
        initCanvas();
    }
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
    startSidebarFacts();
    resetGameVariables();
    
    if(gameLoop) clearInterval(gameLoop);
    gameLoop = setInterval(update, speed);
}

function resetGameVariables() {
    let startX = Math.floor(tileCountX / 2);
    let startY = Math.floor(tileCountY / 2);
    // كارۋاننىڭ باشلىنىش ئورنى
    caravan = [
        {x: startX, y: startY},
        {x: startX - 1, y: startY},
        {x: startX - 2, y: startY}
    ];
    dx = 1; dy = 0;
    score = 0;
    lastKnowledgeScore = 0;
    speed = 250;
    currentKnowledgeIndex = 0;
    document.getElementById('score-text').innerText = score;
    spawnFood();
}

function spawnFood() {
    food.x = Math.floor(Math.random() * tileCountX);
    food.y = Math.floor(Math.random() * tileCountY);
    
    // تاماق كارۋاننىڭ ئۈستىگە چۈشۈپ قالماسلىقى كېرەك
    for(let i=0; i<caravan.length; i++) {
        if(food.x === caravan[i].x && food.y === caravan[i].y) {
            spawnFood();
            return;
        }
    }
}

// Main Game Loop
function update() {
    if(isPaused || gameState !== 'playing') return;
    
    let headX = caravan[0].x + dx;
    let headY = caravan[0].y + dy;
    
    // تامغا تېگىش تەكشۈرۈش
    if(headX < 0 || headX >= tileCountX || headY < 0 || headY >= tileCountY) {
        gameOver();
        return;
    }
    
    // ئۆزىگە تېگىش تەكشۈرۈش
    for(let i=0; i<caravan.length; i++) {
        if(headX === caravan[i].x && headY === caravan[i].y) {
            gameOver();
            return;
        }
    }
    
    // ئالدىغا مېڭىش
    caravan.unshift({x: headX, y: headY});
    
    // تاماق يېيىش
    if(headX === food.x && headY === food.y) {
        score++;
        document.getElementById('score-text').innerText = score;
        spawnFood();
        
        // ئازراق تېزلەشتۈرۈش
        if(speed > 100) speed -= 5;
        clearInterval(gameLoop);
        gameLoop = setInterval(update, speed);
        
        // ھەر 3 قەدەمدە بىلىم چىقىرىش
        if (score % 3 === 0 && score !== lastKnowledgeScore) {
            lastKnowledgeScore = score;
            showKnowledge();
        }
    } else {
        // تاماق يېمىسە ئارقىسىنى كېسىش
        caravan.pop();
    }
    
    draw();
}

function draw() {
    // ئارقا كۆرۈنۈشنى تازىلاش
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // كارۋان يىپىنى (سىزىقىنى) سىزىش
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 4;
    ctx.beginPath();
    for(let i=0; i<caravan.length; i++) {
        let px = caravan[i].x * gridSize + gridSize/2;
        let py = caravan[i].y * gridSize + gridSize/2;
        if(i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    }
    ctx.stroke();
    
    // كارۋان تۈگۈنلىرىنى (تۆگىلەرنى/ئاتلارنى) سىزىش
    caravan.forEach((segment, index) => {
        let isHead = index === 0;
        ctx.fillStyle = isHead ? '#fcd34d' : '#fffbeb'; // بېشى ئالتۇن، بەدىنى ئاق
        ctx.beginPath();
        ctx.arc(segment.x * gridSize + gridSize/2, segment.y * gridSize + gridSize/2, gridSize/2 - 2, 0, Math.PI*2);
        ctx.fill();
        
        // بېشىغا بەلگە قويۇش
        if(isHead) {
            ctx.fillStyle = '#b45309';
            ctx.beginPath();
            ctx.arc(segment.x * gridSize + gridSize/2, segment.y * gridSize + gridSize/2, 4, 0, Math.PI*2);
            ctx.fill();
        }
    });
    
    // مال/تاماق سىزىش (گۆھەر شەكلىدە)
    ctx.fillStyle = '#10b981'; // يېشىل گۆھەر
    ctx.beginPath();
    let fx = food.x * gridSize + gridSize/2;
    let fy = food.y * gridSize + gridSize/2;
    ctx.moveTo(fx, fy - gridSize/2 + 2);
    ctx.lineTo(fx + gridSize/2 - 2, fy);
    ctx.lineTo(fx, fy + gridSize/2 - 2);
    ctx.lineTo(fx - gridSize/2 + 2, fy);
    ctx.fill();
}

function showKnowledge() {
    isPaused = true;
    
    let k = knowledgeBase[currentKnowledgeIndex % knowledgeBase.length];
    currentKnowledgeIndex++;
    
    document.getElementById('knowledge-title').innerText = k.title;
    
    let prefix = "«كارۋان بېشى بۇغرا " + playerName + "»! ";
    document.getElementById('knowledge-text').innerText = prefix + k.text;
    
    showScreen('knowledge-screen');
}

function resumeGame() {
    isPaused = false;
    showScreen('game-screen');
}

function gameOver() {
    gameState = 'gameover';
    clearInterval(gameLoop);
    document.getElementById('final-score').innerText = score;
    showScreen('game-over-screen');
}

// --- كونترول قىلىش (Controls) ---

// Keyboard
document.addEventListener('keydown', e => {
    if(isPaused || gameState !== 'playing') return;
    let oldDx = dx, oldDy = dy;
    if(e.key === 'ArrowUp' && dy !== 1) { dx = 0; dy = -1; }
    if(e.key === 'ArrowDown' && dy !== -1) { dx = 0; dy = 1; }
    // RTL layout means physical left arrow is left, right is right
    if(e.key === 'ArrowLeft' && dx !== 1) { dx = -1; dy = 0; }
    if(e.key === 'ArrowRight' && dx !== -1) { dx = 1; dy = 0; }
    
    // Boost effect when pressing keys rapidly or holding down
    if((oldDx === dx && oldDy === dy) || (oldDx !== dx || oldDy !== dy)) {
        update(); // Call update immediately to speed up
    }
});

// Sidebar Facts Logic
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
    if(sidebarInterval) clearInterval(sidebarInterval);
    document.getElementById('sidebar-content').innerText = sidebarFacts[0];
    sidebarInterval = setInterval(() => {
        if(gameState === 'playing' && !isPaused) {
            let r = Math.floor(Math.random() * sidebarFacts.length);
            let el = document.getElementById('sidebar-content');
            el.style.animation = 'none';
            el.offsetHeight; /* trigger reflow */
            el.style.animation = 'popIn 0.5s ease';
            el.innerText = sidebarFacts[r];
        }
    }, 10000);
}

// On-screen Buttons
window.changeDir = function(newDx, newDy) {
    if(isPaused || gameState !== 'playing') return;
    if (newDx === 1 && dx === -1) return;
    if (newDx === -1 && dx === 1) return;
    if (newDy === 1 && dy === -1) return;
    if (newDy === -1 && dy === 1) return;
    dx = newDx; dy = newDy;
}

window.startBoost = function(newDx, newDy) {
    changeDir(newDx, newDy);
    clearInterval(gameLoop);
    gameLoop = setInterval(update, 50);
}

window.stopBoost = function() {
    clearInterval(gameLoop);
    gameLoop = setInterval(update, speed);
}

// Swipe
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', e => {
    if(e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.tagName === 'INPUT') return;
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}, {passive: false});

document.addEventListener('touchmove', e => {
    if(gameState === 'playing' && e.target.tagName !== 'BUTTON') {
        e.preventDefault(); // Prevent scroll while playing
    }
}, {passive: false});

document.addEventListener('touchend', e => {
    if(isPaused || gameState !== 'playing') return;
    if(e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.tagName === 'INPUT') return;
    
    let touchEndX = e.changedTouches[0].screenX;
    let touchEndY = e.changedTouches[0].screenY;
    
    let diffX = touchEndX - touchStartX;
    let diffY = touchEndY - touchStartY;
    
    if(Math.abs(diffX) > Math.abs(diffY)) {
        if(Math.abs(diffX) > 30) {
            if(diffX > 0 && dx !== -1) { dx = 1; dy = 0; } // right
            else if(diffX < 0 && dx !== 1) { dx = -1; dy = 0; } // left
        }
    } else {
        if(Math.abs(diffY) > 30) {
            if(diffY > 0 && dy !== -1) { dx = 0; dy = 1; } // down
            else if(diffY < 0 && dy !== 1) { dx = 0; dy = -1; } // up
        }
    }
});
