'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  evt.preventDefault();
  // TODO: get the fortune and show it in the #fortune-text div
  fetch('/fortune')
    .then((res) => res.text())  // res is a parameter 
    .then((responseData) => document.querySelector('#fortune-text').innerHTML = responseData
  );
}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();
  
  const zipCode = document.querySelector('#zipcode-field').value;
  const url = `/weather.json?zipcode=${zipCode}`;     // zipcode comes from name='zipcode' in index.html
  // TODO: request weather with that URL and show the forecast in #weather-info
  fetch(url)
   .then((response) => response.json())
   .then((jasonData) => {
      document.querySelector('#weather-info').innerHTML = jasonData.forecast;
    });
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS


function orderMelons(evt) {
  evt.preventDefault();
  const formInputs = {
    melon_type: document.querySelector('#melon-type-field').value,
    qty: document.querySelector('#qty-field').value,
  };
  fetch('/order-melons.json', {
    method: 'POST',
    body: JSON.stringify(formInputs),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then( results => {
      if (results.code === 'OK') {
        document.querySelector('#order-status').classList.remove('order-error');
        document.querySelector('#order-status').innerHTML = `<p>${results.msg}</p>`;
      } else {
        document.querySelector('#order-status').classList.add('order-error');
        document.querySelector('#order-status').innerHTML = `<p><b>${results.msg}</b></p>`;
      }
    });
}

document.querySelector('#order-form').addEventListener('submit', orderMelons);


document.querySelector('#get-dog-image').addEventListener('click', () => {
  fetch('https://dog.ceo/api/breeds/image/random')
   .then((response) => response.json())
   .then(result => {
    const imageUrl = result.message;
    document
      .querySelector('#dog-image')
      .insertAdjacentHTML('beforeend', `<div><img src=${imageUrl}></div>`);
     
   });
});