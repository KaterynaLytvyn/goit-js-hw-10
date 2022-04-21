
export function fetchCountries(name){
//    console.log('searchQuery:', name)
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
        
}