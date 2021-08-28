const seats = document.querySelectorAll('.seat:not(.occupied');
const text = document.querySelector('p');

const local = window.localStorage;
const selectedSeats = JSON.parse(local.getItem('selected')) ?? [];
// console.log(selectedSeats)

//cap nhat du lieu local len
if (selectedSeats.length > 0) {
    selectedSeats.forEach(function(el) {
        seats[el].classList.add('selected')
    })
}
text.innerHTML = `Bạn đã đặt <span>${selectedSeats.length}</span> vé, cần thanh toán <span>${+selectedSeats.length*35}K</span>`

//bat event
seats.forEach(function (seat, i) {
    seat.addEventListener('click', function(e) {
    if (e.target.classList.contains('seat')) {
        //reset lai mang de tranh trung
        selectedSeats.splice(0, selectedSeats.length);

        e.target.classList.toggle('selected');

        //lay du lieu dua vao local
        seats.forEach(function(el, i) {
            if (el.classList.contains('selected'))
                selectedSeats.push(i)
        })
        local.setItem('selected', JSON.stringify(selectedSeats))

        //thay doi text
        text.innerHTML = `Bạn đã đặt <span>${selectedSeats.length}</span> vé, cần thanh toán <span>${+selectedSeats.length*35}K</span>`
    }
})
})

