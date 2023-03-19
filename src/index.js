import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix'


const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");



const searchChange = async () => {
    const searchItem = searchBox.value.trim();

    if (!searchItem) {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
        return;
    }

    fetchCountries(searchItem)
        .then(countries => {
            if (countries.length > 10) {
                Notify.info(
                    'Too many matches found. Please enter a more specific name.'
                )
            } else if (countries.length > 1) {
                makeCountryList(countries);
            } else if (countries.length === 1) {
                makeCountryInfo(countries[0]);
            } else {
                Notify.failure(
                    'Oops, there is no country with that name'
                )
            }
        })
}


searchBox.addEventListener('input', debounce(searchChange, DEBOUNCE_DELAY));

const makeCountryList = country => {
    const countryListHTML = country
        .map(
            c => `<li><img src="${c.flags.svg}" alt="flag" width = "45" height = "30">${c.name.official}</li>`
        )
        .join("");
    countryList.innerHTML = countryListHTML
    countryInfo.innerHTML = ''
}


const makeCountryInfo = country => {
    const { flags, name, capital, population, languages } = country
    const languageName = Object.values(languages).join(',');

    const countryInfoHTML = `<img src="${flags.svg}" alt="flag" width = "90" height = "60">
    <h1>${name.official}</h1>
    <p>Capital: ${capital}</p>
    <p>Population: ${population}</p>
    <p>Languages: ${languageName}</p>`;

    countryList.innerHTML = '';
    countryInfo.innerHTML = countryInfoHTML;
}

