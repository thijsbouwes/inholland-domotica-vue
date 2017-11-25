<template>
  <div id="app">
    <navigation></navigation>
    <sidebar></sidebar>

    <div class="row">
        <router-view/>
    </div>

  </div>
</template>

<script>

import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';

export default {
	components: { Navigation, Sidebar },
  	name: 'app'
}

</script>

<style src="./assets/scss/style.scss" lang="scss"></style>
