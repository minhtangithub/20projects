const $ = document.querySelector.bind(document);
const playBtn = $('.play');
const playIcon = $('.play i');
const nextBtn = $('.next');
const prevBtn = $('.prev');
const imgContainer = $('.img-container');
const info = $('.info');
const audioEl = $('audio');
const titleEl = $('h4');
const imgEl = $('img');
const progressEl = $('.progress');
const progressContainer = $('.progress-container');
let progressWidth = $('.progress-container').clientWidth;
// console.log(progressWidth)

// console.log(prevBtn, audioEl)
audioEl.volume = 0.3;
const data = [
    {
        name: 'ukulele',
        audio: './assets/mp3/ukulele.mp3',
        img: './assets/img/ukulele.jpg'
    },
    {
        name: 'hey',
        audio: './assets/mp3/hey.mp3',
        img: './assets/img/hey.jpg'
    },
    {
        name: 'summer',
        audio: './assets/mp3/summer.mp3',
        img: './assets/img/summer.jpg'
    }
]

let i = 0;
function display() {
    const {name, audio, img} = data[i];
    titleEl.innerText = name;
    audioEl.src = audio;
    imgEl.src = img;
}

playBtn.addEventListener('click', function() {
    if (playIcon.classList.contains('fa-play')) {
        audioEl.play();
    }
    else {
        audioEl.pause();
    }
})

audioEl.addEventListener('ended', function() {
    i++;
    if (i > 2) {
        i = 0;
    }
    display();
    audioEl.play();
});

audioEl.addEventListener('play', function() {
    playIcon.className = `fas fa-pause`;
    if (!imgContainer.classList.contains('active')) {
        imgContainer.classList.add('active');
        info.classList.add('active');
    }
})

audioEl.addEventListener('pause', function() {
    playIcon.className = `fas fa-play`;
    imgContainer.classList.remove('active');
    info.classList.remove('active');
})

nextBtn.addEventListener('click', function() {
    i++;
    if (i > 2) {
        i = 0;
    }
    display();
    audioEl.play();
});

prevBtn.addEventListener('click', function() {
    i--;
    if (i < 0) {
        i = 2;
    }
    display();
    audioEl.play();
});

audioEl.addEventListener('timeupdate', function() {
    progressEl.style.width = (audioEl.currentTime/audioEl.duration)*progressWidth + 'px';
})

progressContainer.addEventListener('click', function(e) {
    const clickX = e.offsetX;
    audioEl.currentTime = (clickX/progressWidth) * audioEl.duration;
})

display();
// audioEl.play();