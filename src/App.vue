<script setup>
import {ref, onUnmounted, onMounted} from 'vue'
import All from '@/components/All.vue'
import Country from '@/components/Country.vue'
const selectedCountry = ref(null)

const showCountry = (country)=>{
  // const nativeNameObj = country.name.nativeName[Object.keys(country.name.nativeName)[0]];
  selectedCountry.value = country
}
const showAll = (back) =>{selectedCountry.value = back}
const disabled = () => {alert('Functionality disabled')}
</script>

<template>
<div class="w-100 overflow-hidden">
  <header class="header">
    
    <nav class="navbar w-100 bg-dark --shadow-dn py-3 h-100">
      <strong class="text-light p-2 ps-5">Where in the world?</strong>
      <a class="text-light text-decoration-none nav-link pe-5" @click='disabled' id="light-mode" href="#">
        <i class="fa-solid fa-moon pe-2"> </i><span>Dark mode</span></a>
    </nav>

  </header>
  <main class="main --bg-very-dark --m-0 --p-0">
    <div class="container h-100 --min-width-100 --m-0 --p-0">

    <template v-if="!selectedCountry">
      <All @selected="showCountry" @countries="countries = $event"/>
    </template>

    <template v-else>
      <Country @back="showAll" :country="selectedCountry" :countries="countries"/>
    </template>
  </div>

  </main>
  <footer class="footer bg-dark --tiny">
    <p>&copy; 2025 Larrahona, Andrés. Developed with Vue.js, Bootstrap and Rest Countries API.</p>

  </footer> 
</div>



</template>

<style scoped>

</style>
