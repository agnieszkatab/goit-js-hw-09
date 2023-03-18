export const fetchCountries = async (name) => {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fields=name.official,capital,population,flag.svg,languages`)
        const countries = await response.json();
        console.log(countries);
    } catch (error) {
        console.log(error.message)
    }
}
