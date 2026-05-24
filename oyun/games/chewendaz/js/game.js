/**
 * باتۇر چەۋەنداز - 3D يۈگۈرەش ئويۇنى كودى
 * 
 * Enhanced version with particles, power-ups, mobile controls, sound effects
 */

// ============================================================
// ساددا ئاۋاز ئۈنۈملىرى (Simple Sound Effects)
// ============================================================
const SoundFX = {
    ctx: null,
    init() {
        try {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        } catch(e) { /* sound not available */ }
    },
    play(type) {
        if (!this.ctx) return;
        try {
            // Resume AudioContext if suspended (Chrome auto-play policy)
            if (this.ctx.state === 'suspended') this.ctx.resume();
            
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            gain.gain.value = 0.08;
            
            switch(type) {
                case 'coin':
                    osc.frequency.setValueAtTime(880, this.ctx.currentTime);
                    osc.frequency.exponentialRampToValueAtTime(1320, this.ctx.currentTime + 0.1);
                    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
                    osc.start(); osc.stop(this.ctx.currentTime + 0.15);
                    break;
                case 'book':
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(660, this.ctx.currentTime);
                    osc.frequency.exponentialRampToValueAtTime(990, this.ctx.currentTime + 0.15);
                    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
                    osc.start(); osc.stop(this.ctx.currentTime + 0.2);
                    break;
                case 'hit':
                    osc.type = 'sawtooth';
                    osc.frequency.setValueAtTime(200, this.ctx.currentTime);
                    osc.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.15);
                    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
                    osc.start(); osc.stop(this.ctx.currentTime + 0.15);
                    break;
                case 'jump':
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(300, this.ctx.currentTime);
                    osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.12);
                    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
                    osc.start(); osc.stop(this.ctx.currentTime + 0.12);
                    break;
                case 'powerup':
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(400, this.ctx.currentTime);
                    osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.3);
                    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);
                    osc.start(); osc.stop(this.ctx.currentTime + 0.35);
                    break;
                case 'levelup':
                    osc.frequency.setValueAtTime(523, this.ctx.currentTime);
                    osc.frequency.setValueAtTime(659, this.ctx.currentTime + 0.1);
                    osc.frequency.setValueAtTime(784, this.ctx.currentTime + 0.2);
                    osc.frequency.setValueAtTime(1047, this.ctx.currentTime + 0.3);
                    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.45);
                    osc.start(); osc.stop(this.ctx.currentTime + 0.45);
                    break;
                case 'gameover':
                    osc.type = 'sawtooth';
                    osc.frequency.setValueAtTime(400, this.ctx.currentTime);
                    osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.5);
                    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
                    osc.start(); osc.stop(this.ctx.currentTime + 0.5);
                    break;
            }
        } catch(e) {}
    }
};

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

const powerUpTypes = ['shield', 'speed', 'magnet'];

// --- ئويۇن ھالىتى (Game State) ---
let gameState = {
    status: 'menu', // menu, story, playing, paused, gameover
    playerName: '',
    level: 1,
    distance: 0,
    books: 0,
    coins: 0,
    enemiesDefeated: 0,
    rankIndex: 0,
    currentSpeed: 0.3,
    combo: 0,
    maxCombo: 0,
    activePowerUp: null, // 'shield', 'speed', 'magnet'
    powerUpTimer: 0,
    totalBooks: 0,
    totalCoins: 0,
    stars: 0
};

// ============================================================
// زەررىچە سىستېمىسى (Particle System)
// ============================================================
class ParticleSystem {
    constructor(scene) {
        this.scene = scene;
        this.particles = [];
        this.geometries = {};
    }

    createParticle(pos, color, size, vel, life, type = 'sparkle') {
        let geo, mat;
        
        if (type === 'sparkle') {
            geo = new THREE.SphereGeometry(size, 4, 4);
        } else if (type === 'trail') {
            geo = new THREE.SphereGeometry(size * 0.5, 3, 3);
        } else if (type === 'ring') {
            geo = new THREE.RingGeometry(size * 0.5, size, 8);
        }

        mat = new THREE.MeshBasicMaterial({ 
            color: color, 
            transparent: true, 
            opacity: 1 
        });
        
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.copy(pos);
        this.scene.add(mesh);

        this.particles.push({
            mesh,
            vel: vel || new THREE.Vector3(
                (Math.random() - 0.5) * 0.2,
                Math.random() * 0.2,
                (Math.random() - 0.5) * 0.2
            ),
            life: life || 1,
            maxLife: life || 1,
            type
        });
    }

    burst(pos, color, count = 20, life = 1) {
        for (let i = 0; i < count; i++) {
            const vel = new THREE.Vector3(
                (Math.random() - 0.5) * 0.3,
                Math.random() * 0.3,
                (Math.random() - 0.5) * 0.3
            );
            this.createParticle(pos, color, 0.15 + Math.random() * 0.2, vel, life * (0.5 + Math.random() * 0.5));
        }
    }

    trail(pos, color) {
        this.createParticle(
            pos.clone(),
            color,
            0.1 + Math.random() * 0.1,
            new THREE.Vector3(0, -0.05, 0),
            0.5,
            'trail'
        );
    }

    update() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.mesh.position.add(p.vel);
            p.vel.y -= 0.005;
            p.life -= 0.02;
            p.mesh.material.opacity = Math.max(0, p.life / p.maxLife);
            p.mesh.scale.setScalar(0.5 + (p.life / p.maxLife) * 0.5);

            if (p.life <= 0) {
                this.scene.remove(p.mesh);
                p.mesh.geometry.dispose();
                p.mesh.material.dispose();
                this.particles.splice(i, 1);
            }
        }
    }

    clear() {
        for (const p of this.particles) {
            this.scene.remove(p.mesh);
            p.mesh.geometry.dispose();
            p.mesh.material.dispose();
        }
        this.particles = [];
    }
}

// ============================================================
// Three.js تەڭشەكلىرى (Three.js Setup)
// ============================================================
const container = document.getElementById('game-canvas');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x4a90d9);
scene.fog = new THREE.Fog(0x4a90d9, 30, 180);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.set(0, 8, 15);
camera.lookAt(0, 2, -20);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
container.appendChild(renderer.domElement);

// زەررىچە سىستېمىسى (Particle System)
const particles = new ParticleSystem(scene);

// چىراقلار (Lighting)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
dirLight.position.set(20, 40, 20);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 1024;
dirLight.shadow.mapSize.height = 1024;
dirLight.shadow.camera.top = 50;
dirLight.shadow.camera.bottom = -50;
dirLight.shadow.camera.left = -50;
dirLight.shadow.camera.right = 50;
scene.add(dirLight);

const hemiLight = new THREE.HemisphereLight(0x87CEEB, 0x2d4c1e, 0.3);
scene.add(hemiLight);

// يەر (Ground)
const groundGeo = new THREE.PlaneGeometry(100, 1000);
const groundMat = new THREE.MeshStandardMaterial({ color: 0x3a7d2a, roughness: 0.9 });
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
ground.position.z = -400;
ground.receiveShadow = true;
scene.add(ground);

// يول سىزىقلىرى (Road lanes)
for(let i = 0; i < 6; i++) {
    const lineGeo = new THREE.PlaneGeometry(0.3, 1000);
    const lineMat = new THREE.MeshBasicMaterial({ color: 0x5a9c40, transparent: true, opacity: 0.6 });
    const line = new THREE.Mesh(lineGeo, lineMat);
    line.rotation.x = -Math.PI / 2;
    line.position.set(-7.5 + (i * 3), 0.02, -400);
    scene.add(line);
}

// ============================================================
// بېزەك ئېلېمېنتلىرى (Decorative Elements)
// ============================================================

// بۇلۇتلار (Clouds)
function createCloud(x, y, z, scale = 1) {
    const group = new THREE.Group();
    const cloudMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7 });
    
    for (let i = 0; i < 5; i++) {
        const size = (0.8 + Math.random() * 1.2) * scale;
        const sphere = new THREE.Mesh(new THREE.SphereGeometry(size, 7, 7), cloudMat);
        sphere.position.set(
            (Math.random() - 0.5) * 3 * scale,
            (Math.random() - 0.5) * 0.5 * scale,
            (Math.random() - 0.5) * 2 * scale
        );
        sphere.scale.y = 0.6;
        group.add(sphere);
    }
    group.position.set(x, y, z);
    return group;
}

const clouds = [];
for (let i = 0; i < 8; i++) {
    const cloud = createCloud(
        -30 + Math.random() * 60,
        12 + Math.random() * 8,
        -140 + Math.random() * 280,
        0.8 + Math.random() * 1.5
    );
    scene.add(cloud);
    clouds.push({ group: cloud, speed: 0.01 + Math.random() * 0.02 });
}

// دەرەخلەر (Trees)
function createTree(x, z, scale = 1) {
    const group = new THREE.Group();
    
    // تەنە (Trunk)
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5c3a1e, roughness: 1 });
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.2 * scale, 0.3 * scale, 1.5 * scale, 5), trunkMat);
    trunk.position.y = 0.75 * scale;
    trunk.castShadow = true;
    group.add(trunk);
    
    // يوپۇرماق (Leaves) - 3 قاتلام
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x2d7a1e, roughness: 0.8 });
    for (let i = 0; i < 3; i++) {
        const size = (1.2 - i * 0.3) * scale;
        const leaf = new THREE.Mesh(new THREE.ConeGeometry(size, 0.8 * scale, 6), leafMat);
        leaf.position.y = (1.5 + i * 0.6) * scale;
        leaf.castShadow = true;
        group.add(leaf);
    }
    
    // ئۈستى قاتلام (Top layer - lighter)
    const topMat = new THREE.MeshStandardMaterial({ color: 0x3a9a2a, roughness: 0.8 });
    const top = new THREE.Mesh(new THREE.ConeGeometry(1.0 * scale, 0.6 * scale, 6), topMat);
    top.position.y = (2.7) * scale;
    top.castShadow = true;
    group.add(top);
    
    group.position.set(x, 0, z);
    return group;
}

const trees = [];
for (let i = 0; i < 20; i++) {
    const side = i < 10 ? -1 : 1;
    const x = side * (8 + Math.random() * 4);
    const z = -180 + Math.random() * 360;
    const scale = 0.8 + Math.random() * 0.6;
    const tree = createTree(x, z, scale);
    tree.userData.side = side;
    tree.userData.scale = scale;
    tree.userData.type = 'decor';
    tree.userData.decorType = 'tree';
    scene.add(tree);
    trees.push(tree);
}

// گۈللەر ۋە ئوتلار (Flowers & Grass patches)
// Each decorative element stores its side (-1 or 1) for recycling
let decorSide = -1;

function createFlower(x, z, color) {
    const group = new THREE.Group();
    const stemMat = new THREE.MeshStandardMaterial({ color: 0x2d6a1e });
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.2, 3), stemMat);
    stem.position.y = 0.1;
    group.add(stem);
    
    const petalMat = new THREE.MeshStandardMaterial({ color });
    for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2;
        const petal = new THREE.Mesh(new THREE.SphereGeometry(0.05, 4, 4), petalMat);
        petal.position.set(Math.cos(angle) * 0.06, 0.2, Math.sin(angle) * 0.06);
        group.add(petal);
    }
    group.position.set(x, 0, z);
    return group;
}

const flowers = [];
const flowerColors = [0xff6b6b, 0xffd93d, 0xff8e53, 0xda70d6, 0x6bcb77];
for (let i = 0; i < 30; i++) {
    const side = i < 15 ? -1 : 1;
    const x = side * (7 + Math.random() * 5);
    const z = -200 + Math.random() * 400;
    const color = flowerColors[Math.floor(Math.random() * flowerColors.length)];
    const flower = createFlower(x, z, color);
    flower.userData.side = side;
    flower.userData.color = color;
    flower.userData.type = 'decor';
    flower.userData.decorType = 'flower';
    scene.add(flower);
    flowers.push(flower);
}

// بايراقلار (Flags) - East Turkistan flags
function createFlag(x, z, color = 0x2196F3) {
    const group = new THREE.Group();
    
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x8a8a8a, metalness: 0.5 });
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 2.5, 4), poleMat);
    pole.position.y = 1.25;
    pole.castShadow = true;
    group.add(pole);
    
    const flagMat = new THREE.MeshStandardMaterial({ color, side: THREE.DoubleSide });
    const flag = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.5), flagMat);
    flag.position.set(0.4, 2.2, 0);
    flag.rotation.y = Math.PI / 2;
    group.add(flag);
    
    // Crescent moon on flag
    const starMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const moon = new THREE.Mesh(new THREE.SphereGeometry(0.15, 5, 5), starMat);
    moon.position.set(0.5, 2.3, 0.02);
    moon.scale.set(0.5, 0.5, 0.3);
    group.add(moon);
    
    group.position.set(x, 0, z);
    return group;
}

const flags = [];
for (let i = 0; i < 6; i++) {
    const x = -6 + i * 2.4;
    const z = -80 - i * 60;
    const flag = createFlag(x, z, 0x1565C0);
    flag.userData.type = 'decor';
    flag.userData.decorType = 'flag';
    flag.userData.index = i;
    scene.add(flag);
    flags.push(flag);
}

// ============================================================
// ئويۇن ئوبيېكتلىرى (Game Objects)
// ============================================================
let playerGroup;
let playerSword;
const activeObjects = [];
const LANE_WIDTH = 3;
const LANES = [-6, -3, 0, 3, 6];
let currentLaneIndex = 2;
let playerYVelocity = 0;
let isJumping = false;
let isAttacking = false;
let gameTilt = 0; // For screen shake

// مودېللارنى ياساش (Creating placeholder models)
function initModels() {
    playerGroup = new THREE.Group();
    
    // ئات (Horse) - improved shape
    const horseMat = new THREE.MeshStandardMaterial({ color: 0x5c4033, roughness: 0.6 });
    
    // Horse body
    const horseBody = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.2, 3.2), horseMat);
    horseBody.position.y = 0.8;
    horseBody.castShadow = true;
    playerGroup.add(horseBody);
    
    // Horse neck
    const neckMat = new THREE.MeshStandardMaterial({ color: 0x5c4033 });
    const neck = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.6, 0.6), neckMat);
    neck.position.set(0, 1.3, -1.5);
    playerGroup.add(neck);
    
    // Horse head
    const headMat = new THREE.MeshStandardMaterial({ color: 0x6b4c30 });
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.6, 1), headMat);
    head.position.set(0, 1.7, -2.0);
    head.rotation.x = 0.3;
    head.castShadow = true;
    playerGroup.add(head);
    
    // Horse ears
    const earMat = new THREE.MeshStandardMaterial({ color: 0x7a5a3a });
    for (let side of [-1, 1]) {
        const ear = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.2, 3), earMat);
        ear.position.set(side * 0.25, 2.0, -2.15);
        ear.rotation.z = side * 0.3;
        playerGroup.add(ear);
    }
    
    // Horse eyes
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    for (let side of [-1, 1]) {
        const eye = new THREE.Mesh(new THREE.SphereGeometry(0.08, 6, 6), eyeMat);
        eye.position.set(side * 0.2, 1.85, -2.4);
        playerGroup.add(eye);
    }
    
    // Horse mane (simple)
    const maneMat = new THREE.MeshStandardMaterial({ color: 0x3a2510 });
    for (let i = 0; i < 4; i++) {
        const mane = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.2, 3), maneMat);
        mane.position.set(0, 1.5 + i * 0.15, -1.8 + i * 0.15);
        mane.rotation.x = 0.2;
        playerGroup.add(mane);
    }
    
    // Horse tail
    const tailMat = new THREE.MeshStandardMaterial({ color: 0x3a2510 });
    const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.15, 0.4, 4), tailMat);
    tail.position.set(0, 0.6, 1.7);
    tail.rotation.x = 0.4;
    playerGroup.add(tail);

    // Horse legs (4 legs for gallop animation)
    const legMat = new THREE.MeshStandardMaterial({ color: 0x4a3020 });
    for (let side of [-1, 1]) {
        for (let front of [-1, 1]) {
            const leg = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.6, 0.2), legMat);
            leg.position.set(side * 0.5, 0.3, front * 1.2);
            leg.userData.isLeg = true;
            leg.userData.legSide = side;
            leg.userData.isFront = front === -1;
            playerGroup.add(leg);
        }
    }

    // Horse blanket/ornament
    const blanketMat = new THREE.MeshStandardMaterial({ color: 0xc0392b });
    const blanket = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.1, 2.0), blanketMat);
    blanket.position.set(0, 1.3, 0);
    playerGroup.add(blanket);

    // مىنگۈچى (Rider - Player)
    const riderMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a });
    const rider = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.2, 0.8), riderMat);
    rider.position.set(0, 2.3, 0.2);
    rider.castShadow = true;
    rider.userData.isRider = true;
    playerGroup.add(rider);

    // Rider head
    const headRider = new THREE.Mesh(new THREE.SphereGeometry(0.3, 6, 6), new THREE.MeshStandardMaterial({ color: 0xf5d6b8 }));
    headRider.position.set(0, 3.0, 0);
    playerGroup.add(headRider);

    // Rider helmet
    const helmetMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.5 });
    const helmet = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.3, 6), helmetMat);
    helmet.position.set(0, 3.2, 0.05);
    playerGroup.add(helmet);
    
    // Plume on helmet
    const plume = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.3, 3), new THREE.MeshStandardMaterial({ color: 0xff0000 }));
    plume.position.set(0, 3.4, -0.1);
    plume.rotation.x = 0.3;
    playerGroup.add(plume);

    // قېلىچ (Sword)
    const swordMat = new THREE.MeshStandardMaterial({ color: 0xe5e7eb, metalness: 0.9 });
    playerSword = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.0, 0.25), swordMat);
    playerSword.position.set(0.7, 3.0, -0.3);
    playerSword.rotation.z = -0.4;
    playerSword.rotation.x = -0.3;
    playerSword.visible = false;
    playerGroup.add(playerSword);
    
    // Sword handle
    const handle = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.3, 0.15), new THREE.MeshStandardMaterial({ color: 0x5c3a1e }));
    handle.position.set(0.7, 2.0, -0.3);
    handle.rotation.z = -0.4;
    handle.rotation.x = -0.3;
    handle.visible = false;
    handle.userData.isHandle = true;
    playerGroup.add(handle);

    scene.add(playerGroup);
}

initModels();

// قۇۋۋەت ئېلېمېنتلىرى (Power-up indicators)
let shieldGlow = null;
let speedTrails = [];
let magnetEffect = null;

function createShieldEffect() {
    if (shieldGlow) {
        scene.remove(shieldGlow);
        shieldGlow.geometry.dispose();
        shieldGlow.material.dispose();
    }
    const geo = new THREE.SphereGeometry(2, 16, 16);
    const mat = new THREE.MeshBasicMaterial({ 
        color: 0x3b82f6, 
        transparent: true, 
        opacity: 0.2,
        wireframe: true
    });
    shieldGlow = new THREE.Mesh(geo, mat);
    shieldGlow.position.copy(playerGroup.position);
    shieldGlow.position.y = 1;
    scene.add(shieldGlow);
}

function removeShieldEffect() {
    if (shieldGlow) {
        scene.remove(shieldGlow);
        shieldGlow.geometry.dispose();
        shieldGlow.material.dispose();
        shieldGlow = null;
    }
}

// ============================================================
// ئوبيېكت چىقىرىش (Spawning Objects)
// ============================================================
let spawnTimer = 0;

function spawnRow() {
    if (gameState.status !== 'playing') return;
    
    const numObjects = Math.floor(Math.random() * 3) + 1;
    let usedLanes = [];

    for(let i = 0; i < numObjects; i++) {
        let laneIdx;
        do {
            laneIdx = Math.floor(Math.random() * 5);
        } while(usedLanes.includes(laneIdx));
        usedLanes.push(laneIdx);

        const typeRoll = Math.random();
        let type, mesh;

        if (typeRoll < 0.3) {
            // توسالغۇ ساندۇق (Obstacle Box)
            type = 'box';
            const boxMat = new THREE.MeshStandardMaterial({ 
                color: 0x8B4513, 
                roughness: 0.7 
            });
            mesh = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.8, 1.8), boxMat);
            mesh.position.y = 0.9;
            
            // Add rope/band decoration
            const bandMat = new THREE.MeshStandardMaterial({ color: 0x654321 });
            const band = new THREE.Mesh(new THREE.BoxGeometry(1.82, 0.1, 0.1), bandMat);
            band.position.y = 0.9 + 0.3;
            band.userData.isDecoration = true;
            mesh.add(band);
            
        } else if (typeRoll < 0.55) {
            // تاجاۋۇزچى (Enemy)
            type = 'enemy';
            const enemyMat = new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.5 });
            mesh = new THREE.Mesh(new THREE.BoxGeometry(1.4, 2.8, 1.4), enemyMat);
            mesh.position.y = 1.4;
            
            // Enemy face (simple)
            const faceMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
            const eye1 = new THREE.Mesh(new THREE.SphereGeometry(0.15, 4, 4), faceMat);
            eye1.position.set(-0.3, 0.3, 0.71);
            mesh.add(eye1);
            const eye2 = new THREE.Mesh(new THREE.SphereGeometry(0.15, 4, 4), faceMat);
            eye2.position.set(0.3, 0.3, 0.71);
            mesh.add(eye2);
            
        } else if (typeRoll < 0.8) {
            // كىتاب (Book)
            type = 'book';
            const bookMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.3 });
            mesh = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.2, 0.3), bookMat);
            mesh.position.y = 0.8;
            mesh.rotation.y = Math.PI / 4;
            
            // Book pages
            const pageMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
            const pages = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.05, 0.15), pageMat);
            pages.position.set(0, 0.05, 0.1);
            mesh.add(pages);
            
        } else if (typeRoll < 0.95) {
            // تەڭگە (Coin)
            type = 'coin';
            const coinMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 1, roughness: 0.2 });
            mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.15, 12), coinMat);
            mesh.position.y = 0.9;
            mesh.rotation.x = Math.PI / 2;
        } else {
            // قۇۋۋەت ئېلېمېنتى (Power-up)
            type = 'powerup';
            const pType = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
            const colors = { shield: 0x3b82f6, speed: 0xfbbf24, magnet: 0xa855f7 };
            const pMat = new THREE.MeshStandardMaterial({ 
                color: colors[pType], 
                emissive: colors[pType], 
                emissiveIntensity: 0.5,
                transparent: true,
                opacity: 0.9
            });
            mesh = new THREE.Mesh(new THREE.OctahedronGeometry(0.8, 0), pMat);
            mesh.position.y = 1.2;
            mesh.userData.powerType = pType;
        }

        mesh.position.x = LANES[laneIdx];
        mesh.position.z = -120;
        mesh.castShadow = true;
        mesh.userData.type = type;
        mesh.userData.lane = laneIdx;
        
        scene.add(mesh);
        activeObjects.push(mesh);
    }
}

// ============================================================
// كونترول قىلىش (Controls)
// ============================================================
function movePlayer(direction) {
    if (gameState.status === 'playing') {
        if (direction === 'left' && currentLaneIndex > 0) {
            currentLaneIndex--;
        } else if (direction === 'right' && currentLaneIndex < 4) {
            currentLaneIndex++;
        }
    }
}

function jumpPlayer() {
    if (gameState.status === 'playing' && !isJumping) {
        isJumping = true;
        playerYVelocity = 0.6;
        SoundFX.play('jump');
    }
}

function attackPlayer() {
    if (gameState.status !== 'playing' || isAttacking) return;
    isAttacking = true;
    playerSword.visible = true;
    
    let slashSteps = 0;
    const slashInterval = setInterval(() => {
        slashSteps++;
        playerSword.rotation.z -= 0.15;
        
        if (slashSteps === 5) {
            checkAttackHit();
        }
        
        if (slashSteps >= 10) {
            clearInterval(slashInterval);
            playerSword.visible = false;
            playerSword.rotation.z = -0.4;
            isAttacking = false;
        }
    }, 20);
}

function togglePause() {
    if (gameState.status === 'playing') {
        gameState.status = 'paused';
        document.getElementById('pause-screen').classList.remove('hidden');
        document.getElementById('hud').classList.add('hidden');
    } else if (gameState.status === 'paused') {
        gameState.status = 'playing';
        document.getElementById('pause-screen').classList.add('hidden');
        document.getElementById('hud').classList.remove('hidden');
    }
}

function checkAttackHit() {
    for (let i = activeObjects.length - 1; i >= 0; i--) {
        let obj = activeObjects[i];
        if (obj.userData.lane === currentLaneIndex && obj.position.z > -10 && obj.position.z < -2) {
            if (obj.userData.type === 'enemy') {
                particles.burst(obj.position.clone(), 0xff4444, 25);
                removeObject(i);
                gameState.enemiesDefeated++;
                gameState.combo++;
                if (gameState.combo > gameState.maxCombo) gameState.maxCombo = gameState.combo;
                updateRank();
                showFloatingText("زەربە! 🔥", window.innerWidth/2, window.innerHeight/2 - 100);
                SoundFX.play('hit');
                screenShake(0.3);
            } else if (obj.userData.type === 'box') {
                particles.burst(obj.position.clone(), 0x8B4513, 15);
                removeObject(i);
                showFloatingText("چېقىلدى! 💥", window.innerWidth/2, window.innerHeight/2 - 80);
                screenShake(0.2);
                if (Math.random() > 0.5) collectItem('book');
            }
        }
    }
}

// Touch controls setup
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'p') {
        if (gameState.status === 'playing' || gameState.status === 'paused') {
            togglePause();
            return;
        }
    }
    if (gameState.status !== 'playing') return;
    if (e.key === 'ArrowLeft') movePlayer('left');
    if (e.key === 'ArrowRight') movePlayer('right');
    if (e.key === 'ArrowUp' || e.key === ' ') jumpPlayer();
    if (e.key === 'Control' || e.key === 'Enter') attackPlayer();
});

// Mobile touch controls
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', e => {
    if (e.target.classList.contains('touch-btn') || e.target.closest('.touch-btn') ||
        e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.tagName === 'INPUT') return;
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', e => {
    if (e.target.classList.contains('touch-btn') || e.target.closest('.touch-btn') ||
        e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.tagName === 'INPUT') return;
    if (gameState.status !== 'playing') return;
    
    let touchEndX = e.changedTouches[0].screenX;
    let touchEndY = e.changedTouches[0].screenY;
    
    let diffX = touchEndX - touchStartX;
    let diffY = touchEndY - touchStartY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (Math.abs(diffX) > 40) {
            if (diffX > 0) movePlayer('right');
            else movePlayer('left');
        } else {
            attackPlayer();
        }
    } else {
        if (diffY < -40) {
            jumpPlayer();
        } else if (Math.abs(diffY) < 20) {
            attackPlayer();
        }
    }
});

// ============================================================
// لوگىكا ۋە تەكشۈرۈش (Logic & Collision)
// ============================================================

function collectItem(type) {
    if (type === 'book') {
        gameState.books++;
        gameState.totalBooks++;
        document.getElementById('hud-books').innerText = gameState.books;
        const msg = wisdoms[Math.floor(Math.random() * wisdoms.length)];
        showFloatingText("📚 " + msg, window.innerWidth/2, window.innerHeight/3);
        SoundFX.play('book');
    } else if (type === 'coin') {
        gameState.coins++;
        gameState.totalCoins++;
        document.getElementById('hud-coins').innerText = gameState.coins;
        SoundFX.play('coin');
    }
}

function activatePowerUp(pType) {
    gameState.activePowerUp = pType;
    gameState.powerUpTimer = 300; // 5 seconds (60fps * 5)
    
    document.getElementById('powerup-indicator').classList.remove('hidden');
    const icon = document.querySelector('#powerup-indicator i');
    const label = document.querySelector('#powerup-indicator .powerup-label');
    
    switch(pType) {
        case 'shield':
            icon.className = 'fas fa-shield-alt';
            label.innerText = 'قورغاش';
            createShieldEffect();
            break;
        case 'speed':
            icon.className = 'fas fa-bolt';
            label.innerText = 'تېزلىك';
            gameState.currentSpeed *= 1.8;
            break;
        case 'magnet':
            icon.className = 'fas fa-magnet';
            label.innerText = 'مىگىنىت';
            break;
    }
    
    showFloatingText("⚡ قۇۋۋەت ئالدىڭىز!", window.innerWidth/2, window.innerHeight/3 - 50);
    SoundFX.play('powerup');
}

function updatePowerUp() {
    if (!gameState.activePowerUp) return;
    
    gameState.powerUpTimer--;
    
    // Update timer display
    const timer = document.querySelector('.powerup-timer');
    if (timer) {
        timer.innerText = Math.ceil(gameState.powerUpTimer / 60) + 's';
    }
    
    // Magnet effect: pull nearby items
    if (gameState.activePowerUp === 'magnet') {
        for (const obj of activeObjects) {
            if ((obj.userData.type === 'book' || obj.userData.type === 'coin') && 
                Math.abs(obj.position.x - playerGroup.position.x) < 6 &&
                obj.position.z > -5 && obj.position.z < 5) {
                obj.position.x += (playerGroup.position.x - obj.position.x) * 0.1;
                obj.position.z += 0.05;
            }
        }
    }
    
    // Shield glow animation
    if (gameState.activePowerUp === 'shield' && shieldGlow) {
        shieldGlow.position.copy(playerGroup.position);
        shieldGlow.position.y = 1;
        shieldGlow.material.opacity = 0.15 + Math.sin(Date.now() * 0.01) * 0.1;
        shieldGlow.scale.setScalar(1 + Math.sin(Date.now() * 0.005) * 0.05);
    }
    
    // Speed trail particles
    if (gameState.activePowerUp === 'speed') {
        const trailPos = playerGroup.position.clone();
        trailPos.y = 0.1;
        particles.trail(trailPos, 0xfbbf24);
    }
    
    if (gameState.powerUpTimer <= 0) {
        deactivatePowerUp();
    }
}

function deactivatePowerUp() {
    gameState.activePowerUp = null;
    document.getElementById('powerup-indicator').classList.add('hidden');
    
    // Reset speed if it was boosted
    const levelData = levelsData[gameState.level - 1];
    gameState.currentSpeed = levelData.speed;
    
    removeShieldEffect();
    
    showFloatingText("قۇۋۋەت تۈگىدى", window.innerWidth/2, window.innerHeight/3);
}

function updateRank() {
    let newRankIdx = Math.floor(gameState.enemiesDefeated / 5);
    if (newRankIdx > ranks.length - 1) newRankIdx = ranks.length - 1;
    
    if (newRankIdx > gameState.rankIndex) {
        gameState.rankIndex = newRankIdx;
        document.getElementById('hud-rank').innerText = ranks[gameState.rankIndex];
        showFloatingText("⭐ ئۇنۋانىڭىز ئۆستى!", window.innerWidth/2, window.innerHeight/4);
        SoundFX.play('levelup');
    }
}

function showFloatingText(text, x, y) {
    const el = document.createElement('div');
    el.className = 'floating-text';
    el.innerText = text;
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1800);
}

function removeObject(index) {
    const obj = activeObjects[index];
    if (obj) {
        scene.remove(obj);
        // Dispose geometry and material
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) obj.material.dispose();
        // Clean up children
        obj.children.forEach(child => {
            if (child.geometry) child.geometry.dispose();
            if (child.material) child.material.dispose();
        });
    }
    activeObjects.splice(index, 1);
}

function handleCollision(obj, index) {
    if (obj.userData.type === 'book' || obj.userData.type === 'coin') {
        const pos = obj.position.clone();
        particles.burst(pos, obj.userData.type === 'book' ? 0x3b82f6 : 0xfbbf24, 10);
        collectItem(obj.userData.type);
        removeObject(index);
        gameState.combo++;
        if (gameState.combo > gameState.maxCombo) gameState.maxCombo = gameState.combo;
        
        if (gameState.combo >= 3 && gameState.combo % 3 === 0) {
            showFloatingText("🔥 " + gameState.combo + " قاتار!", window.innerWidth/2, window.innerHeight/2 - 60);
        }
    } else if (obj.userData.type === 'box') {
        if (gameState.activePowerUp === 'shield') {
            // Shield protects!
            particles.burst(obj.position.clone(), 0x3b82f6, 20);
            removeObject(index);
            showFloatingText("🛡 قورغالدى!", window.innerWidth/2, window.innerHeight/2 - 60);
            SoundFX.play('powerup');
            return;
        }
        particles.burst(obj.position.clone(), 0x8B4513, 12);
        removeObject(index);
        showFloatingText("دىققەت قىل! ⚠️", window.innerWidth/2, window.innerHeight/2);
        screenShake(0.15);
        gameState.combo = 0;
        SoundFX.play('hit');
    } else if (obj.userData.type === 'enemy') {
        if (gameState.activePowerUp === 'shield') {
            particles.burst(obj.position.clone(), 0x3b82f6, 20);
            removeObject(index);
            showFloatingText("🛡 قورغالدى!", window.innerWidth/2, window.innerHeight/2 - 60);
            return;
        }
        particles.burst(obj.position.clone(), 0xff0000, 20);
        removeObject(index);
        showFloatingText("ئوپ! 😵", window.innerWidth/2, window.innerHeight/2);
        screenShake(0.25);
        gameState.combo = 0;
        SoundFX.play('hit');
    } else if (obj.userData.type === 'powerup') {
        const pos = obj.position.clone();
        const colors = { shield: 0x3b82f6, speed: 0xfbbf24, magnet: 0xa855f7 };
        particles.burst(pos, colors[obj.userData.powerType], 30);
        activatePowerUp(obj.userData.powerType);
        removeObject(index);
    }
}

function screenShake(intensity) {
    gameTilt = intensity;
}

// ============================================================
// UI ۋە ئويۇن ئېقىمى (UI and Game Flow)
// ============================================================

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    if (id) document.getElementById(id).classList.remove('hidden');
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
    gameState.combo = 0;
    gameState.maxCombo = 0;
    gameState.totalBooks = 0;
    gameState.totalCoins = 0;
    
    SoundFX.init();
    showStoryScreen();
});

function showStoryScreen() {
    gameState.status = 'story';
    showScreen('story-screen');
    document.getElementById('hud').classList.add('hidden');
    
    const levelData = levelsData[gameState.level - 1];
    document.getElementById('story-title').innerText = levelData.storyTitle;
    
    let txt = levelData.storyText.replace('{name}', gameState.playerName);
    document.getElementById('story-text').innerText = txt;
}

document.getElementById('btn-next-level').addEventListener('click', () => {
    startPlaying();
});

function startPlaying() {
    showScreen(null);
    document.getElementById('hud').classList.remove('hidden');
    document.getElementById('mobile-controls').classList.remove('hidden');
    document.getElementById('pause-btn').classList.remove('hidden');
    gameState.status = 'playing';
    
    const levelData = levelsData[gameState.level - 1];
    gameState.currentSpeed = levelData.speed;
    gameState.distance = 0;
    
    document.getElementById('hud-level').innerText = gameState.level;
    document.getElementById('hud-target').innerText = levelData.targetDistance;
    document.getElementById('hud-books').innerText = gameState.books;
    document.getElementById('hud-coins').innerText = gameState.coins;
    document.getElementById('hud-rank').innerText = ranks[gameState.rankIndex];
    
    // تازىلاش
    while (activeObjects.length > 0) {
        removeObject(0);
    }
    particles.clear();
    removeShieldEffect();
    // Clear any active power-up without showing "تۈگىدى" text
    if (gameState.activePowerUp) {
        deactivatePowerUp();
    }
}

function levelComplete() {
    gameState.status = 'story';
    
    // Calculate stars
    let stars = 1;
    if (gameState.books >= gameState.level * 3) stars++;
    if (gameState.coins >= gameState.level * 5) stars++;
    gameState.stars = stars;
    
    if (gameState.level >= 5) {
        showScreen('game-over-screen');
        document.getElementById('hud').classList.add('hidden');
        document.getElementById('mobile-controls').classList.add('hidden');
        document.getElementById('pause-btn').classList.add('hidden');
        document.getElementById('end-title').innerText = "🏆 مۇبارەك بولسۇن " + gameState.playerName + "!";
        document.getElementById('end-msg').innerText = "سەن بارلىق دۈشمەنلەرنى يېڭىپ، غەلىبە قىلدىڭ. شەرقىي تۈركىستاننىڭ پارلاق كەلگۈسى سىلەردەك باتۇر، ئىلىملىك ئەۋلادلارنىڭ قولىدا!";
        document.getElementById('final-books').innerText = gameState.books;
        document.getElementById('final-rank').innerText = ranks[gameState.rankIndex];
        document.getElementById('final-stars').innerText = '⭐'.repeat(stars);
        document.getElementById('final-combo').innerText = gameState.maxCombo;
        document.getElementById('restart-section').classList.remove('hidden');
        document.getElementById('next-section').classList.add('hidden');
        SoundFX.play('gameover');
    } else {
        gameState.level++;
        // Show level complete screen
        document.getElementById('hud').classList.add('hidden');
        document.getElementById('mobile-controls').classList.add('hidden');
        document.getElementById('pause-btn').classList.add('hidden');
        document.getElementById('level-complete-screen').classList.remove('hidden');
        document.getElementById('lc-level').innerText = gameState.level - 1;
        document.getElementById('lc-books').innerText = gameState.books;
        document.getElementById('lc-coins').innerText = gameState.coins;
        document.getElementById('lc-stars').innerText = '⭐'.repeat(stars);
        document.getElementById('lc-combo').innerText = gameState.maxCombo;
        SoundFX.play('levelup');
    }
}

document.getElementById('btn-restart').addEventListener('click', () => {
    document.getElementById('mobile-controls').classList.add('hidden');
    document.getElementById('pause-btn').classList.add('hidden');
    showScreen('name-screen');
});

document.getElementById('btn-next-level-lc').addEventListener('click', () => {
    document.getElementById('level-complete-screen').classList.add('hidden');
    document.getElementById('mobile-controls').classList.remove('hidden');
    document.getElementById('pause-btn').classList.remove('hidden');
    showStoryScreen();
});

// Pause buttons
document.getElementById('btn-pause').addEventListener('click', togglePause);
document.getElementById('btn-resume').addEventListener('click', togglePause);
document.getElementById('btn-quit').addEventListener('click', () => {
    gameState.status = 'menu';
    document.getElementById('pause-screen').classList.add('hidden');
    document.getElementById('mobile-controls').classList.add('hidden');
    document.getElementById('pause-btn').classList.add('hidden');
    showScreen('name-screen');
});

// On-screen touch buttons
document.querySelectorAll('.touch-btn').forEach(btn => {
    btn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const action = btn.dataset.action;
        if (action === 'left') movePlayer('left');
        else if (action === 'right') movePlayer('right');
        else if (action === 'jump') jumpPlayer();
        else if (action === 'attack') attackPlayer();
    });
    btn.addEventListener('mousedown', (e) => {
        e.preventDefault();
        const action = btn.dataset.action;
        if (action === 'left') movePlayer('left');
        else if (action === 'right') movePlayer('right');
        else if (action === 'jump') jumpPlayer();
        else if (action === 'attack') attackPlayer();
    });
});

// ============================================================
// ئاساسلىق ئويۇن دەۋرى (Main Game Loop)
// ============================================================

function animate() {
    requestAnimationFrame(animate);

    if (gameState.status === 'playing' || gameState.status === 'paused') {
        // Horse gallop animation (leg movement)
        if (gameState.status === 'playing') {
            const time = Date.now() * 0.015;
            playerGroup.children.forEach(child => {
                if (child.userData && child.userData.isLeg) {
                    const legPhase = child.userData.isFront ? 0 : Math.PI;
                    const sideMult = child.userData.legSide;
                    child.rotation.x = Math.sin(time + legPhase) * 0.4;
                }
            });
            
            // Rider slight bounce
            playerGroup.children.forEach(child => {
                if (child.userData && child.userData.isRider) {
                    child.position.y = 2.3 + Math.sin(Date.now() * 0.015) * 0.05;
                }
            });
            
            // Horse body bob
            if (!isJumping) {
                playerGroup.position.y = Math.sin(Date.now() * 0.012) * 0.12;
            }
        }

        // Lane switching smooth
        const targetX = LANES[currentLaneIndex];
        playerGroup.position.x += (targetX - playerGroup.position.x) * 0.2;

        // Jump logic
        if (isJumping && gameState.status === 'playing') {
            playerGroup.position.y += playerYVelocity;
            playerYVelocity -= 0.05;
            
            if (playerGroup.position.y <= 0) {
                playerGroup.position.y = 0;
                isJumping = false;
                playerYVelocity = 0;
            }
        }
    }

    if (gameState.status === 'playing') {
        // Spawn objects
        spawnTimer++;
        if (spawnTimer > (60 / gameState.currentSpeed)) {
            spawnRow();
            spawnTimer = 0;
        }
        
        // Update objects
        for (let i = activeObjects.length - 1; i >= 0; i--) {
            let obj = activeObjects[i];
            obj.position.z += gameState.currentSpeed;
            
            // Rotating animations
            if (obj.userData.type === 'coin') {
                obj.rotation.z += 0.08;
                obj.position.y = 0.9 + Math.sin(Date.now() * 0.005 + i) * 0.2;
            } else if (obj.userData.type === 'book') {
                obj.rotation.y += 0.03;
                obj.position.y = 0.8 + Math.sin(Date.now() * 0.004 + i) * 0.15;
            } else if (obj.userData.type === 'powerup') {
                obj.rotation.y += 0.05;
                obj.rotation.x += 0.03;
                obj.position.y = 1.2 + Math.sin(Date.now() * 0.006) * 0.3;
            } else if (obj.userData.type === 'enemy') {
                // Enemy bobbing
                obj.position.y = 1.4 + Math.sin(Date.now() * 0.008 + i) * 0.1;
            }

            // Collision detection
            if (obj.position.z > -2 && obj.position.z < 2) {
                if (obj.userData.lane === currentLaneIndex) {
                    let isHit = true;
                    if (isJumping && playerGroup.position.y > 2 && 
                        (obj.userData.type === 'box' || obj.userData.type === 'enemy')) {
                        if (obj.userData.type === 'enemy') {
                            // Jump over enemy gives a bonus
                            showFloatingText("يوڭۇردى! 🎯", window.innerWidth/2, window.innerHeight/2 - 40);
                        }
                        isHit = false;
                    }
                    
                    if (isHit) {
                        handleCollision(obj, i);
                        continue;
                    }
                }
            }

            // Remove if passed
            if (obj.position.z > 10) {
                removeObject(i);
            }
        }

        // === دېكوراتىۋ ئېلېمېنتلارنى يۆتكەش (Move decorations) ===
        const decorSpeed = gameState.currentSpeed;
        
        // دەرەخلەرنى يۆتكەش (Move trees)
        for (const tree of trees) {
            tree.position.z += decorSpeed;
            if (tree.position.z > 15) {
                const side = tree.userData.side;
                tree.position.x = side * (8 + Math.random() * 4);
                tree.position.z = -160 - Math.random() * 80;
            }
        }
        
        // گۈللەرنى يۆتكەش (Move flowers)
        for (const flower of flowers) {
            flower.position.z += decorSpeed;
            if (flower.position.z > 15) {
                const side = flower.userData.side;
                flower.position.x = side * (7 + Math.random() * 5);
                flower.position.z = -180 - Math.random() * 80;
            }
        }
        
        // بايراقلارنى يۆتكەش (Move flags)
        for (const flag of flags) {
            flag.position.z += decorSpeed;
            if (flag.position.z > 15) {
                flag.position.z = -160 - Math.random() * 100;
            }
        }

        // Update power-up
        updatePowerUp();

        // Dust trail particles
        if (Math.random() < 0.3) {
            const trailPos = new THREE.Vector3(
                playerGroup.position.x + (Math.random() - 0.5) * 0.5,
                0.1,
                playerGroup.position.z + 2
            );
            particles.trail(trailPos, 0x8B7355);
        }

        // Progress
        gameState.distance += gameState.currentSpeed * 0.5;
        document.getElementById('hud-dist').innerText = Math.floor(gameState.distance);
        
        const levelData = levelsData[gameState.level - 1];
        let percent = (gameState.distance / levelData.targetDistance) * 100;
        if (percent > 100) percent = 100;
        document.getElementById('progress-fill').style.width = percent + '%';

        // Combo display
        if (gameState.combo >= 3) {
            document.getElementById('combo-display').classList.remove('hidden');
            document.getElementById('combo-count').innerText = 'x' + gameState.combo;
        } else {
            document.getElementById('combo-display').classList.add('hidden');
        }

        if (gameState.distance >= levelData.targetDistance) {
            levelComplete();
        }
        
        // Screen shake recovery
        if (gameTilt > 0) {
            camera.position.x = Math.sin(Date.now() * 0.05) * gameTilt * 2;
            camera.position.y = 8 + Math.sin(Date.now() * 0.07) * gameTilt * 0.5;
            gameTilt *= 0.95;
            if (gameTilt < 0.01) gameTilt = 0;
        }
    }

    // Cloud movement
    for (const cloud of clouds) {
        cloud.group.position.x += cloud.speed;
        if (cloud.group.position.x > 40) cloud.group.position.x = -40;
    }

    // Update particles
    particles.update();

    // Camera look
    camera.lookAt(0, 2, -20);
    renderer.render(scene, camera);
}

// Windows resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start
animate();
