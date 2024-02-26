
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message = document.querySelector('#message-1')

message.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    message.textContent = 'Loading...'

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            message.textContent = data.temperature
            console.log(data)
        })
    })
})