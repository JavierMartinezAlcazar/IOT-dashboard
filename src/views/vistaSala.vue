<script setup>
  import añadirSala from '../components/añadirSala.vue';
  import salaPrincipal from '../components/salaPrincipal.vue';
</script>

<template>
  <div>
    <h1>Dashboard</h1>
    <añadirSala />
    <salaPrincipal />
  </div>
</template>

<style scoped>
  h1 {
    text-align: center;
    font-style: italic;
  }
</style>