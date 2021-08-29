const $ = document.querySelector.bind(document);
const volume = $('.volume')
const volumeRange = $('.volume input')
const video = $('video')
const btn = $('button')
const timestamp = $('.timestamp')
const progress = $('.control > input')
const fadeIcon = $('.container > i')
const container = $('.container')
//volume
function changeInput () {
    let volumeValue = volumeRange.value;
    video.volume = volumeValue*0.01;
    const volumeIcon = volume.querySelector('i');
    if (volumeValue > 50) {
        volumeIcon.className = `fa fa-volume-up`;
    }
    else {
        volumeIcon.className = `fa fa-volume-down`;
    }
}
volumeRange.addEventListener('input', changeInput)

//btn play/pause
btn.addEventListener('click', function() {
    const btnIcon = btn.querySelector('i');
    if (btnIcon.classList.contains('fa-play')) {
        btnIcon.className = `fa fa-pause`;
        video.play();
        container.classList.remove('pause')
        container.classList.add('play')
        fadeIcon.className = `fa fa-play`
    }
    else  {
        btnIcon.className = `fa fa-play`;
        video.pause();
        container.classList.remove('play')
        container.classList.add('pause')
        fadeIcon.className = `fa fa-pause`
    }
})

//progress chay khi video chay
video.addEventListener('timeupdate', function () {
    // console.log(video.currentTime*100/video.duration)
    let currentValue  = Math.round(video.currentTime*100000/video.duration);
    progress.value = currentValue;
    // console.log(progress.value, currentValue)
    let minute = Math.floor(video.currentTime/60);
    let second = Math.floor(video.currentTime%60);
    if (minute < 10) {
        minute = '0'+ minute;
    }

    if (second < 10) {
        second = '0'+ second;
    }
    
    timestamp.innerText = `${minute}:${second}`
    console.log(video.currentTime/60, video.currentTime%60)
})

//bam vao progress
progress.addEventListener('input', function() {
    let currentTime = progress.value*(video.duration)/100000
    video.currentTime = currentTime;
})

window.addEventListener('keydown', function(e) {
    //tang giam 10s
    if (e.keyCode == 37) {
        video.currentTime-=10;
    }
    if (e.keyCode == 39)
        video.currentTime+=10;

    //tang giam bang len, xuong
    if (e.keyCode == 38) {
        volumeRange.value = +volumeRange.value + 2;
        changeInput();
    }

    if (e.keyCode == 40) {
        volumeRange.value -= 2;
        changeInput();
    }

    //space
    if (e.keyCode == 32) {
        btn.click();
    }
})

//click vao video
video.addEventListener('click', function() {
    btn.click();
})



