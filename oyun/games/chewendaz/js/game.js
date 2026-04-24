/**
 * باتۇر چەۋەنداز - 3D يۈگۈرەش ئويۇنى كودى
 * 
 * === 3D مودېللارنى ئالماشتۇرۇش قوللانمىسى ===
 * ھۆرمەتلىك ئاچقۇچى، سىز بۇ ئويۇندىكى شەكىللەرنىڭ ئورنىغا ئۆزىڭىزنىڭ 3D رەسىملىرىنى (Model) قويسڭىز بولىدۇ.
 * 1. مودېل فورماتى: .glb ياكى .gltf بولسۇن.
 * 2. ئورنى: `oyun/games/chewendaz/assets/models/` قىسقۇچىغا قويۇڭ.
 * 3. كودتا ئالماشتۇرۇش:
 *    مەسىلەن، ئاتنى ئالماشتۇرۇش ئۈچۈن 'createPlayer()' ئىچىدە:
 *    const loader = new THREE.GLTFLoader();
 *    loader.load('assets/models/horse.glb', function(gltf) {
 *        playerGroup.add(gltf.scene);
 *    });
 *    ھازىرچە مەن رەڭلىك گېئومېتىرىيەلىك شەكىللەر بىلەن كۆرسەتتىم، چۈنكى بۇ تورسىزمۇ ئىشلەيدۇ.
 * ============================================
 */

// --- ئويۇن سانلىق مەلۇماتلىرى (Game Data) ---
const levelsData = [
    {
        level: 1,
        targetDistance: 500,
        speed: 0.3,
        storyTitle: "1-باسقۇچقا ئاتلىنىش",
        storyText: "ئەسسالامۇ ئەلەيكۇم {name}! سەن ئۇلۇغ خاقانىمىز ساتۇق بۇغراخاننىڭ ئەۋلادى. بوۋىلىرىڭدەك باتۇر، قورقماس، ئىرادىلىك، ئەقىللىق، پاراسەتلىك چوڭ بولغىن. ۋەتەن - مىللەتنىڭ ئۈمىدى سەن! يولدىكى تاجاۋۇزچىلاردىن ئايلىنىپ ئۆت ياكى قېلىچ بىلەن چاپ، كىتاب ۋە تەڭگىلەرنى يىغ!"
    },
    {
        level: 2,
        targetDistance: 1000,
        speed: 0.4,
        storyTitle: "كۈرشادنىڭ روھى",
        storyText: "تارىخ ئەسلىتىمىسى: كۆكتۈرك شاھزادىسى كۈرشاد 40 باتۇرى بىلەن خىتاي پادىشاھىنىڭ ئوردىسىغا كىرىپ ھۇجۇم قىلىپ، تۈرك مىللىتىنىڭ قورقماس ئىرادىسىنى نامايان قىلغان. سەنمۇ شۇنداق قورقماس باتۇر بول!"
    },
    {
        level: 3,
        targetDistance: 1500,
        speed: 0.5,
        storyTitle: "قاراخانىيلار نۇرى",
        storyText: "تارىخ ئەسلىتىمىسى: قاراخانىيلار خاقانى سۇلتان سۇتۇق بۇغراخان ئىسلام دىنىنى قوبۇل قىلىپ، شەرقىي تۈركىستاندا ئىسلامنىڭ نۇرىنى چاقناتتى ۋە تارىخنى ئۆزگەرتتى. ئىلىم ۋە ئىمان بىلەن قوراللان!"
    },
    {
        level: 4,
        targetDistance: 2000,
        speed: 0.6,
        storyTitle: "سەئىدىيە ئالتۇن دەۋرى",
        storyText: "تارىخ ئەسلىتىمىسى: سۇلتان سەئىدخان سەئىدىيە خانلىقىنى قۇرۇپ، ئۇيغۇر مەدەنىيىتى، ئەدەبىياتى ۋە ئىسلام ئىلمىنىڭ ئالتۇن دەۋرىنى ياراتتى. ئەجدادلىرىڭنىڭ ئىزىدىن بېرىپ مەرىپەتنى كۈچەيت!"
    },
    {
        level: 5,
        targetDistance: 2500,
        speed: 0.75,
        storyTitle: "ئويغىنىش مەرشى",
        storyText: "تارىخ ئەسلىتىمىسى: سابىت داموللام قاتارلىق مەرىپەتپەرۋەر ئالىملىرىمىز 1933-يىلى قەشقەردە شەرقىي تۈركىستان ئىسلام جۇمھۇرىيىتىنى قۇرۇپ، زامانىۋى ئىسلام دۆلىتىنىڭ ئۇلىنى سالدى. ئەمدى ئەڭ ئاخىرقى غەلىبىگە يۈرۈش قىل!"
    }
];

const ranks = ["ئونبېشى", "يۈزبېشى", "مىڭبېشى", "تۈمەنبېشى", "سانغۇن", "تېكىن", "يابغۇ", "قاغان"];
const wisdoms = [
    "5 x 5 = 25", "ئاتا-ئانىنى ھۆرمەت قىل!", "ۋەتەننى سۆيۈش ئىماندىن", 
    "7 x 8 = 56", "ئىلىم ئۆگىنىش پەرز", "بىلىم - كۈچتۇر", 
    "ساداقەت ۋە جاسارەت!", "ئاللاھ بىر ۋە قۇدرەتلىك", "9 x 9 = 81",
    "ۋاقىت ئالتۇن", "ئۇيغۇر تىلىم - ئۆز تىلىم", "ئەل كۈچى - كەلكۈن",
    "ياخشىلىق قىل"
];

// --- ئويۇن ھالىتى (Game State) ---
let gameState = {
    status: 'menu', // menu, story, playing, gameover
    playerName: '',
    level: 1,
    distance: 0,
    books: 0,
    coins: 0,
    enemiesDefeated: 0,
    rankIndex: 0,
    currentSpeed: 0.3
};

// --- Three.js تەڭشەكلىرى (Three.js Setup) ---
const container = document.getElementById('game-canvas');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);
scene.fog = new THREE.Fog(0x87CEEB, 20, 150);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
// كۆزىتىش بۇلۇڭى: ئارقىدىن ئازراق ئۈستىدىن قارايدۇ
camera.position.set(0, 8, 15);
camera.lookAt(0, 2, -20);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
container.appendChild(renderer.domElement);

// چىراقلار (Lighting)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(20, 40, 20);
dirLight.castShadow = true;
dirLight.shadow.camera.top = 50;
dirLight.shadow.camera.bottom = -50;
dirLight.shadow.camera.left = -50;
dirLight.shadow.camera.right = 50;
scene.add(dirLight);

// يەر (Ground)
const groundGeo = new THREE.PlaneGeometry(100, 1000);
const groundMat = new THREE.MeshStandardMaterial({ color: 0x2d4c1e, roughness: 0.8 }); // Green steppe
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
ground.position.z = -400;
ground.receiveShadow = true;
scene.add(ground);

// يول سىزىقلىرى كۆرۈنۈشى (Decorative lanes)
for(let i=0; i<6; i++) {
    let lineGeo = new THREE.PlaneGeometry(0.2, 1000);
    let lineMat = new THREE.MeshBasicMaterial({ color: 0x4a7c30 });
    let line = new THREE.Mesh(lineGeo, lineMat);
    line.rotation.x = -Math.PI / 2;
    line.position.set(-7.5 + (i * 3), 0.01, -400);
    scene.add(line);
}

// --- ئويۇن ئوبيېكتلىرى (Game Objects) ---
let playerGroup;
let playerSword;
const activeObjects = []; // obstacles, enemies, collectibles
const LANE_WIDTH = 3;
const LANES = [-6, -3, 0, 3, 6]; // 5 lanes
let currentLaneIndex = 2; // Middle lane
let playerYVelocity = 0;
let isJumping = false;
let isAttacking = false;

// مودېللارنى ياساش (Creating placeholder models)
function initModels() {
    playerGroup = new THREE.Group();
    
    // ئات (Horse) - قوڭۇر
    const horseGeo = new THREE.BoxGeometry(1.5, 2, 3.5);
    const horseMat = new THREE.MeshStandardMaterial({ color: 0x5c4033 });
    const horse = new THREE.Mesh(horseGeo, horseMat);
    horse.position.y = 1;
    horse.castShadow = true;
    playerGroup.add(horse);
    
    // ئات بېشى
    const horseHeadGeo = new THREE.BoxGeometry(0.8, 1.2, 1.5);
    const horseHead = new THREE.Mesh(horseHeadGeo, horseMat);
    horseHead.position.set(0, 2.2, -1.5);
    horseHead.rotation.x = Math.PI / 6;
    horseHead.castShadow = true;
    playerGroup.add(horseHead);

    // مىنگۈچى (Rider - Player) - كۆك رەڭ، باتۇرچە
    const riderGeo = new THREE.BoxGeometry(1, 1.5, 1);
    const riderMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a }); // كۆك
    const rider = new THREE.Mesh(riderGeo, riderMat);
    rider.position.set(0, 2.8, 0.2);
    rider.castShadow = true;
    playerGroup.add(rider);

    // قېلىچ (Sword)
    const swordGeo = new THREE.BoxGeometry(0.1, 2.5, 0.3);
    const swordMat = new THREE.MeshStandardMaterial({ color: 0xe5e7eb, metalness: 0.8 });
    playerSword = new THREE.Mesh(swordGeo, swordMat);
    playerSword.position.set(0.8, 3.5, -0.5);
    playerSword.rotation.x = Math.PI / 4;
    playerSword.visible = false;
    playerGroup.add(playerSword);

    scene.add(playerGroup);
}

initModels();

// ئوبيېكت چىقىرىش (Spawning Objects)
let spawnTimer = 0;
function spawnRow() {
    if (gameState.status !== 'playing') return;
    
    // ھەر قاتاردا قانچە نەرسە چىقىدۇ
    const numObjects = Math.floor(Math.random() * 3) + 1; 
    let usedLanes = [];

    for(let i=0; i<numObjects; i++) {
        let laneIdx;
        do {
            laneIdx = Math.floor(Math.random() * 5);
        } while(usedLanes.includes(laneIdx));
        usedLanes.push(laneIdx);

        const typeRoll = Math.random();
        let type, mesh;

        if (typeRoll < 0.4) {
            // توسالغۇ ساندۇق (Obstacle Box)
            type = 'box';
            mesh = new THREE.Mesh(
                new THREE.BoxGeometry(2, 2, 2),
                new THREE.MeshStandardMaterial({ color: 0x8B4513 }) // ياغاچ رەڭ
            );
            mesh.position.y = 1;
        } else if (typeRoll < 0.7) {
            // تاجاۋۇزچى (Enemy) - قىزىل بويالغان توكماق
            type = 'enemy';
            mesh = new THREE.Mesh(
                new THREE.BoxGeometry(1.5, 3, 1.5),
                new THREE.MeshStandardMaterial({ color: 0xb91c1c }) // قىزىل دۈشمەن
            );
            mesh.position.y = 1.5;
        } else if (typeRoll < 0.9) {
            // كىتاب (Book)
            type = 'book';
            mesh = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1.5, 0.3),
                new THREE.MeshStandardMaterial({ color: 0x3b82f6 }) // كۆك كىتاب
            );
            mesh.position.y = 1.5;
            mesh.rotation.y = Math.PI / 4;
        } else {
            // تەڭگە (Coin)
            type = 'coin';
            mesh = new THREE.Mesh(
                new THREE.CylinderGeometry(0.8, 0.8, 0.2, 16),
                new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 1 }) // ئالتۇن
            );
            mesh.position.y = 1.5;
            mesh.rotation.x = Math.PI / 2;
        }

        mesh.position.x = LANES[laneIdx];
        mesh.position.z = -120; // ئالدىدا يىراقتىن پەيدا بولىدۇ
        mesh.castShadow = true;
        mesh.userData = { type: type, lane: laneIdx };
        
        scene.add(mesh);
        activeObjects.push(mesh);
    }
}

// --- كونترول قىلىش (Controls) ---
function movePlayer(direction) {
    if (direction === 'left' && currentLaneIndex > 0) {
        currentLaneIndex--;
    } else if (direction === 'right' && currentLaneIndex < 4) {
        currentLaneIndex++;
    }
}

function jumpPlayer() {
    if (!isJumping) {
        isJumping = true;
        playerYVelocity = 0.6; // سەكرەش كۈچى
    }
}

function attackPlayer() {
    if (isAttacking) return;
    isAttacking = true;
    playerSword.visible = true;
    
    // ئاددىي كارتون ئۈنۈمى (Simple slash animation trick without tween.js)
    let slashSteps = 0;
    const slashInterval = setInterval(() => {
        slashSteps++;
        playerSword.rotation.x -= 0.2;
        
        if (slashSteps === 5) {
            // زەربە بېرىش تەسىرىنى تەكشۈرۈش (Hit detection)
            checkAttackHit();
        }
        
        if (slashSteps >= 10) {
            clearInterval(slashInterval);
            playerSword.visible = false;
            playerSword.rotation.x = Math.PI / 4; // ئەسلىگە قايتىش
            isAttacking = false;
        }
    }, 20);
}

function checkAttackHit() {
    for (let i = activeObjects.length - 1; i >= 0; i--) {
        let obj = activeObjects[i];
        // ئالدىدىكى ئوبيېكتلارنى تەكشۈرۈش
        if (obj.userData.lane === currentLaneIndex && obj.position.z > -10 && obj.position.z < -2) {
            if (obj.userData.type === 'enemy') {
                removeObject(i);
                gameState.enemiesDefeated++;
                updateRank();
                showFloatingText("زەربە!", window.innerWidth/2, window.innerHeight/2 - 100);
            } else if (obj.userData.type === 'box') {
                removeObject(i);
                // ساندۇق چېقىلسا بەلكىم كىتاب چىقىشى مۇمكىن
                if(Math.random() > 0.5) collectItem('book');
            }
        }
    }
}

// كۇنۇپكا تاختىسى بىلەن كونترول
document.addEventListener('keydown', (e) => {
    if (gameState.status !== 'playing') return;
    if (e.key === 'ArrowLeft') movePlayer('left');
    if (e.key === 'ArrowRight') movePlayer('right');
    if (e.key === 'ArrowUp' || e.key === ' ') jumpPlayer();
    if (e.key === 'Control' || e.key === 'Enter') attackPlayer();
});

// يانفون ئېكران سىيرىش بىلەن كونترول
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', e => {
    if(e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.tagName === 'INPUT') return;
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', e => {
    if(e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.tagName === 'INPUT') return;
    if (gameState.status !== 'playing') return;
    
    let touchEndX = e.changedTouches[0].screenX;
    let touchEndY = e.changedTouches[0].screenY;
    
    let diffX = touchEndX - touchStartX;
    let diffY = touchEndY - touchStartY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        // Horizontal
        if (Math.abs(diffX) > 40) {
            if (diffX > 0) movePlayer('right');
            else movePlayer('left');
        } else {
            attackPlayer(); // ئازراقلا سىيرىلسا ياكى چەكسە
        }
    } else {
        // Vertical
        if (diffY < -40) {
            jumpPlayer();
        } else if(Math.abs(diffY) < 20) {
            attackPlayer();
        }
    }
});


// --- لوگىكا ۋە تەكشۈرۈش (Logic & Collision) ---

function collectItem(type) {
    if (type === 'book') {
        gameState.books++;
        document.getElementById('hud-books').innerText = gameState.books;
        const msg = wisdoms[Math.floor(Math.random() * wisdoms.length)];
        showFloatingText(msg, window.innerWidth/2, window.innerHeight/3);
    } else if (type === 'coin') {
        gameState.coins++;
        document.getElementById('hud-coins').innerText = gameState.coins;
    }
}

function updateRank() {
    // ھەر 5 دۈشمەن يوقاتقاندا ئۇنۋان ئۆسىدۇ
    let newRankIdx = Math.floor(gameState.enemiesDefeated / 5);
    if (newRankIdx > ranks.length - 1) newRankIdx = ranks.length - 1;
    
    if (newRankIdx > gameState.rankIndex) {
        gameState.rankIndex = newRankIdx;
        document.getElementById('hud-rank').innerText = ranks[gameState.rankIndex];
        showFloatingText("ئۇنۋانىڭىز ئۆستى!", window.innerWidth/2, window.innerHeight/4);
    }
}

function showFloatingText(text, x, y) {
    const el = document.createElement('div');
    el.className = 'floating-text';
    el.innerText = text;
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1500);
}

function removeObject(index) {
    scene.remove(activeObjects[index]);
    activeObjects.splice(index, 1);
}

function handleCollision(obj, index) {
    if (obj.userData.type === 'book' || obj.userData.type === 'coin') {
        collectItem(obj.userData.type);
        removeObject(index);
    } else if (obj.userData.type === 'box' || obj.userData.type === 'enemy') {
        // تېگىپ كەتتى، جازا: تېزلىك ئاستىلايدۇ ياكى ئارقىغا قايتىدۇ.
        // بالىلار ئۈچۈن بولغاچقا، ئويۇن تۈگەپ كەتمەيدۇ، پەقەت سىلكىنىپ قالىدۇ ۋە ئوبيېكت يوقايدۇ.
        showFloatingText("دىققەت قىل!", window.innerWidth/2, window.innerHeight/2);
        removeObject(index);
    }
}

// --- UI ۋە ئويۇن ئېقىمى (UI and Game Flow) ---

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    if(id) document.getElementById(id).classList.remove('hidden');
}

document.getElementById('btn-start').addEventListener('click', () => {
    const name = document.getElementById('playerNameInput').value.trim() || 'باتۇر';
    gameState.playerName = name;
    document.getElementById('hud-name').innerText = name;
    
    gameState.level = 1;
    gameState.books = 0;
    gameState.coins = 0;
    gameState.enemiesDefeated = 0;
    gameState.rankIndex = 0;
    gameState.distance = 0;
    
    showStoryScreen();
});

function showStoryScreen() {
    gameState.status = 'story';
    showScreen('story-screen');
    document.getElementById('hud').classList.add('hidden');
    
    const levelData = levelsData[gameState.level - 1];
    document.getElementById('story-title').innerText = levelData.storyTitle;
    
    // ئىسىمنى ئالماشتۇرۇش
    let txt = levelData.storyText.replace('{name}', gameState.playerName);
    document.getElementById('story-text').innerText = txt;
}

document.getElementById('btn-next-level').addEventListener('click', () => {
    startPlaying();
});

function startPlaying() {
    showScreen(null); // يوشۇرۇش
    document.getElementById('hud').classList.remove('hidden');
    gameState.status = 'playing';
    
    const levelData = levelsData[gameState.level - 1];
    gameState.currentSpeed = levelData.speed;
    gameState.distance = 0;
    
    document.getElementById('hud-level').innerText = gameState.level;
    document.getElementById('hud-target').innerText = levelData.targetDistance;
    document.getElementById('hud-books').innerText = gameState.books;
    document.getElementById('hud-coins').innerText = gameState.coins;
    document.getElementById('hud-rank').innerText = ranks[gameState.rankIndex];
    
    // ئالدىنقى ئوبيېكتلارنى تازىلاش
    while(activeObjects.length > 0) {
        scene.remove(activeObjects[0]);
        activeObjects.shift();
    }
}

function levelComplete() {
    gameState.status = 'story';
    
    if (gameState.level >= 5) {
        // غەلىبە قىلدى
        showScreen('game-over-screen');
        document.getElementById('hud').classList.add('hidden');
        document.getElementById('end-title').innerText = "مۇبارەك بولسۇن " + gameState.playerName + "!";
        document.getElementById('end-msg').innerText = "سەن بارلىق دۈشمەنلەرنى يېڭىپ، غەلىبە قىلدىڭ. شەرقىي تۈركىستاننىڭ پارلاق كەلگۈسى سىلەردەك باتۇر، ئىلىملىك ئەۋلادلارنىڭ قولىدا!";
        document.getElementById('final-books').innerText = gameState.books;
        document.getElementById('final-rank').innerText = ranks[gameState.rankIndex];
    } else {
        gameState.level++;
        showStoryScreen();
    }
}

document.getElementById('btn-restart').addEventListener('click', () => {
    showScreen('name-screen');
});

// --- ئاساسلىق ئويۇن دەۋرى (Main Game Loop) ---

function animate() {
    requestAnimationFrame(animate);

    if (gameState.status === 'playing') {
        // ئات يۈگۈرۈش رىتىمى (Simple up/down bobbing)
        if (!isJumping) {
            playerGroup.position.y = Math.sin(Date.now() * 0.01) * 0.1;
        }

        // يول ئالماشتۇرۇش كارتونى (Smooth lane switching)
        const targetX = LANES[currentLaneIndex];
        playerGroup.position.x += (targetX - playerGroup.position.x) * 0.2;

        // سەكرەش لوگىكىسى
        if (isJumping) {
            playerGroup.position.y += playerYVelocity;
            playerYVelocity -= 0.05; // تارتىش كۈچى (Gravity)
            
            if (playerGroup.position.y <= 0) {
                playerGroup.position.y = 0;
                isJumping = false;
                playerYVelocity = 0;
            }
        }

        // يەر جىسىملىرىنى يۆتكەش (Move objects towards player)
        spawnTimer++;
        if (spawnTimer > (60 / gameState.currentSpeed)) { // سۈرئەتكە ئاساسەن چىقىش
            spawnRow();
            spawnTimer = 0;
        }

        for (let i = activeObjects.length - 1; i >= 0; i--) {
            let obj = activeObjects[i];
            obj.position.z += gameState.currentSpeed;
            
            // كىتاب ۋە تەڭگىلەرنى ئايلاندۇرۇش كۆرۈنۈشى
            if(obj.userData.type === 'coin' || obj.userData.type === 'book') {
                obj.rotation.z += 0.05;
            }

            // سوقۇلۇشنى تەكشۈرۈش (Collision detection)
            // ئوبيېكت توپچىنىڭ قېشىغا كەلگەندە (Z: -2 to 2)
            if (obj.position.z > -2 && obj.position.z < 2) {
                if (obj.userData.lane === currentLaneIndex) {
                    // ئەگەر سەكرىگەن بولسا ساندۇقتىن ئۆتۈپ كېتىدۇ
                    let isHit = true;
                    if (isJumping && playerGroup.position.y > 2 && obj.userData.type === 'box') {
                        isHit = false; // ئۈستىدىن ئاتلاپ ئۆتتى
                    }
                    
                    if(isHit) {
                        handleCollision(obj, i);
                        continue;
                    }
                }
            }

            // ئارقىغا ئۆتۈپ كەتسە يوقىتىش
            if (obj.position.z > 10) {
                removeObject(i);
            }
        }

        // ئىلگىرىلەش
        gameState.distance += gameState.currentSpeed * 0.5;
        document.getElementById('hud-dist').innerText = Math.floor(gameState.distance);
        
        const levelData = levelsData[gameState.level - 1];
        let percent = (gameState.distance / levelData.targetDistance) * 100;
        if(percent > 100) percent = 100;
        document.getElementById('progress-fill').style.width = percent + '%';

        if (gameState.distance >= levelData.targetDistance) {
            levelComplete();
        }
    }

    renderer.render(scene, camera);
}

// كۆزنەك ئۆزگەرگەندە رەسىمنى ماسلاشتۇرۇش
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ئويۇننى باشلاش كارتونىنى قوزغىتىش
animate();
