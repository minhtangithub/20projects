const $ = document.querySelector.bind(document);
const currency1 = $('.currency-one');
const currency2 = $('.currency-two');
const number1 = $('.currency-one + input');
const number2 = $('.currency-two + input');
const swap = $('button');
const rateEl = $('span');

console.log(currency2, currency1, number1, number2, swap, rateEl)
update();

function update() {
    const currency1Value = currency1.value;
    const currency2Value = currency2.value;
    
    fetch (`https://api.exchangerate-api.com/v4/latest/${currency1Value}`)
    .then ( resolve => resolve.json() )
    .then ( data => {
        const rate = data.rates[currency2Value];
        rateEl.innerText = `1 ${currency1Value} = ${rate+currency2Value}`;
        number2.value = (rate * number1.value).toFixed(2);  
    });
    console.log(rateEl.innerText)
}

currency1.addEventListener('change', update);
currency2.addEventListener('change', update);
number1.addEventListener('input', update);
number2.addEventListener('input', update);
swap.addEventListener('click', function() {
    const temp = currency1.value;
    currency1.value = currency2.value;
    currency2.value = temp;
    update();
})