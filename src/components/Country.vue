<script setup>
import {ref, computed} from 'vue'
const props = defineProps(['country','countries'])
const back = ref(null);  // Creamos un vector reactivo para los países
const emits = defineEmits(['back'])

const native = (country) => {
    if (country.name.nativeName){
        const nativeNames = Object.keys(country.name.nativeName)[0]    
        return country.name.nativeName[nativeNames].official
    }
    else{
        return country.name.official
    }
    
}



const getCountryNameByCode = (cca3)=>{
    return props.countries.value.find(c=>c.cca3==cca3).name.common
  }



</script>
<template>
    <div class="container --bg-very-dark --min-width-100 --m-0 --p-0">
    <div class="row --px-10 align-content-center --m-0 --h-10 div-filters">
        <div class="col-md-9" id="cont-buscador">
            <button class="btn-back bg-dark --shadow-dn" @click="$emit('back',back)"><i class="fa-solid fa-arrow-left me-2"></i>Back</button>
        </div>
    </div>
    <!-- <div class="row --min-width-80 justify-content-center --h-90 mx-3 cards ">
        <div class="--col-19 text-light card mb-3 bg-dark flag-card m-4 --max-height-55">
            <img class="card-img-top" :src="country.flags.png" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">{{country.name.common}}</h5>
                <p class="card-text --m-0 py-1" ><strong>Population: </strong>{{country.population}}</p>
                <p class="card-text --m-0" v-if="country.region"><strong>Region: </strong>{{country.region}}</p>
                <p class="card-text --m-0 py-1" v-if="country.capital"><strong>Capital: </strong>{{country.capital[0]}}</p>
            </div>
        </div>
    </div> -->
    <div class="card --min-width-100 mt-4 --bg-very-dark country-card --h-80" style="max-width: 540px;">
        <div class="row no-gutters">
            <div class="col-md-4 country-card-img-cont">
                <img :src="country.flags.png" class="card-img" alt="...">
            </div>
            <div class="col-md-8 w-50">
                <div class="card-body --p-0 m-4">
                    <h5 class="card-title text-light mb-4">{{country.name.common}}</h5>
                    <div class="d-flex --tiny">
                        <div class=" w-50">
                            <p class="card-text --m-0 py-1" ><strong>Native Name: </strong>{{native(country)}}</p>
                            <p class="card-text --m-0 py-1" ><strong>Population: </strong>{{country.population?country.population: "N/A"}}</p>
                            <p class="card-text --m-0 py-1" ><strong>Region: </strong>{{country.region?country.region:"N/A"}}</p>
                            <p class="card-text --m-0 py-1" ><strong>Sub Region: </strong>{{country.subregion?country.subregion:"N/A"}}</p>
                            <p class="card-text --m-0 py-1" ><strong>Capital: </strong>{{country.capital?country.capital[0]:"N/A"}}</p>
                        </div>
                        <div class="w-50">
                            <p class="card-text --m-0 py-1" ><strong>Top Level Domain: </strong>{{country.tld?country.tld[0]:"N/A"}}</p>
                            <p class="card-text --m-0 py-1" ><strong>Currencies: </strong>{{ country.currencies ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ') : "N/A" }}</p>
                            <p class="card-text --m-0 py-1" ><strong>Languages: </strong>    {{ country.languages ? Object.values(country.languages).join(', ') : "N/A" }}</p>
                        </div>
                    </div>
                    <!-- <div class="text-light d-flex">Border countries: <span class="border" v-for="bor in country.borders">    {{ countries.find((country)=>country.cca3==bor)?.name.common }} -->
                    <div class="text-light d-flex borders" v-if="country.borders"><strong class="border-title">Border countries: </strong><span class="tabs"><span class="tab bg-dark" v-for="bor in country.borders">    {{ getCountryNameByCode(bor) }}
                    </span></span></div>

                    <!-- <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p> -->
                </div>
            </div>
        </div>
    </div>
<!-- <div v-for="pais in countries">{{ console.log(pais) }}</div> -->
</div>
</template>