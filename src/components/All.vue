<script setup>

import {ref, onMounted, computed} from 'vue'
import { fetchCountries } from "@/api/countries.js";
const loaded = ref(0)
const countrySearched = ref("")
const region = ref("");

onMounted(()=>{
    loaded.value = 0;
    
})
const countries = ref([]);  // Creamos un vector reactivo para los países
onMounted(async () => {
    countries.value = await fetchCountries();  // Llamamos a la función y guardamos los datos
    countries.value.sort((a,b)=>a.name.common.localeCompare(b.name.common));
    loaded.value = 1;
    emits('countries',countries)
});
const countriesFiltered = computed(()=>{
    let filtered = countries.value;

    if (countrySearched.value){
        filtered = filtered.filter(country=>
        country.name.common.toLowerCase().includes(countrySearched.value.toLowerCase())

        )
    }
    // Filtro por región
    if (region.value) {
        filtered = filtered.filter(country =>
            country.region === region.value
        );
    }

    return filtered;

    // return countries.value.filter(country => country.name.common.toLowerCase().includes(countrySearched.value.toLowerCase()))
})

// const filterByRegion = () =>{
//     countriesFiltered.value.filter(country=>country.region == region.value)
//     console.log(countriesFiltered.value)
// }





const emits = defineEmits(['selected', 'countries'])


</script>

<template>
<div v-if="!loaded" class="spinner-border text-light loading" role="status">
    <span class="sr-only">Loading...</span>
</div>
<div class="container --bg-very-dark h-100 --min-width-100 --m-0 --p-0">
    <div class="row --px-10 align-content-center --m-0 --h-10 div-filters">
        <div class="col-md-9" id="cont-buscador">
            <div class="text-light d-flex align-items-center bg-dark input-country-div --shadow-dn">
                <i class="fa-solid fa-magnifying-glass px-3"></i>
                <input v-model="countrySearched"
                    type="text"
                    class="my-2 --w-80 font-size-8 --sm --border-none text-light input-country"
                    placeholder="Search for a country">
            </div>
        </div>
        <div class="col-md-3 text-light">
            <select v-model="region" class="form-select form-select-sm bg-dark text-light --border-none region-select">
                <option selected value="">Filter by Region</option>
                <option value="Africa">Africa</option>
                <option value="Americas">America</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
            </select>
            
        </div>
    </div>
    <div class="row --min-width-80 justify-content-center --h-90 mx-3 cards ">
        <div v-for="country in countriesFiltered" @click="$emit('selected',country)" class="--col-19 text-light card bg-dark flag-card m-4 --max-height-55">
            <img class="card-img-top" :src="country.flags.png" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">{{country.name.common}}</h5>
                <p class="card-text --m-0 py-1" v-if="country.population"><strong>Population: </strong>{{country.population}}</p>
                <p class="card-text --m-0" v-if="country.region"><strong>Region: </strong>{{country.region}}</p>
                <p class="card-text --m-0 py-1" v-if="country.capital"><strong>Capital: </strong>{{country.capital[0]}}</p>
            </div>
        </div>
    </div>

</div>

</template>

