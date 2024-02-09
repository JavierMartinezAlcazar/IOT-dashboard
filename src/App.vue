<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>

<style>
  .salaDispositivo {
    width: 100%;
    padding: 10px;
    box-shadow: 5px 7px 10px black;
  }

  .salaDispositivo:hover {
    background-color: aliceblue;
  }

  header {
    background-color: black;
    color: white;
    padding: 10px;
  }

  .container {
    width: 90%;
    margin: 0 auto;
  }

  nav {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .link {
    color: white;
    text-decoration: none;
    padding: 10px 20px;
    margin: 0 10px;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;
  }

  .link:hover {
    background-color: #777;
  }
</style>
