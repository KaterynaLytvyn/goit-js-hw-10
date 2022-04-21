var debounce = require('lodash.debounce');
import './css/styles.css';
import {fetchCountries} from './fetchCountries.js';
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-aio-3.2.5.min.js"

const DEBOUNCE_DELAY = 300;


const searchQuery = document.querySelector('#search-box')
const countryListElement = document.querySelector('.country-list')
const countryInfoElement = document.querySelector('.country-info')

searchQuery.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY))

function onInput() {
    clearCountries();
    
    if (searchQuery.value) {
        fetchCountries(searchQuery.value.trim())
        .then(response => {return response.json()})
        .then(data => 
            {
                console.log(data);
                if(data.length>10) {
                    Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.', {timeout: 4000});
                }
                else {
                    renderCountries(data)
                }
            })
            .catch(()=>{Notiflix.Notify.failure(`Oops, there is no country with that name`, {timeout: 4000})})
    }
}

function renderCountries(countries) {
 //   console.log(countries)

    if (countries.length == 1) {
        countryInfoElement.insertAdjacentHTML('beforeend', `<img src=${countries[0].flags.svg}> ${countries[0].name.official}<p><b>Capital: </b>${countries[0].capital}<p><b>Population: </b>${countries[0].population}<p><b>Languages: </b>${Object.values(countries[0].languages)}`)
    }
    else {
        for (const country of countries){
//            console.log(country.name.official)
            countryListElement.insertAdjacentHTML('beforeend', `<li><img src=${country.flags.svg}>${country.name.official}</li>`)
        }
    }   
}

function clearCountries() {
    countryListElement.innerHTML='';
    countryInfoElement.innerHTML='';
}



