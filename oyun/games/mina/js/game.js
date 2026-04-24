const levels = [
    { name: "قەشقەر مەيدانى", rows: 8, cols: 8, mines: 8, geo: "قەشقەر: قەدىمكى يىپەك يولىدىكى مەرۋايىت. قاراخانىيلارنىڭ پايتەختى. بۇ يەردە مەھمۇد قەشقىرى ۋە يۈسۈپ خاس ھاجىپلار يېتىشىپ چىققان." },
    { name: "خوتەن مەيدانى", rows: 10, cols: 10, mines: 15, geo: "خوتەن: قاشتېشى ۋە يىپەك بىلەن داڭلىق. تارىختا ئىسلام نۇرىنى بالدۇر قوبۇل قىلغان قەھرىمانلار، ئالىملار دىيارى." },
    { name: "ئاقسۇ مەيدانى", rows: 12, cols: 10, mines: 22, geo: "ئاقسۇ: سۈيى سۈزۈك، تۇپرىقى مۇنبەت دىيار. تارىختا كۆپلىگەن باتۇرلار ۋە ئىسلام ئالىملىرى يېتىشىپ چىققان شەھەر." },
    { name: "تۇرپان مەيدانى", rows: 12, cols: 12, mines: 30, geo: "تۇرپان: ئىسسىق ھەم قۇرغاق، كارىز سۇ سىستېمىسى بىلەن دۇنياغا داڭلىق. ئۇيغۇرلارنىڭ ئەڭ بۇرۇنقى مەدەنىيەت بۆشۈكلىرىدىن بىرى." },
    { name: "ئۈرۈمچى مەيدانى", rows: 14, cols: 12, mines: 40, geo: "ئۈرۈمچى: گۈزەل يايلىقى بار. ھازىرقى شەرقىي تۈركىستاننىڭ مەركىزى. نۇرغۇنلىغان سىياسىي ھەرىكەتلەرنىڭ شاھىتى." },
    { name: "غۇلجا مەيدانى", rows: 16, cols: 12, mines: 50, geo: "غۇلجا (ئىلى): تەبىئىتى گۈزەل، سۈيى مول. 1944-يىلدىكى مىللىي ئارمىيەنىڭ بۆشۈكى ۋە شەرقىي تۈركىستان جۇمھۇرىيىتىنىڭ پايتەختى." }
];

const knowledgeBase = [
    "سۇلتان سۇتۇق بۇغراخاننىڭ ھىدايەت تېپىشى تارىخىمىزدىكى ئەڭ بۈيۈك بۇرۇلۇشتۇر. ئۇنىڭ باتۇرلۇقى بىلەن خەلق ئىسلامغا كىرگەن.",
    "سابىت داموللام قورقماس ئىمانى ۋە بىلىمى بىلەن مىللەتنى ئويغىتىپ، مۇستەقىللىق مەشئىلىنى ياققان.",
    "يۈسۈپ خاس ھاجىپ: «بىلىم – ئادەمنىڭ قانات-قۇيرۇقى، بىلىملىك كىشى ھەر يەردە ئەزىز» دېگەن.",
    "سەئىدخاننىڭ كۈچلۈك ئىرادىسى ۋە جىھادى شەرقىي تۈركىستاننى بىرلىككە كەلتۈرۈپ سەئىدىيە خانلىقىنى قۇرغان.",
    "ئەرەب تىلى ھىكمىتى: «الصبر مفتاح الفرج» - يەنى سەۋر قىلىش مۇۋەپپەقىيەتنىڭ ئاچقۇچىدۇر. مىنا تازىلاش دەل سەۋرنى تەلەپ قىلىدۇ.",
    "تەپەككۇر مەشىقى: 1 كۆرسەتكەن كاتەكچىنىڭ ئەتراپىدىكى 8 كاتەكچىدە پەقەت 1 مىنالا بولىدۇ. ئەتراپلىق ئويلاڭ!",
    "ئەخلاق: كىشىلەرنى ئۆلۈمدىن (مىنادىن) قۇتۇلدۇرۇش ئەڭ بۈيۈك ياخشىلىقلاردىندۇر.",
    "جىھاد ھۆكۈمى: ۋەتەننى، خەلقنى تاجاۋۇزچىنىڭ زۇلمىدىن قۇتۇلدۇرۇش ئۈچۈن قىلىنغان ھەر قانداق ئىلمىي ۋە ھەربىي كۈرەش جىھادتۇر.",
    "مەھمۇد قەشقىرى: تۈركىي تىللارنى ئەرەبلەرگە ئۆگىتىپ، مەدەنىيىتىمىزنىڭ شۆھرىتىنى دۇنياغا تاراتقان.",
    "ئاتا-ئانىغا ياخشىلىق قىلىش جەننەتنىڭ ئاچقۇچىدۇر. باتۇرلار ئاتا-ئانىسىنى سۆيىدۇ ۋە ئۇلارنىڭ دۇئاسىنى ئالىدۇ."
];

let board = [];
let currentLevel = 0;
let minesLeft = 0;
let timeElapsed = 0;
let timerInterval;
let knowledgeInterval;
let gameOver = false;
let playerName = "ۋەتەنپەرۋەر";

// Abilities
let mode = 'reveal'; // 'reveal' or 'flag'
let hints = 3;
let shields = 1;
let shieldActive = false;
let firstClick = true;

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}

function showStartScreen() {
    showScreen('start-screen');
}

function startGame() {
    const nameInput = document.getElementById('playerName').value.trim();
    if(nameInput) playerName = nameInput;
    document.getElementById('display-name').innerText = playerName;
    
    currentLevel = 0;
    hints = 3;
    shields = 1;
    
    initLevel();
    showScreen('game-screen');
}

function nextLevel() {
    currentLevel++;
    if(currentLevel >= levels.length) {
        showScreen('victory-screen');
        return;
    }
    initLevel();
    showScreen('game-screen');
}

function restartLevel() {
    initLevel();
    showScreen('game-screen');
}

function initLevel() {
    let levelData = levels[currentLevel];
    document.getElementById('level-name').innerText = levelData.name;
    document.getElementById('geo-content').innerText = levelData.geo;
    
    minesLeft = levelData.mines;
    document.getElementById('mines-left').innerText = minesLeft;
    
    timeElapsed = 0;
    document.getElementById('time-text').innerText = timeElapsed;
    if(timerInterval) clearInterval(timerInterval);
    
    if(knowledgeInterval) clearInterval(knowledgeInterval);
    updateKnowledge();
    knowledgeInterval = setInterval(updateKnowledge, 10000);
    
    updateAbilitiesUI();
    
    firstClick = true;
    gameOver = false;
    shieldActive = false;
    document.querySelector('.shield-btn').classList.remove('shield-active');
    
    createBoard(levelData.rows, levelData.cols);
    updateProgress();
}

function updateKnowledge() {
    if(gameOver) return;
    let r = Math.floor(Math.random() * knowledgeBase.length);
    let el = document.getElementById('sidebar-content');
    el.style.animation = 'none';
    el.offsetHeight; 
    el.style.animation = 'popIn 0.5s ease';
    el.innerText = knowledgeBase[r];
}

function updateAbilitiesUI() {
    document.getElementById('hint-count').innerText = hints;
    document.getElementById('shield-count').innerText = shields;
}

function toggleMode() {
    let btn = document.getElementById('mode-btn');
    if(mode === 'reveal') {
        mode = 'flag';
        btn.className = 'action-btn mode-flag';
        btn.innerHTML = '<i class="fas fa-flag"></i> <span>بەلگە (ئاي-يۇلتۇز)</span>';
    } else {
        mode = 'reveal';
        btn.className = 'action-btn mode-reveal';
        btn.innerHTML = '<i class="fas fa-hand-pointer"></i> <span>ئېچىش ھالىتى</span>';
    }
}

window.useHint = function() {
    if(hints > 0 && !gameOver && !firstClick) {
        // Find a safe unrevealed cell
        let safeCells = [];
        for(let r=0; r<levels[currentLevel].rows; r++) {
            for(let c=0; c<levels[currentLevel].cols; c++) {
                if(!board[r][c].isMine && !board[r][c].isRevealed && !board[r][c].isFlagged) {
                    safeCells.push({r, c});
                }
            }
        }
        if(safeCells.length > 0) {
            hints--;
            updateAbilitiesUI();
            let randomSafe = safeCells[Math.floor(Math.random() * safeCells.length)];
            revealCell(randomSafe.r, randomSafe.c);
        }
    }
}

window.useShield = function() {
    if(shields > 0 && !gameOver && !shieldActive) {
        shields--;
        shieldActive = true;
        updateAbilitiesUI();
        document.querySelector('.shield-btn').classList.add('shield-active');
    }
}

function createBoard(rows, cols) {
    const boardEl = document.getElementById('game-board');
    boardEl.innerHTML = '';
    boardEl.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    
    board = [];
    for(let r = 0; r < rows; r++) {
        let row = [];
        for(let c = 0; c < cols; c++) {
            let cell = {
                r: r, c: c,
                isMine: false,
                isRevealed: false,
                isFlagged: false,
                neighborMines: 0,
                element: document.createElement('div')
            };
            cell.element.className = 'cell';
            
            // Interaction
            cell.element.addEventListener('click', () => handleCellClick(r, c));
            cell.element.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                toggleFlag(r, c);
            });
            
            boardEl.appendChild(cell.element);
            row.push(cell);
        }
        board.push(row);
    }
}

function placeMines(firstR, firstC) {
    let levelData = levels[currentLevel];
    let minesPlaced = 0;
    while(minesPlaced < levelData.mines) {
        let r = Math.floor(Math.random() * levelData.rows);
        let c = Math.floor(Math.random() * levelData.cols);
        
        // Ensure not the first clicked cell, and not already a mine
        if(!board[r][c].isMine && Math.abs(r - firstR) > 1 && Math.abs(c - firstC) > 1) {
            board[r][c].isMine = true;
            minesPlaced++;
        }
    }
    
    // Calculate neighbor mines
    for(let r = 0; r < levelData.rows; r++) {
        for(let c = 0; c < levelData.cols; c++) {
            if(!board[r][c].isMine) {
                let count = 0;
                for(let dr = -1; dr <= 1; dr++) {
                    for(let dc = -1; dc <= 1; dc++) {
                        let nr = r + dr; let nc = c + dc;
                        if(nr >= 0 && nr < levelData.rows && nc >= 0 && nc < levelData.cols && board[nr][nc].isMine) {
                            count++;
                        }
                    }
                }
                board[r][c].neighborMines = count;
            }
        }
    }
    
    timerInterval = setInterval(() => {
        timeElapsed++;
        document.getElementById('time-text').innerText = timeElapsed;
    }, 1000);
}

function handleCellClick(r, c) {
    if(gameOver) return;
    let cell = board[r][c];
    if(cell.isRevealed) {
        // Chord feature: if click revealed cell with correct flags around, reveal neighbors
        checkChord(r, c);
        return;
    }
    
    if(mode === 'flag') {
        toggleFlag(r, c);
        return;
    }
    
    if(cell.isFlagged) return; // Can't click flagged
    
    if(firstClick) {
        firstClick = false;
        placeMines(r, c);
    }
    
    if(cell.isMine) {
        if(shieldActive) {
            // Shield absorbs it
            shieldActive = false;
            document.querySelector('.shield-btn').classList.remove('shield-active');
            cell.isFlagged = true; // Auto flag it
            cell.element.innerHTML = '☪️';
            cell.element.classList.add('flag');
            minesLeft--;
            document.getElementById('mines-left').innerText = minesLeft;
            updateKnowledge(); // Maybe flash a message
            let el = document.getElementById('sidebar-content');
            el.innerText = "ئاللاھقا شۈكۈر! قالقان مىنىنى توسۇپ قالدى، سىز ئامان قالدىڭىز!";
            el.style.color = "#10b981";
            setTimeout(() => el.style.color = "#e2e8f0", 3000);
            checkWin();
        } else {
            triggerGameOver(r, c);
        }
    } else {
        revealCell(r, c);
    }
}

function toggleFlag(r, c) {
    if(gameOver) return;
    let cell = board[r][c];
    if(cell.isRevealed) return;
    
    if(cell.isFlagged) {
        cell.isFlagged = false;
        cell.element.innerHTML = '';
        cell.element.classList.remove('flag');
        minesLeft++;
    } else {
        if(minesLeft > 0) {
            cell.isFlagged = true;
            cell.element.innerHTML = '☪️'; // Sharqiy Turkistan flag symbol
            cell.element.classList.add('flag');
            minesLeft--;
        }
    }
    document.getElementById('mines-left').innerText = minesLeft;
    checkWin(); // Sometimes people flag all mines and win
}

function revealCell(r, c) {
    let cell = board[r][c];
    if(cell.isRevealed || cell.isFlagged) return;
    
    cell.isRevealed = true;
    cell.element.classList.add('revealed');
    
    if(cell.neighborMines > 0) {
        cell.element.innerText = cell.neighborMines;
        cell.element.classList.add('c-' + cell.neighborMines);
    } else {
        // Flood fill empty spaces
        let levelData = levels[currentLevel];
        for(let dr = -1; dr <= 1; dr++) {
            for(let dc = -1; dc <= 1; dc++) {
                let nr = r + dr; let nc = c + dc;
                if(nr >= 0 && nr < levelData.rows && nc >= 0 && nc < levelData.cols) {
                    revealCell(nr, nc);
                }
            }
        }
    }
    updateProgress();
    checkWin();
}

function checkChord(r, c) {
    let cell = board[r][c];
    if(cell.neighborMines === 0) return;
    
    let levelData = levels[currentLevel];
    let flagCount = 0;
    
    for(let dr = -1; dr <= 1; dr++) {
        for(let dc = -1; dc <= 1; dc++) {
            let nr = r + dr; let nc = c + dc;
            if(nr >= 0 && nr < levelData.rows && nc >= 0 && nc < levelData.cols) {
                if(board[nr][nc].isFlagged) flagCount++;
            }
        }
    }
    
    if(flagCount === cell.neighborMines) {
        for(let dr = -1; dr <= 1; dr++) {
            for(let dc = -1; dc <= 1; dc++) {
                let nr = r + dr; let nc = c + dc;
                if(nr >= 0 && nr < levelData.rows && nc >= 0 && nc < levelData.cols) {
                    if(!board[nr][nc].isFlagged && !board[nr][nc].isRevealed) {
                        handleCellClick(nr, nc); // Safe (or mistake!) to reveal
                    }
                }
            }
        }
    }
}

function triggerGameOver(r, c) {
    gameOver = true;
    clearInterval(timerInterval);
    clearInterval(knowledgeInterval);
    
    // Reveal all mines
    let levelData = levels[currentLevel];
    for(let i = 0; i < levelData.rows; i++) {
        for(let j = 0; j < levelData.cols; j++) {
            let cell = board[i][j];
            if(cell.isMine) {
                cell.element.classList.add('revealed');
                cell.element.classList.add('mine');
                cell.element.innerHTML = '<i class="fas fa-bomb"></i>';
                if(i === r && j === c) {
                    cell.element.style.background = '#7f1d1d'; // the one that killed you
                }
            } else if(cell.isFlagged) {
                // Wrong flag
                cell.element.innerHTML = '❌';
            }
        }
    }
    
    setTimeout(() => {
        showScreen('game-over-screen');
    }, 1500);
}

function checkWin() {
    let levelData = levels[currentLevel];
    let revealedCount = 0;
    let safeCells = (levelData.rows * levelData.cols) - levelData.mines;
    
    for(let i = 0; i < levelData.rows; i++) {
        for(let j = 0; j < levelData.cols; j++) {
            if(board[i][j].isRevealed) revealedCount++;
        }
    }
    
    if(revealedCount === safeCells) {
        gameOver = true;
        clearInterval(timerInterval);
        clearInterval(knowledgeInterval);
        
        // Flag remaining mines automatically
        for(let i = 0; i < levelData.rows; i++) {
            for(let j = 0; j < levelData.cols; j++) {
                if(board[i][j].isMine && !board[i][j].isFlagged) {
                    board[i][j].element.innerHTML = '☪️';
                    board[i][j].element.classList.add('flag');
                }
            }
        }
        
        document.getElementById('level-geo-full').innerText = levelData.geo;
        
        setTimeout(() => {
            showScreen('level-up-screen');
        }, 1000);
    }
}

function updateProgress() {
    let levelData = levels[currentLevel];
    let safeCells = (levelData.rows * levelData.cols) - levelData.mines;
    let revealedCount = 0;
    
    for(let i = 0; i < levelData.rows; i++) {
        for(let j = 0; j < levelData.cols; j++) {
            if(board[i][j].isRevealed) revealedCount++;
        }
    }
    
    let pct = Math.floor((revealedCount / safeCells) * 100);
    document.getElementById('progress-text').innerText = pct + '%';
    document.getElementById('progress-fill').style.width = pct + '%';
}
