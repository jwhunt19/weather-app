let address = 'boston'

// HTML element selectors
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector('#message-one')
const msg2 = document.querySelector('#message-two')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const address = search.value

  msg1.textContent = 'Loading...'
  msg2.textContent = ''

  fetch(`/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        msg1.textContent = data.error;
      } else {
        msg1.textContent = data.location;
        msg2.textContent = data.forecast;
      }
    })
  });
})