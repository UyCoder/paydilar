document.addEventListener('DOMContentLoaded', function() {
const sentences = [
    // Add your Uyghur sentences here
    "تەھرىرلىمەكچى بولغان",
    "ئويغاق تۇرۇش نۇر، غەپلەتتە قېلىش بولسا ئالدىنىشتۇر.",
    "كىشىلەردىن بىر نەرسە كۈتمەسلىك نەق بايلىقتۇر!",
    "تەقۋادارلىق پاكلىق ۋە نومۇسنىڭ خۇلاسىسىدۇر.",
    "ئۆلگەنلەرنىڭ ئۆلۈمىدىن ئىبرەت ئېلىش ئەڭ چوڭ ۋەزدۇر.",
    "كەمتەرلىك ئەقىلنىڭ بېشىدۇر، تەكەببۇرلۇق بولسا نادانلىقنىڭ بىشىدۇر.",
    "ئۈچ نەرسە دوستلىشىشقا سەۋەب بولالايدۇ: دىن، كەمتەرلىك ۋە سېخىيلىق.",
    "نىيەت بۇزۇلغاندا ئاپەت يۈز بېرىدۇ.",
    "ئىنسانلار ئىككى خىل: شەرىئەتكە ئەگەشكۈچى ۋە يېڭى بىر مەزھەپ پەيدا قىلغۇچى.",
    "دۇنيادىكى ئەڭ ئېسىل كىشىلەر سېخىلەر، ئاخىرەتتىكى ئەڭ ئېسىل كىشىلەر تەقۋادار كىشىلەردۇر.",
    "ئىنسانلار دەرەخكە ئوخشايدۇ، تەمىنلىنىۋاتقان سۇ بىر، لېكىن بېرىدىغان مېۋە باشقا.",
    "ئىنتىقام ئېلىشقا ئالدىراش نامەردنىڭ ئىشىدۇر.",
    "ئۆزىگە زۇلۇم قىلىۋاتقان كىشى قانداقمۇ باشقىلارغا ئادالەت بىلەن مۇئامىلە قىلسۇن.",
    "نەپسنىڭ تۈزىلىشى تاماخورلۇقنى تاشلاش بىلەن بولىدۇ.",
    "مال - دۇنياغا بېرىلىش ئېتىقادنى ئاجىزلاشتۇرۇپ، ئىشەنچنى ۋەيران قىلىدۇ.",
    "مىننەت بىلەن ياخشىلىق قىلىش نامەردلىكتۇر.",
    "شاھلارغا يېقىنلىشىش ئاپەتنىڭ ئاچقۇچى، پىتنە - پاساتنىڭ ئۇرۇقىدۇر.",
    "قامچاڭدىن قورققان كىشى ئۆلۈمىڭنى ئۈمىد قىلىدۇ.",
    "چاقچىقى كۆپ بولغان كىشىنىڭ ھۆرمىتى كەم بولىدۇ.",
    "چاقچاق دۈشمەنلىككە سەۋەب بولىدۇ.",
    "ئەر كىشىنىڭ ئەڭ ئېغىر يۈكى ئادەمگەرچىلىكتۇر.",
    "دۈشمەنلىشىشنىڭ سەۋەبى تالاش - تارتىش قىلىشتۇر.",
    " ئادەم ئىككى نەرسىسى بىلەنلا ئادەم: يۈرىكى ۋە تىلى.",
    "كىشىنىڭ ئۆزىنى ماختىشى ئەڭ ناچار خىسلەتتۇر.",
    "مەدھىيىۋازلاردىن پەخەس بولۇڭلار، چۈنكى ئۇلارنىڭ يامگن غەرىزى بار.",
    "مۇلايىم بول ،ئاجىز بولما، كەسكىن بول، زوراۋان بولما.",
    "مۇلايىم كىشىنى ياخشى كۆرۈش كېرەك.",
    "مۇلايىم كىشىنىڭ دوستلىرى كۆپ بولىدۇ.",
    "ئويۇن كەسكىنلىكنى بوشاشتۇرۇپ قويىدۇ.",
    "ئويۇن - چاقچاققا بېرىلگەن كىشى غەلىبىدىن يىراق.",
    "بىھۇدە ۋاقىتتىن ئاپەت تۇغۇلىدۇ.",
    "تىركىشىشتىن يىراق تۇرۇڭلار، چۈنكى ئۇ ئۇرۇشلارغا سەۋەبچى بولىدۇ.",
    "نامەردكە مېھمان بولساڭ، روزىدارلىقىڭنى باھانە قىل.",
    "ساڭا ياخشىلىق قىلغان كىشىگە ياخشى مۇكاپات بەرگىن.",
    "ئۆزىنىڭ دەردىنى باشقىلارغا ئېيتقان كىشى خارلىققا رازى بولغان كىشىدۇر.",
    "ياش تۆككىچە مۇشت تۈگ.",
    "يالغانچىنىڭ قۇيرۇقى بىر تۇتام.",
    "يولدىن چىقما، خاندىن قورقما.",
    "يالغۇز ئاتنىڭ چېڭى چىقماس، چېڭى چىقسىمۇ دېڭى چىقماس.",
    "يامان ھارۋا يول بۇزار، يامان ئادەم يۇرت بۇزار.",
    "يۈز قاغىغا بىر شۇڭقار كۇپايە.",
    "يۈزۈڭدە قارا بولسا ئەينەكتىن كۆرمە.",
    "يىتكەن پىچاقنىڭ سېپى ئالتۇن.",
    "يىقىلغان چېلىشىشقا تويماپتۇ.",
    "يەتتە ئۆلچەپ بىر كەس.",
    "ئېشەك باينىڭ تاغار باينىڭ، يېقىلسا يۆلىمەيمەن، ئۆلسە تۆلىمەيمەن.",
    "ئېشەك ئالدىغا چۈشىۋالسا ئاتنىڭ مېڭىشى بۇزۇلار.",
    "ئېشەككە كۈچۈڭ يەتمىسە، ئۇر توقۇمنى.",
    "ئېشەككە ئالتۇن ئېگەر توقۇلسىمۇ يەنىلا ئېشەك.",
    "ئىش ئىشتەينى ئاچىدۇ.",
    "نىيىتى ياماننىڭ قازىنى تۆشۈك.",
    "نەسىھەت ئاچچىق، مېۋىسى تاتلىق.",
    "ھورۇن ئادەم يەرگىمۇ يۈك.",
    "ھازىغا بارغان خوتۇن، ئۆز يىغىسىنى يىغلار.",
    "ھەر گۈلنىڭ پۇرىقى باشقىچە.",
    "ھېسابلىق دوست ئايرىلماس.",
    "ھەممىنى كۆرگەن كۆز ئۆزىنى كۆرمەس.",
    "ئوتنى سەل چاغلىما، كۆيدۈرىدۇ، دۈشمەننى كىچىك دىمە، ئۆلتۈرىدۇ.",
    "ئوتنى كوچىلىساڭ ئۆچىدۇ، قوشناڭنى كوچىلىساڭ كۆچىدۇ.",
    "ئۇچقۇندىن قورققان تۆمۈرچى ئەمەس.",
    "كاجنى بازار تۈزەيدۇ.",
    "كىرىشتىن ئاۋۋال چىقىشنى ئويلا.",
    "كىشىنىڭ ئاغزىغا قارىغان ئاچ قالار.",
    "گەپ يەردە ئەمەس، ئەردە.",
    "گەپتە گەپ بار، قۇرساقتا دەرد بار.",
    "ماڭغاننىڭ يولى تۈگەر، ئولتۇرغاننىڭ كۈنى تۈگەر.",
    "مىڭ ئاڭلىغاندىن بىر كۆرگەن ئەلا.",
    "قازاندا نىمە بولسا چۆمۈچكە شۇ چىقار.",
    "قانائەتلىك كىشىنىڭ قارنى توق.",
    "قاننى قان بىلەن يۇغىلى بولماس.",
    "قۇرساق توق، كۆڭۈل خوش.",
    "قۇرۇق گەپكە مۈشۈك ئاپتاپقا چىقمايدۇ.",
    "قۇشنى دان ئالدايدۇ، ئادەمنى سۆز ئالدايدۇ.",
    "قۇۋلۇقتىن شۇملۇق تۇغۇلار.",
    "ساغلام تەندە ساپ ئەقىل.",
    "ساراڭغا سوت يوق.",
    "سېمىزلىك ھايۋانغا يارىشار.",
    "سەۋرنىڭ تېگى ئالتۇن.",
    "غۇلىچى تۈگەپ غېرىچى قاپتۇ.",
    "غەم قىلغۇچە پەم قىل.",
    "دوستۇڭ قاغا بولسا يېيىشىڭ پوق.",
    "دوست كەينىدە ماختار، دۈشمەن ئالدىڭدا ماختار.",
    "دىسەڭ گەپ بولىدۇ، دىمىسەڭ دەرد بولىدۇ.",
    "راستلىقى ئاز كىشىنىڭ دوستلۇقى ئاز.",
    "ئەگرى نوغۇچ تاراقلايدۇ.",
    "چايناپ بەرگەن ناننىڭ تەمى يوق.",
    "چوڭ دەرەخنىڭ سايىسى چوڭ بولىدۇ.",
    "چىراي كۆيدۈرەر، خۇلق سۆيدۈرەر.",
    "خوتۇن كىشى تىلى بىلەن تۇل بولار.",
    "خوتۇنغا ئامراق – بالىغا ئۆچ، قايماققا ئامراق – كالىغا ئۆچ.",
    "تام تۈۋىدىن قېرىيدۇ، ئادەم ئىچىدىن قېرىيدۇ.",
    "تەلۋە تۆرنى بەرمەس.",
    "تەلەپ قىل، سەۋەب قىل.",
    "جاپا چەكمىگەن ۋاپانىڭ قەدرىنى بىلمەس.",
    "جان بولسا جاھان، ئاش بولسا قازان.",
    "ئاتا مىھرى چىراغ، ئانا مىھرى بۇلاق.",
    "ئەرگە بىر نۆۋەت، يەرگە بىر نۆۋەت.",
    "بۆرىنىڭ بالىسى بۆرە.",
    "پىلانسىز ئىش، قېلىپسىز خىش.",
    "تۈلكە ئۆز ئىنىگە ئۈرسە، قوتۇر بولۇر.",
    "ئوۋچى قانچە ھىلە بىلسە، ئېيىقمۇ شۇنچە يول بىلىدۇ.",
    "كېڭەشلىك ئىش بۇزۇلماس.",
    "بېغى بارنىڭ، تېغى بار.",
    "چىلانغا چۆل ياخشى، ياڭاققا كۆل.",
    // ... more sentences
  ];
  let totalMistakes = 0;
  let totalCharCount = 0;
  let totalWordCount = 0;
  let totalSentenceCount = sentences.length;
  let totalStartTime;
  let totalEndTime;
  let currentSentence = '';
  let typedSentences = []; // Array to store sentences that the user has typed
  let typedChars = '';
  let isFinished = false;

  const sentenceDisplay = document.getElementById('sentence-display');
  const typingArea = document.getElementById('typing-area');
  const errorMessage = document.getElementById('error-message');
  const resultDisplay = document.getElementById('result-display');
  const finishBtn = document.getElementById('finish-btn');
  const retryBtn = document.getElementById('retry-btn');
  const nextBtn = document.getElementById('next-btn');

  function startExercise() {
    if (sentences.length === 0) {
      finishExercise();
      return;
    }
    if (totalStartTime == null) {
      totalStartTime = new Date();
    }
    // Generate a random index based on the number of sentences left
    const randomIndex = Math.floor(Math.random() * sentences.length);
    // Remove the sentence at the random index and store it in currentSentence
    currentSentence = sentences.splice(randomIndex, 1)[0];
    sentenceDisplay.textContent = currentSentence;
    typingArea.value = '';
    typedChars = '';
    charCount = currentSentence.length;
    wordCount = currentSentence.trim().split(/\s+/).length;
    totalCharCount += charCount;
    totalWordCount += wordCount;
    isFinished = false;
    typingArea.classList.remove('error');
    errorMessage.style.visibility = 'hidden';
    resultDisplay.textContent = '';
    finishBtn.style.display = 'block';
    retryBtn.style.display = 'none';
    nextBtn.style.display = 'block';
  }

  function finishExercise() {
    totalEndTime = new Date();
    const totalTimeSpent = (totalEndTime - totalStartTime) / 1000;
    const totalSpeed = totalCharCount / totalTimeSpent;
    resultDisplay.innerHTML = `
      <style>
        table {
          width: 100%;
          border-collapse: collapse;
          direction: rtl; /* Right-to-left text alignment */
          text-align: right; /* Align text to the right */
        }
        th, td {
          padding: 8px;
          border: 1px solid #ddd; /* Light grey border */
        }
        th {
          background-color: #f2f2f2; /* Light grey background for headers */
        }
        td {
          background-color: #fff; /* White background for data cells */
        }
        tr:nth-child(even) {
          background-color: #f9f9f9; /* Zebra striping for rows */
        }
        span.typed-sentences {
          color: green; /* Green color for typed sentences */
          font-weight: bold; /* Make typed sentences bold */
        }
      </style>

      <table>
        <tr>
          <th>ئومۇمىي ۋاقىت</th>
          <td>${totalTimeSpent.toFixed(2)} سېكونت</td>
        </tr>
        <tr>
          <th>خاتا قېتىم سانى</th>
          <td>${totalMistakes} قېتىم</td>
        </tr>
        <tr>
          <th>ئوتتۇرىچە خەت بېسىش سۈرئىتى</th>
          <td>${totalSpeed.toFixed(2)} ھەرپ ھەر سېكۇنت</td>
        </tr>
        <tr>
          <th>جەمئىي ھەرپ سانى</th>
          <td>${totalCharCount} ھەرپ</td>
        </tr>
        <tr>
          <th>جەمئىي سۆز سانى</th>
          <td>${totalWordCount} سۆز</td>
        </tr>
        <tr>
          <th>جەمئىي جۈملە سانى</th>
          <td>${typedSentences.length} جۈملە</td>
        </tr>
        <tr>
          <th>توغرا باسقان جۈملىلەر</th>
          <td><span class="typed-sentences">${typedSentences.join('<br>')}</span></td>
        </tr>
      </table>
    `;

    finishBtn.style.display = 'none';
    retryBtn.style.display = 'block';
    nextBtn.style.display = 'none';
  }

  typingArea.addEventListener('input', function(e) {
    if (isFinished) return;

    const currentChar = currentSentence.charAt(typedChars.length);
    const lastChar = e.target.value.slice(-1);
    const isDeleteKey = lastChar === '' || e.inputType === 'deleteContentBackward';

    if (!isDeleteKey && e.target.value.endsWith(currentChar)) {
      typedChars += currentChar;
      e.target.value = typedChars;
      errorMessage.style.visibility = 'hidden';
      typingArea.classList.remove('error');
      if (typedChars.length === currentSentence.length) {
        typedSentences.push(currentSentence); // Add the current sentence to the typed sentences array
        displayNextSentence();
      }
    } else if (!isDeleteKey) {
      totalMistakes++;
      errorMessage.textContent = 'خاتا يېزىپ قويدىڭىز!';
      errorMessage.style.visibility = 'visible';
      typingArea.classList.add('error');
    }
  });

  function displayNextSentence() {
    startExercise();
  }

  finishBtn.addEventListener('click', function() {
    isFinished = true;
    finishExercise();
  });

  retryBtn.addEventListener('click', function() {
    typedSentences = []; // Reset the typed sentences array
    startExercise();
  });

  nextBtn.addEventListener('click', displayNextSentence);

  startExercise();
});
