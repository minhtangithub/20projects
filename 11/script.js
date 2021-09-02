const container = document.querySelector('.container');
const input = document.querySelector('input');
const loader = document.querySelector('.loader');

let limit=5;
let page=1;

async function getData() {
    const resovle = await fetch(  `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);

    const data = await resovle.json();
    return data;
}

async function display() {
    const posts = await getData();
    posts.forEach(function(item) {
        const post = document.createElement('div');
        post.className = "post";
        post.innerHTML = `
        <span>${item.id}</span>
        <div class="info">
            <h2 class="title">${item.title}</h2>
            <p class="body">${item.body}</p>
        </div>
        `
        container.appendChild(post);
    })
}

display();

input.addEventListener('input', function() {
    const term = input.value;
    const posts = document.querySelectorAll('.post');

    posts.forEach(function(item) {
        const titleValue = item.querySelector('.title').innerText;
        const bodyValue = item.querySelector('.body').innerText;
        if (titleValue.includes(term) || bodyValue.includes(term)) {
            item.style.display = 'flex';
        }
        else {
            item.style.display = 'none';
        }

    })

})
window.addEventListener('scroll', function(e) {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollHeight - clientHeight - scrollTop <= 5) {
        loader.classList.add('active');
        setTimeout(function () {
            loader.classList.remove('active');
            setTimeout(function() {
                page++;
                display();
            }, 300)
        }, 1000)
    }
})