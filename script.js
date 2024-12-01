// script.js

// وظيفة مزج الألوان
function mixColors(color1, color2) {
    let r1 = parseInt(color1.substring(1, 3), 16);
    let g1 = parseInt(color1.substring(3, 5), 16);
    let b1 = parseInt(color1.substring(5, 7), 16);

    let r2 = parseInt(color2.substring(1, 3), 16);
    let g2 = parseInt(color2.substring(3, 5), 16);
    let b2 = parseInt(color2.substring(5, 7), 16);

    let r = Math.round((r1 + r2) / 2);
    let g = Math.round((g1 + g2) / 2);
    let b = Math.round((b1 + b2) / 2);

    return `rgb(${r}, ${g}, ${b})`;
}

// تطبيق التأثيرات عند الضغط على زر المزج
document.getElementById("mixButton").addEventListener("click", function() {
    let color1 = document.getElementById("color1").value;
    let color2 = document.getElementById("color2").value;

    // مزج الألوان
    let mixedColor = mixColors(color1, color2);

    // تغيير لون النتيجة
    let resultBox = document.getElementById("resultBox");
    resultBox.style.backgroundColor = mixedColor;

    // إضافة تأثير حركة على النتيجة
    resultBox.style.transform = "scale(1.2)";
    setTimeout(() => {
        resultBox.style.transform = "scale(1)";
    }, 500);

    // تشغيل الصوت
    let sound = document.getElementById("sound");
    sound.play();
});

// script.js

let currentQuestion = 0;
let score = 0;
const questions = [
    { question: "ما هو ناتج جمع 5 + 3؟", answer: 8 },
    { question: "ما هو ناتج جمع 7 + 6؟", answer: 13 },
    { question: "ما هو ناتج جمع 10 + 4؟", answer: 14 },
    { question: "ما هو ناتج جمع 3 + 9؟", answer: 12 }
];

function loadQuestion() {
    const questionElement = document.getElementById('question');
    const feedbackElement = document.getElementById('feedback');
    const options = document.querySelectorAll('.option');
    const scoreElement = document.getElementById('score');

    // الحصول على السؤال الحالي
    const current = questions[currentQuestion];
    questionElement.textContent = current.question;

    // إعادة تعيين الملاحظات
    feedbackElement.textContent = '';

    // تقديم الخيارات العشوائية
    const optionsArray = [current.answer, current.answer + 1, current.answer - 1, current.answer + 2];
    shuffle(optionsArray);

    options.forEach((button, index) => {
        button.textContent = optionsArray[index];
        button.onclick = () => checkAnswer(optionsArray[index]);
    });

    // تحديث النتيجة
    scoreElement.textContent = `النتيجة: ${score}`;
}

// دالة لخلط الخيارات
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// دالة للتحقق من الإجابة
function checkAnswer(selectedAnswer) {
    const current = questions[currentQuestion];
    const feedbackElement = document.getElementById('feedback');

    if (selectedAnswer === current.answer) {
        feedbackElement.textContent = "إجابة صحيحة! ممتاز!";
        feedbackElement.style.color = "green";
        score++;
    } else {
        feedbackElement.textContent = "إجابة خاطئة! حاول مرة أخرى.";
        feedbackElement.style.color = "red";
    }

    // إخفاء زر "السؤال التالي"
    document.getElementById('next-btn').style.display = 'block';
}

// دالة للانتقال إلى السؤال التالي
function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
        document.getElementById('next-btn').style.display = 'none';  // إخفاء زر "السؤال التالي"
    } else {
        endGame();
    }
}

// دالة لإنهاء اللعبة
function endGame() {
    const feedbackElement = document.getElementById('feedback');
    feedbackElement.textContent = `لقد أكملت اللعبة! نتيجتك هي: ${score} من ${questions.length}`;
    feedbackElement.style.color = "black";

    // إخفاء السؤال والخيارات
    document.getElementById('question').style.display = 'none';
    document.querySelectorAll('.option').forEach(option => option.style.display = 'none');

    // إظهار زر إعادة البدء
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('end-btn').style.display = 'none';
    document.getElementById('restart-btn').style.display = 'inline-block';
}

// دالة لإعادة بدء اللعبة
function restartGame() {
    currentQuestion = 0;
    score = 0;
    loadQuestion();

    // إظهار السؤال والخيارات
    document.getElementById('question').style.display = 'block';
    document.querySelectorAll('.option').forEach(option => option.style.display = 'inline-block');

    // إخفاء زر إعادة البدء
    document.getElementById('restart-btn').style.display = 'none';
    document.getElementById('next-btn').style.display = 'inline-block';
    document.getElementById('end-btn').style.display = 'inline-block';
}

// تحميل السؤال الأول عند تحميل الصفحة
loadQuestion();
