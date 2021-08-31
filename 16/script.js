const container = document.querySelector('.container');
const p = document.querySelector('p');

function animation() {
    p.innerText = 'Hít vào';
    container.className = `container grow`;
    setTimeout(function() {
        p.innerText = 'Giữ hơi';
    }, 3000)
    setTimeout(function() {
        p.innerText = 'Thở ra';
        container.className = `container shrink`;
    }, 4500)
}

animation();

// setInterval(function() {
//     p.innerText = 'Hít vào';
//     container.className = `container grow`;
//     setTimeout(function() {
//         p.innerText = 'Giữ hơi';
//         setTimeout(function() {
//             p.innerText = 'Thở ra';
//             container.className = `container shrink`;
//         }, 1500)
//     }, 3000)

// }, 7500)

setInterval(animation, 7500)