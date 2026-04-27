// بۇ يەرگە داۋاملىق يېڭى ئويۇنلارنى قوشسىڭىز بولىدۇ
const gamesList = [
    {
        id: "chewendaz",
        title: "باتۇر چەۋەنداز",
        description: "شەرقىي تۈركىستاننىڭ تارىخىدىكى باتۇر ئەجدادلىرىمىزدەك ئات مىنىپ، تاجاۋۇزچىلارنى يېڭىپ يۈكسەك ئۇنۋانلارغا ئېرىشىڭ! يولدىكى بىلىم خەزىنىلىرىنى يىغىڭ.",
        icon: "fa-horse-head",
        url: "games/chewendaz/index.html",
        tags: ["تارىخ", "ماتېماتىكا", "ئەخلاق", "3D ئويۇن"]
    },
    {
        id: "xet_yezish",
        title: "خەتتات بالىلار",
        description: "گۈزەل ئۇيغۇر تىلىمىزدىكى ئىسىل سۆزلەرنى يېزىشنى ۋە ئۇستا خەتتاتلاردەك ئوبدان يېزىشنى مەشىق قىلىڭ! كىچىك بالىلار ئۈچۈن ئەڭ ياخشى خەت يېزىشقا رىغبەتلەندۈرۈش ئويۇنى",
        icon: "fa-paint-brush",
        url: "games/xet-yezish/index.html",
        tags: ["يېزىق", "ئەخلاق", "رىغبەت"]
    },
    {
        id: "karwan",
        title: "مۇستەقىللىق كارۋىنى",
        description: "شەرقىي تۈركىستان تارىخى، باتۇرلۇق ۋە ئىسلام بىلىملىرى يۇغۇرۇلغان جەلپكار كارۋان ئويۇنى. بۇغرا بولۇپ كارۋانغا يېتەكچىلىك قىلىڭ!",
        icon: "fa-route",
        url: "games/karwan/index.html",
        tags: ["تارىخ", "دىنىي بىلىم", "تەپەككۇر", "كارۋان"]
    },
    {
        id: "tanka",
        title: "مىللىي ئارمىيە تانكا قىسىمى",
        description: "شەرقىي تۈركىستان مىللىي ئارمىيەسىنىڭ كۆك تانكىسىنى ھەيدەپ تاجاۋۇزچىلارنى يوقىتىڭ! ئاي-يۇلتۇزلۇق تانكا بىلەن باتۇرلۇق كۆرسىتىڭ.",
        icon: "fa-crosshairs",
        url: "games/tanka/index.html",
        tags: ["جەڭ", "تارىخ", "باتۇرلۇق", "دىن"]
    },
    {
        id: "mina",
        title: "مىنا تازىلاش: ۋەتىنىمنى قوغدايمەن",
        description: "شەرقىي تۈركىستان شەھەرلىرىنى دۈشمەننىڭ مىنالىرىدىن تازىلاپ چىقىڭ! ئەقىل، سەۋرچانلىق، تارىخ ۋە جۇغراپىيە.",
        icon: "fa-bomb",
        url: "games/mina/index.html",
        tags: ["تەپەككۇر", "تارىخ", "جۇغراپىيە", "دىن"]
    },
    {
        id: "keyboard",
        title: "ئۇيغۇرچە كۇنۇپكا مەشىقى",
        description: "كۇنۇپكا تاختىسىدا تېز ۋە توغرا خەت بېسىشنى ئۆگىنىڭ. قىزىقارلىق ئويۇنلار ئارقىلىق خەت بېسىش سۈرئىتىڭىزنى ئاشۇرۇڭ!",
        icon: "fa-keyboard",
        url: "../UyghurKeyboardTraining/Ug-TrainingApp.html",
        tags: ["يېزىق", "مەشىق", "سۈرئەت", "بىلىم"]
    },
    {
        id: "game_airplane",
        title: "شەرقىي تۈركىستان ھاۋا ئارمىيىسى",
        description: "شەرقىي تۈركىستان زېمىنلىرىنىڭ ئاسمىنىدا خىتاي تاجاۋۇزلىرىنىڭ ئايروپىلانلىرىنى يوقۇتۇپ، ئۇلارغا تاجاۋۇزنىڭ تەمىنى تېتىتىپ قويۇڭ!!",
        icon: "fa-plane",
        url: "games/game-airplane.html",
        tags: ["ئاسمان", "جەڭ", "باتۇرلۇق", "تارىخ"]
    },
    {
        id: "game_space",
        title: "ئالەم كېمىسى: يۇلتۇز يىغىش",
        description: "ئالەم بوشلۇقىدا يۇلتۇزلارنى يىغىڭ ۋە تاشلاردىن ساقلىنىڭ! كۇنۇپكا تاختىسىدىكى يۆنىلىش كۇنۇپكىلىرى بىلەن كېمىنى باشقۇرۇڭ.",
        icon: "fa-rocket",
        url: "games/game-space.html",
        tags: ["3D", "ئالەم", "تېزلىك"]
    },
    {
        id: "game_garden",
        title: "مەرىپەت باغچىسى",
        description: "باغچىدىكى پىشقان مېۋىلەرنى سېۋەتكە يىغىڭ! مائۇس ياكى بارمىقىڭىز بىلەن سېۋەتنى يۆتكەڭ.",
        icon: "fa-seedling",
        url: "games/game-garden.html",
        tags: ["3D", "باغچە", "چاققانلىق"]
    },
    {
        id: "game_run",
        title: "كۆك بۆرەنىڭ تەۋەككۈلچىلىكى",
        description: "كۆك بۆرە بىلەن تاغلار ئارىسىدا يۈگۈرۈڭ! تاشلاردىن ساقلىنىش ئۈچۈن سول ۋە ئوڭ كۇنۇپكىلارنى ئىشلىتىڭ.",
        icon: "fa-paw",
        url: "games/game-run.html",
        tags: ["3D", "يۈگۈرۈش", "باتۇرلۇق"]
    },
    {
        id: "game_archery",
        title: "ئوقيا ئېتىش",
        description: "نىشانلارنى كۆزلەپ ئوق ئېتىڭ! مائۇس بىلەن كۆزلەڭ ۋە چىكىپ ئوق ئېتىڭ. باتۇرلارنىڭ تاللىشى.",
        icon: "fa-bullseye",
        url: "games/game-archery.html",
        tags: ["3D", "چاققانلىق", "باتۇرلۇق"]
    },
    {
        id: "game_memory",
        title: "خەزىنە ئىزدەش",
        description: "ئوخشاش رەڭدىكى تاشلارنى تېپىپ ماسلاشتۇرۇڭ! تەپەككۇر ۋە ئەستە تۇتۇش قابىلىيىتىنى ئاشۇرىدۇ.",
        icon: "fa-puzzle-piece",
        url: "games/game-memory.html",
        tags: ["3D", "تەپەككۇر", "ئەقىل"]
    },
    {
        id: "game_balloon",
        title: "ئۇچار شارلار",
        description: "ئاسمانغا ئۆرلەۋاتقان شارلارنى پارتلىتىڭ! شارلارنى چىكىپ نومۇر يىغىڭ. قىزىقارلىق شار دۇنياسى.",
        icon: "fa-certificate",
        url: "games/game-balloon.html",
        tags: ["3D", "شار", "خۇشاللىق"]
    },
    {
        id: "game_music",
        title: "مۇزىكا دۇنياسى",
        description: "ئاسماندىن چۈشىۋاتقان مۇزىكا نوتىلىرىنى تۇتۇڭ! نوتىلارنى چىكىپ گۈزەل ئاۋازلارنى ئاڭلاڭ.",
        icon: "fa-music",
        url: "games/game-music.html",
        tags: ["3D", "مۇزىكا", "سەنئەت"]
    },
    {
        id: "game_builder",
        title: "ئەقىللىق قۇرۇلۇشچى",
        description: "تاشلاردىنى بىرىنىڭ ئۈستىگە بىرىنى تىزىپ، ئەڭ ئېگىز مۇنارنى سېلىڭ! سىز ئەڭ ئۇستا قۇرۇلۇشچى.",
        icon: "fa-building",
        url: "games/game-builder.html",
        tags: ["3D", "قۇرۇلۇش", "سەۋر"]
    },
    {
        id: "game_mosque",
        title: "مەسچىت نۇرى",
        description: "مەسچىتنى يورۇتۇش ئۈچۈن ئالتۇن چىراغلارنى يىغىڭ! نۇرلۇق مەسچىت سىزنى ساقلايدۇ.",
        icon: "fa-mosque",
        url: "games/game-mosque.html",
        tags: ["3D", "ئىسلام", "نۇر"]
    },
    {
        id: "game_halal",
        title: "ھالال خەزىنە",
        description: "مەززىلىك ھالال تائاملارنى سېۋەتكە يىغىڭ! نان، سامسا ۋە مېۋىلەر بىلەن داستىخاننى بېزەڭ.",
        icon: "fa-utensils",
        url: "games/game-halal.html",
        tags: ["3D", "تائام", "ھالال"]
    },
    {
        id: "game_morals",
        title: "ئەخلاق يولى",
        description: "ياخشى ئەمەللەر يېزىلغان سۇپىلارغا سەكرەپ، ئەڭ يۇقىرى چوققىغا يېتىڭ! ئەخلاق ئەڭ گۈزەل زىننەت.",
        icon: "fa-rainbow",
        url: "games/game-morals.html",
        tags: ["3D", "ئەخلاق", "سەكرەش"]
    },
    {
        id: "game_alphabet",
        title: "ئەرەب ئەلىفباسى",
        description: "ئاسماندىكى سىرلىق ھەرپلەرنى تېپىپ چىكىڭ! قۇرئان ھەرپلىرىنى ئۆگىنىش بەك قىزىقارلىق.",
        icon: "fa-moon",
        url: "games/game-alphabet.html",
        tags: ["3D", "ھەرپ", "ئۆگىنىش"]
    },
    {
        id: "game_camel",
        title: "قۇتلۇق كارۋان",
        description: "مۇقەددەس شەھەرلەرگە بىلىم توشۇۋاتقان تۆگىگە ياردەم بېرىڭ! تاشلاردىن ساقلىنىپ مەنزىلگە يېتىڭ.",
        icon: "fa-route",
        url: "games/game-camel.html",
        tags: ["3D", "كارۋان", "سەپەر"]
    },
    {
        id: "game_teen",
        title: "⚡ ئالماس شەھەر",
        description: "16 ياشلىق ياشلار ئۈچۈن مەخسۇس لايىھەلەنگەن، يۇقىرى سۈرئەتلىك 3D تەۋەككۈلچىلىك ئويۇنى. كەلگۈسى شەھەرنىڭ سىرلىرىنى ئېچىڭ!",
        icon: "fa-bolt",
        url: "games/game-teen.html",
        tags: ["3D", "ياشلار", "تېزلىك", "ئىستراتېگىيە"]
    }
    // كېيىنكى ئويۇنلارنى مۇشۇ يەرگە قوشىسىز:
    // {
    //     id: "math_game",
    //     title: "ئەقىللىق ماتېماتىك",
    //     ...
    // }
];

function renderGames() {
    const grid = document.getElementById('gameGrid');

    gamesList.forEach(game => {
        const card = document.createElement('a');
        card.href = game.url;
        card.className = 'game-card';

        const tagsHtml = game.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

        card.innerHTML = `
            <div class="game-icon-wrapper">
                <i class="fas ${game.icon}"></i>
            </div>
            <h2 class="game-title">${game.title}</h2>
            <p class="game-desc">${game.description}</p>
            <div class="game-tags">
                ${tagsHtml}
            </div>
        `;

        grid.appendChild(card);
    });
}

// سەھىپە يۈكلەنگەندە ئويۇنلارنى كۆرسىتىش
document.addEventListener('DOMContentLoaded', renderGames);
