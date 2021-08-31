const $ = document.querySelector.bind(document);
const parts = document.querySelectorAll('.part');
const wrongEl = $('.wrong');
const wordEl = $('.word');
const questionEl = $('.question');
const positionEl = $('.text');
const resultBtn = $('button');
const wrongSpan = $('.wrong span');
const resultContainer = $('.result-container');
// console.log(parts, wrong, word, question, position)

const positions = ['Đáp Ứng', 'Thường Tại', 'Quý Nhân', 'Tần', 'Phi', 'Quý Phi', 'Hoàng Quý Phi', 'Hoàng Hậu'];
const questions = ['Một ngày làm nô, cả đời ...',
                 'Thần thiếp là Thủy Linh Lung, là ... do Dung cô cô thân phong',
                  'Hoàn tần nương nương, món bánh trúc đào này là do ĐÍCH THÂN ... làm đó ạ',
                  'Nếu tỉ tỉ ..., chắc chắn tỉ tỉ sẽ tin thần thiếp',
                '... không thể phế hậu',
                'Lá phong năm nay không được đỏ, ban ...',
                '... không bằng dưỡng mẫu']
const answers = ['hatien',
                'nico',
                'danhhaitephi',
                'consong',
                'olanalasu',
                'nhattruonghong',
                'sinhmau']

const local = window.localStorage;
let i;
let wrong = [];
let correct = [];
let correctLetterNumber = 0;
let wrongTimes = 0;

//get local 
if (local.getItem('i')) {
    i = +local.getItem('i');
}
else {
    i = 0;
}
function init() {
    //update question
    questionEl.innerText = `${questions[i]}`;

    //update position
    positionEl.innerText = `Phong vị hiện tại của bạn là ${positions[i]}`;


    //update number of letter
    for (let j = 0; j<answers[i].length; j++) {
        wordEl.appendChild(document.createElement('span'));
    }
}

//update wrong
function updateWrong() {
    wrongSpan.innerText = wrong.join(' ');
}

//update word
function updateWord(letter) {
    let ans = answers[i];
    const spans = document.querySelectorAll('.word span');
    for (let c = 0; c<ans.length; c++) {
        if (ans[c] == letter && !correct.includes(c)) {
            spans[c].innerText = letter;
            correctLetterNumber++;
            correct.push(c);
        }
    }
}

//update svg
function updateSvg() {
    for (let j = 0; j<wrongTimes; j++) {
        parts[j].style.visibility = `visible`;
    }
}

//set local
function setLocal() {
    local.setItem('i', `${i}`)
}

function notice(message) {
    resultContainer.querySelector('h2').innerText = message;
    resultContainer.classList.toggle('active');
}

//add listener
window.addEventListener('keydown', function(e) {
    console.log(e.keyCode, e.key)
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        if (answers[i].includes(e.key)) {
            updateWord(e.key);
        }
        else {
            wrong.push(e.key);
            wrongTimes++;
            updateSvg();
            updateWrong();
        }
        if (wrong.length == 6) {
            notice('Chúc mừng, bạn đã được ban vào lãnh cung');
        }
        if (correctLetterNumber >= answers[i].length) {
            notice('Chúc mừng, bạn đã được tấn phong lên ' + positions[i+1]);
            i++;
            setLocal();
        }
    }
})

resultBtn.addEventListener('click', function() {
    resultContainer.classList.toggle('active');
    wrong = [];
    correct = [];
    correctLetterNumber = 0;
    wrongTimes = 0;
    for (let j = 0; j<parts.length; j++) {
        parts[j].style.visibility = `hidden`;
    }
    updateWrong();
    wordEl.innerHTML = ``;
    init();
})


init();