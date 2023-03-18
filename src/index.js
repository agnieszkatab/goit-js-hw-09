import './css/styles.css';

const DEBOUNCE_DELAY = 300;

import { fetchCountries } from './fetchCountries.js';

const searchBox = document.querySelector('[search-box]')
const countryList = document.querySelector('.country-list')
const countryInfo = document.querySelector('.country-info')