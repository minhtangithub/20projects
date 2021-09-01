const $ = document.querySelector.bind(document);
const form = $('form');
const input = $('input');
const randomBtn = $('.tool-bar > button');
const mealItemEls = document.querySelectorAll('.meal');
const singleMeal = $('.single-meal');
const mealsEl = $('.meals');
const resultEl = $('.result-heading h2');

form.addEventListener('submit', function(e) {
    e.preventDefault(); //tranh reload lai trang

    singleMeal.innerHTML = ``;
    let term = input.value;

    resultEl.innerText = `result for '${term}'`;

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    .then (function(resolve) {
        return resolve.json();
    })
    .then (function (data) {
        console.log(data)
        const {meals} = data;
        mealsEl.innerHTML = meals.map(function (item) {
            return `
            <div class="meal">
            <img src="${item.strMealThumb}">
            <div class="meal-info" id="${item.idMeal}">
                <h3>${item.strMeal}</h3>
            </div>
            </div>           
            `
        })
        .join(' ');
    })
})

function addMealToDOM (meal) {


    singleMeal.innerHTML = `
    <div class="single-meal__container">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}">
    <div class="single-meal__info">
        <p>${meal.strCategory}</p>
        <p>${meal.strArea}</p>
    </div>
    <div class="description">
        <p>${meal.strInstructions}</p>
        <h2>ingredients</h2>
        <ul>
        </ul>
    </div>
    </div>
    `
    const ul = $('ul');
    const ingredients = [];
    let i = 1;
    // console.log(meal[`strIngredient${i}`])
    while (meal[`strIngredient${i}`]) {
        // console.log(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        i++;
    }

    ul.innerHTML = ingredients.map(function(item) {
        return `<li>${item}</li>`
    }).join(' ');

    console.log(ingredients)
}

randomBtn.addEventListener('click', function () {
    resultEl.innerText = ``;
    mealsEl.innerHTML = ``;

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then (function (resolve) {
        return resolve.json();
    })
    .then (function(data) {
        const meal = data.meals[0];
        addMealToDOM(meal);
    })
})

mealsEl.addEventListener('click' , function(e) {
    if (e.target.classList.contains('meal-info')) {
        const id = e.target.id;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then (function(resolve) {
            return resolve.json();
        })
        .then (function (data) {
            console.log(data);
            const {meals} = data;
            addMealToDOM(meals[0]);
        })
    }

})
console.log(randomBtn)

