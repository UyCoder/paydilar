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
