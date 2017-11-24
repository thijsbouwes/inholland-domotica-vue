<template>
  <div id="app">
    <navigation></navigation>
    <sidebar></sidebar>

    <router-view/>

    <div class="row">
    	<div class="col s12 m6 l3">
            <lamps></lamps>
        </div>

    	<div class="col s12 m6 l3">
            <windows></windows> 
      </div>

    	<div class="col s12 m6 l3">are</div>

    	<div class="col s12 m6 l3">you</div>
    </div>



  </div>
</template>

<script>

import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import Lamps from './components/Lamps';
import Windows from './components/Windows';

export default {
	components: { Navigation, Sidebar, Lamps, Windows },
  	name: 'app'
}

</script>

<style src="./assets/scss/style.scss" lang="scss"></style>
