// 🎮 بىلىك بالىلار ئويۇنلىرى - Game Data
// داۋاملىق يېڭى ئويۇنلارنى قوشسىڭىز بولىدۇ

const gamesList = [
    // ==================== يېڭى 5 ئويۇن (NEW!) ====================
    {
        id: "game_racer",
        title: "🏎️ تەكلىماكان سۈزگۈچى",
        description: "ئۇيغۇر يۇرتىنىڭ يوللىرىدا تېز يۈگۈرۈڭ! توساقلاردىن ساقلىنىپ يۇلتۇزلارنى يىغىڭ! 5 باسقۇچنى بېسىپ ئۆتۈڭ، ھەر باسقۇچتا ئۇيغۇر تارىخىنى ئۆگىنىڭ!",
        icon: "fa-car",
        url: "games/game-racer.html",
        tags: ["ھەرىكەتلىك", "تارىخ", "باسقۇچ"],
        category: "action",
        isNew: true
    },
    {
        id: "game_whack",
        title: "🔨 باتۇر چوپان",
        description: "يەردىن چىقىۋاتقان دۈشمەنلەرنى چاپقۇر! 5 دەۋر، ھەر دەۋردە ئۇيغۇر تارىخى ۋە مەدەنىيىتى ھەققىدە قىزىقارلىق مەلۇمات بىلىسىز!",
        icon: "fa-gavel",
        url: "games/game-whack.html",
        tags: ["ھەرىكەتلىك", "تارىخ", "دەۋر"],
        category: "action",
        isNew: true
    },
    {
        id: "game_fruit",
        title: "🍇 ئۇيغۇر مېۋىسى كەس",
        description: "ئۇيغۇرستاننىڭ مەشھۇر مېۋىلىرىنى — ئۈزۈم، شەپتەل، قوغۇن، توت — سىزىپ كېسىڭ! 5 باسقۇچتا ئۇيغۇر باغۋەنچىلىكى ھەققىدە ئۆگىنىڭ!",
        icon: "fa-apple-alt",
        url: "games/game-fruit.html",
        tags: ["ھەرىكەتلىك", "مېۋە", "تارىخ"],
        category: "action",
        isNew: true
    },
    {
        id: "game_catch",
        title: "☽ ئاي-يۇلتۇز تۇت",
        description: "ئۇيغۇر يۇرتىنىڭ ئاسمىنىدا ئاي-يۇلتۇزلارنى تۇتۇڭ! 5 باسقۇچتا ئۇيغۇر مەدەنىيىتى ۋە مۇسىقىسى ھەققىدە ئۆگىنىڭ!",
        icon: "fa-star",
        url: "games/game-catch.html",
        tags: ["ئاركادا", "مەدەنىيەت", "باسقۇچ"],
        category: "arcade",
        isNew: true
    },
    {
        id: "game_dino",
        title: "🐪 تەكلىماكان تۆگىسى",
        description: "تۆگە بىلەن تەكلىماكان قۇملۇقىدا يۈگۈرۈڭ! كاكتۇستىن سەكرەپ سۇ كوزىلىرىنى يىغىڭ! 5 باسقۇچتا ئىپەك يولى تارىخىنى ئۆگىنىڭ!",
        icon: "fa-horse",
        url: "games/game-dino.html",
        tags: ["ئاركادا", "تارىخ", "ئىپەك يولى"],
        category: "arcade",
        isNew: true
    },
    // ==================== Subdirectory Games ====================
    {
        id: "chewendaz",
        title: "🐎 باتۇر چەۋەنداز",
        description: "شەرقىي تۈركىستاننىڭ تارىخىدىكى باتۇر ئەجدادلىرىمىزدەك ئات مىنىپ، تاجاۋۇزچىلارنى يېڭىپ يۈكسەك ئۇنۋانلارغا ئېرىشىڭ!",
        icon: "fa-horse-head",
        url: "games/chewendaz/index.html",
        tags: ["تارىخ", "سەۋەر", "3D", "ھەرىكەتلىك"],
        category: "action"
    },
    {
        id: "xet_yezish",
        title: "✍️ خەتتات بالىلار",
        description: "گۈزەل ئۇيغۇر تىلىمىزدىكى ئىسىل سۆزلەرنى يېزىشنى ۋە ئۇستا خەتتاتلاردەك ئوبدان يېزىشنى مەشىق قىلىڭ!",
        icon: "fa-paint-brush",
        url: "games/xet-yezish/index.html",
        tags: ["يېزىق", "ئۆگىنىش", "خەتتاتلىق"],
        category: "learning"
    },
    {
        id: "karwan",
        title: "🚩 مۇستەقىللىق كارۋىنى",
        description: "شەرقىي تۈركىستان تارىخى، باتۇرلۇق ۋە ئىسلام بىلىملىرى يۇغۇرۇلغان جەلپكار كارۋان ئويۇنى. بۇغرا بولۇپ كارۋانغا يېتەكچىلىك قىلىڭ!",
        icon: "fa-route",
        url: "games/karwan/index.html",
        tags: ["تارىخ", "دىنىي بىلىم", "كارۋان"],
        category: "learning"
    },
    {
        id: "tanka",
        title: "🇹🇰 مىللىي ئارمىيە تانكا قىسىمى",
        description: "شەرقىي تۈركىستان مىللىي ئارمىيەسىنىڭ كۆك تانكىسىنى ھەيدەپ تاجاۋۇزچىلارنى يوقىتىڭ! ئاي-يۇلتۇزلۇق تانكا بىلەن باتۇرلۇق كۆرسىتىڭ.",
        icon: "fa-crosshairs",
        url: "games/tanka/index.html",
        tags: ["جەڭ", "تارىخ", "باتۇرلۇق"],
        category: "action"
    },
    {
        id: "mina",
        title: "💣 مىنا تازىلاش: ۋەتىنىمنى قوغدايمەن",
        description: "شەرقىي تۈركىستان شەھەرلىرىنى دۈشمەننىڭ مىنالىرىدىن تازىلاپ چىقىڭ! ئەقىل، سەۋرچانلىق، تارىخ ۋە جۇغراپىيە.",
        icon: "fa-bomb",
        url: "games/mina/index.html",
        tags: ["تەپەككۇر", "تارىخ", "جۇغراپىيە"],
        category: "puzzle"
    },
    {
        id: "keyboard",
        title: "⌨️ ئۇيغۇرچە كۇنۇپكا مەشىقى",
        description: "كۇنۇپكا تاختىسىدا تېز ۋە توغرا خەت بېسىشنى ئۆگىنىڭ. قىزىقارلىق ئويۇنلار ئارقىلىق خەت بېسىش سۈرئىتىڭىزنى ئاشۇرۇڭ!",
        icon: "fa-keyboard",
        url: "../UyghurKeyboardTraining/Ug-TrainingApp.html",
        tags: ["يېزىق", "مەشىق", "سۈرئەت"],
        category: "learning"
    },
    // ==================== 3D / Action Games ====================
    {
        id: "game_airplane",
        title: "✈️ شەرقىي تۈركىستان ھاۋا ئارمىيىسى",
        description: "شەرقىي تۈركىستان زېمىنلىرىنىڭ ئاسمىنىدا خىتاي تاجاۋۇزلىرىنىڭ ئايروپىلانلىرىنى يوقۇتۇپ، ئۇلارغا تاجاۋۇزنىڭ تەمىنى تېتىتىپ قويۇڭ!!",
        icon: "fa-plane",
        url: "games/game-airplane.html",
        tags: ["ئاسمان", "جەڭ", "باتۇرلۇق", "3D"],
        category: "action"
    },
    {
        id: "game_defender",
        title: "🛡️ مۇھاپىزەتچى كۆك يۇلتۇز",
        description: "ۋەتىنىمىزنىڭ ئاسمىنىنى تاجاۋۇزچىلاردىن قوغداڭ! كۆك بايرىقىمىزنىڭ يۇلتۇزىنى تۇتۇپ دۈشمەنلەرنى يوقىتىڭ.",
        icon: "fa-fighter-jet",
        url: "games/game-defender.html",
        tags: ["مۇداپىئە", "باتۇرلۇق", "تېزلىك", "3D"],
        category: "action"
    },
    {
        id: "game_space",
        title: "🚀 ئالەم كېمىسى: يۇلتۇز يىغىش",
        description: "ئالەم بوشلۇقىدا يۇلتۇزلارنى يىغىڭ ۋە تاشلاردىن ساقلىنىڭ! كۇنۇپكا تاختىسىدىكى يۆنىلىش كۇنۇپكىلىرى بىلەن كېمىنى باشقۇرۇڭ.",
        icon: "fa-rocket",
        url: "games/game-space.html",
        tags: ["3D", "ئالەم", "تېزلىك"],
        category: "arcade"
    },
    {
        id: "game_commando",
        title: "🎖️ مىللىي ئارمىيە كوماندىرلىرى",
        description: "تاجاۋۇزچىلارنىڭ توساقلىرىنى بۆسۈپ ئۆتۈپ، مىللىي ئارمىيەنىڭ باتۇرلۇقىنى كۆرسىتىڭ! ئوق ئېتىڭ، سەكرەڭ ۋە يېڭىڭ.",
        icon: "fa-running",
        url: "games/game-commando.html",
        tags: ["يۈگۈرۈش", "جەڭ", "قەھرىمانلىق"],
        category: "action"
    },
    {
        id: "game_mujahid",
        title: "🎯 مىللىي ئارمىيە مۇجاھىدى",
        description: "مىللىي ئارمىيە ئالاھىدە قىسىم مۇجاھىدى بولۇپ، تاجاۋۇزچىلارنى بىردىن-بىردىن يوقىتىڭ.",
        icon: "fa-crosshairs",
        url: "games/game-mujahid.html",
        tags: ["باتۇرلۇق", "جەڭ", "قوغداش"],
        category: "action"
    },
    {
        id: "game_archer",
        title: "🏹 يىراقتىكى نىشان",
        description: "باتۇر ئوقياچى بولۇپ يىراقتىكى تاجاۋۇزچىنى دەل مەرگەنلىك بىلەن ئېتىپ يوقىتىڭ.",
        icon: "fa-bullseye",
        url: "games/game-archer.html",
        tags: ["ئوقيا", "مەرگەن", "باتۇرلۇق"],
        category: "action"
    },
    {
        id: "game_archery",
        title: "🎯 ئوقيا ئېتىش",
        description: "نىشانلارنى كۆزلەپ ئوق ئېتىڭ! مائۇس بىلەن كۆزلەڭ ۋە چىكىپ ئوق ئېتىڭ. باتۇرلارنىڭ تاللىشى.",
        icon: "fa-bullseye",
        url: "games/game-archery.html",
        tags: ["3D", "چاققانلىق", "باتۇرلۇق"],
        category: "action"
    },
    {
        id: "game_eagle",
        title: "🦅 ئاسمان بۈركۈتى",
        description: "ئاي-يۇلتۇزلۇق كۆك بايرىقىمىزنى تۇتۇپ، شەرقىي تۈركىستاننىڭ ئېگىز تاغلىرى ئۈستىدە ئەركىن پەرۋاز قىلىڭ.",
        icon: "fa-dove",
        url: "games/game-eagle.html",
        tags: ["پەرۋاز", "بايراق", "ئەركىنلىك"],
        category: "arcade"
    },
    // ==================== Adventure / Run Games ====================
    {
        id: "game_run",
        title: "🐺 كۆك بۆرەنىڭ تەۋەككۈلچىلىكى",
        description: "كۆك بۆرە بىلەن تاغلار ئارىسىدا يۈگۈرۈڭ! تاشلاردىن ساقلىنىش ئۈچۈن سول ۋە ئوڭ كۇنۇپكىلارنى ئىشلىتىڭ.",
        icon: "fa-paw",
        url: "games/game-run.html",
        tags: ["3D", "يۈگۈرۈش", "باتۇرلۇق"],
        category: "arcade"
    },
    {
        id: "game_desert",
        title: "🏜️ قۇملۇقتىكى ساياھەتچى",
        description: "تەكلىماكان قۇملۇقىدا يۈگۈرۈڭ، سەكرەڭ ۋە تارىخىي خەزىنىلەرنى تېپىپ كۆپ مۇكاپات ئېلىڭ.",
        icon: "fa-camel",
        url: "games/game-desert.html",
        tags: ["ساياھەت", "تەكلىماكان", "يۈگۈرۈش"],
        category: "arcade"
    },
    {
        id: "game_garden",
        title: "🌿 مەرىپەت باغچىسى",
        description: "باغچىدىكى پىشقان مېۋىلەرنى سېۋەتكە يىغىڭ! مائۇس ياكى بارمىقىڭىز بىلەن سېۋەتنى يۆتكەڭ.",
        icon: "fa-seedling",
        url: "games/game-garden.html",
        tags: ["3D", "باغچە", "چاققانلىق"],
        category: "arcade"
    },
    // ==================== Puzzle / Brain Games ====================
    {
        id: "game_tictactoe",
        title: "❌ تىك تاك توپ",
        description: "كلاسسىك ❌ ۋە ⭕ ئويۇنى. چىرايلىق ۋە رەڭدار كۆرۈنۈش ئىچىدە كومپيۇتېر بىلەن زېھىن سىناڭ!",
        icon: "fa-hashtag",
        url: "games/game-tictactoe.html",
        tags: ["زېھىن", "كلاسسىك", "ئىستراتېگىيە"],
        category: "puzzle"
    },
    {
        id: "game_memory",
        title: "🧩 خەزىنە ئىزدەش",
        description: "ئوخشاش رەڭدىكى تاشلارنى تېپىپ ماسلاشتۇرۇڭ! تەپەككۇر ۋە ئەستە تۇتۇش قابىلىيىتىنى ئاشۇرىدۇ.",
        icon: "fa-puzzle-piece",
        url: "games/game-memory.html",
        tags: ["3D", "تەپەككۇر", "ئەقىل", "ئەستە"],
        category: "puzzle"
    },
    {
        id: "game_mosque",
        title: "🏮 مەسچىت ئەسلىمىسى",
        description: "مەسچىت تېمىسىدىكى كارتا ئەسلىمە ئويۇنى! ئوخشاش كارتىلارنى تېپىپ مەسچىتنى يورۇتۇڭ. 3 قىيىنلىق دەرىجىسى!",
        icon: "fa-mosque",
        url: "games/game-mosque.html",
        tags: ["ئەستە", "ئىسلام", "كارتا", "تەپەككۇر"],
        category: "puzzle"
    },
    {
        id: "game_morals",
        title: "🌈 ئەخلاق يولى",
        description: "ياخشى ئەمەللەر يېزىلغان سۇپىلارغا سەكرەپ، ئەڭ يۇقىرى چوققىغا يېتىڭ! ئەخلاق ئەڭ گۈزەل زىننەت.",
        icon: "fa-rainbow",
        url: "games/game-morals.html",
        tags: ["3D", "ئەخلاق", "سەكرەش"],
        category: "learning"
    },
    {
        id: "game_camel",
        title: "🐪 قۇتلۇق كارۋان",
        description: "مۇقەددەس شەھەرلەرگە بىلىم توشۇۋاتقان تۆگىگە ياردەم بېرىڭ! تاشلاردىن ساقلىنىپ مەنزىلگە يېتىڭ.",
        icon: "fa-route",
        url: "games/game-camel.html",
        tags: ["3D", "كارۋان", "سەپەر"],
        category: "arcade"
    },
    // ==================== Sports / Skill ====================
    {
        id: "game_sport",
        title: "🏀 ۋاسكىتبول چولپىنى",
        description: "شەرقىي تۈركىستان كۆك ئاسمىنى ئاستىدا توپنى گارغا تاشلاپ كۆڭۈل ئېچىڭ! نىشانلاڭ ۋە تاشلاڭ.",
        icon: "fa-basketball-ball",
        url: "games/game-basketball.html",
        tags: ["تەنھەرىكەت", "ۋاسكىتبول", "نىشانلاش"],
        category: "sport"
    },
    {
        id: "game_pingpong",
        title: "🏓 پىڭپوڭ توپ",
        description: "كلاسسىك پىڭپوڭ ئويۇنى! چاققانلىقىڭىزنى ئىشقا سېلىپ كومپيۇتېر بىلەن رىقابەتلىشىڭ.",
        icon: "fa-table-tennis",
        url: "games/game-pingpong.html",
        tags: ["تەنھەرىكەت", "چاققانلىق", "پىڭپوڭ"],
        category: "sport"
    },
    {
        id: "game_artillery",
        title: "💥 توپ قۇرال قىسىمى",
        description: "شەرقىي تۈركىستان مىللىي ئارمىيىسىنىڭ باتۇر تېوپچىسى بولۇڭ! تاغ ئارقىسىدىكى تاجاۋۇزچىلارنى پارتلىتىڭ.",
        icon: "fa-bomb",
        url: "games/game-artillery.html",
        tags: ["باتۇرلۇق", "توپ", "نىشانلاش"],
        category: "action"
    },
    // ==================== Casual / Fun ====================
    {
        id: "game_balloon",
        title: "🎈 ئۇچار شارلار",
        description: "ئاسمانغا ئۆرلەۋاتقان شارلارنى پارتلىتىڭ! شارلارنى چىكىپ نومۇر يىغىڭ. قىزىقارلىق شار دۇنياسى.",
        icon: "fa-certificate",
        url: "games/game-balloon.html",
        tags: ["3D", "شار", "خۇشاللىق"],
        category: "arcade"
    },
    {
        id: "game_music",
        title: "🎵 مۇزىكا دۇنياسى",
        description: "ئاسماندىن چۈشىۋاتقان مۇزىكا نوتىلىرىنى تۇتۇڭ! نوتىلارنى چىكىپ گۈزەل ئاۋازلارنى ئاڭلاڭ.",
        icon: "fa-music",
        url: "games/game-music.html",
        tags: ["3D", "مۇزىكا", "سەنئەت"],
        category: "arcade"
    },
    {
        id: "game_builder",
        title: "🏗️ ئەقىللىق قۇرۇلۇشچى",
        description: "تاشلاردىنى بىرىنىڭ ئۈستىگە بىرىنى تىزىپ، ئەڭ ئېگىز مۇنارنى سېلىڭ! سىز ئەڭ ئۇستا قۇرۇلۇشچى.",
        icon: "fa-building",
        url: "games/game-builder.html",
        tags: ["3D", "قۇرۇلۇش", "سەۋر"],
        category: "puzzle"
    },
    {
        id: "game_halal",
        title: "🥟 ھالال خەزىنە",
        description: "مەززىلىك ھالال تائاملارنى سېۋەتكە يىغىڭ! نان، سامسا ۋە مېۋىلەر بىلەن داستىخاننى بېزەڭ.",
        icon: "fa-utensils",
        url: "games/game-halal.html",
        tags: ["3D", "تائام", "ھالال"],
        category: "arcade"
    },
    {
        id: "game_alphabet",
        title: "🌙 ئەرەب ئەلىفباسى",
        description: "ئاسماندىكى سىرلىق ھەرپلەرنى تېپىپ چىكىڭ! قۇرئان ھەرپلىرىنى ئۆگىنىش بەك قىزىقارلىق.",
        icon: "fa-moon",
        url: "games/game-alphabet.html",
        tags: ["3D", "ھەرپ", "ئۆگىنىش", "قۇرئان"],
        category: "learning"
    },
    {
        id: "game_teen",
        title: "⚡ ئالماس شەھەر",
        description: "16 ياشلىق ياشلار ئۈچۈن مەخسۇس لايىھەلەنگەن، يۇقىرى سۈرئەتلىك 3D تەۋەككۈلچىلىك ئويۇنى.",
        icon: "fa-bolt",
        url: "games/game-teen.html",
        tags: ["3D", "ياشلار", "تېزلىك"],
        category: "action"
    },
    {
        id: "game_bluedove",
        title: "🕊️ كۆك كەپتەر: ئەركىنلىك",
        description: "ئەركىنلىك كەپتىرىنى ئۇچۇرۇپ، قەپەزدىكى باشقا كەپتەرلەرنى قۇتقۇزۇڭ! ناھايىتى قىزىقارلىق.",
        icon: "fa-dove",
        url: "games/game-bluedove.html",
        tags: ["قۇتقۇزۇش", "ئەركىنلىك", "ئاسان"],
        category: "arcade"
    },
    // ==================== كېيىنكى ئويۇنلارنى مۇشۇ يەرگە قوشىسىز ====================
    // {
    //     id: "math_game",
    //     title: "ئەقىللىق ماتېماتىك",
    //     ...
    // }
];

// ============================================================
//  RENDER GAMES
// ============================================================
function renderGames() {
    const grid = document.getElementById('gameGrid');
    if (!grid) return;
    grid.innerHTML = '';

    // Reset category if not set
    if (!window._activeCategory) window._activeCategory = 'all';

    gamesList.forEach(game => {
        const card = document.createElement('a');
        card.href = game.url;
        card.className = 'game-card';
        card.dataset.tags = game.tags.join(' ');
        card.dataset.title = game.title;
        card.dataset.desc = game.description;
        card.dataset.category = game.category || 'arcade';

        const tagsHtml = game.tags.map(tag => {
            const cls = getTagClass(tag);
            return `<span class="tag ${cls}">${tag}</span>`;
        }).join('');

        let html = `
            <div class="game-icon-wrapper">
                <i class="fas ${game.icon}"></i>
            </div>
            <h2 class="game-title">${game.title}</h2>
            <p class="game-desc">${game.description}</p>
            <div class="game-tags">${tagsHtml}</div>
        `;

        if (game.isNew) {
            html = `<span class="new-badge">✨ يېڭى!</span>` + html;
        }

        card.innerHTML = html;
        grid.appendChild(card);
    });

    // Update count
    const count = document.getElementById('gameCount');
    if (count) count.textContent = `(${gamesList.length} ئويۇن)`;
}

function getTagClass(tag) {
    const map = {
        'ھەرىكەتلىك': 'tag-action',
        'تېزلىك': 'tag-action',
        'جەڭ': 'tag-action',
        'باتۇرلۇق': 'tag-action',
        'مۇداپىئە': 'tag-action',
        'چاققانلىق': 'tag-action',
        'ئاركادا': 'tag-arcade',
        'ئاسمان': 'tag-arcade',
        'يۈگۈرۈش': 'tag-arcade',
        'سەكرەش': 'tag-arcade',
        'ماشىنا': 'tag-arcade',
        'دېنو': 'tag-arcade',
        'يۇلتۇز': 'tag-arcade',
        'مېۋە': 'tag-arcade',
        'تەپەككۇر': 'tag-puzzle',
        'ئەستە': 'tag-puzzle',
        'ئەقىل': 'tag-puzzle',
        'ئىستراتېگىيە': 'tag-strategy',
        'كارتا': 'tag-puzzle',
        'زېھىن': 'tag-puzzle',
        'ئۆگىنىش': 'tag-learning',
        'يېزىق': 'tag-learning',
        'ھەرپ': 'tag-learning',
        'قۇرئان': 'tag-learning',
        'تارىخ': 'tag-learning',
        'ئىسلام': 'tag-learning',
        'دىنىي بىلىم': 'tag-learning',
        'خەتتاتلىق': 'tag-learning',
        'تەنھەرىكەت': 'tag-sport',
        'ۋاسكىتبول': 'tag-sport',
        'پىڭپوڭ': 'tag-sport',
        'نىشانلاش': 'tag-sport',
    };
    return map[tag] || 'tag-default';
}

// سەھىپە يۈكلەنگەندە ئويۇنلارنى كۆرسىتىش
document.addEventListener('DOMContentLoaded', renderGames);
