<script setup>
  import { ref } from 'vue'
  import { saveData } from '@/crudFirebase'

  const añadir = ref(false)
  const nombre = ref('')

  const mostrar = () => {
    añadir.value = true
  }
  // Añadir doc
  const guardarDoc = async () => {
    try {
      await saveData('IOT', { nombre: nombre.value });
      cancelar()
    } catch (error) {
      console.error('Error al guardar el documento:', error);
    }
  }

  const cancelar = () => {
    nombre.value = ''
    añadir.value = false
  }
</script>

<template>
  <div class="container">
    <div class="sala">
      <button @click="mostrar" class="boton">Añadir una nueva sala</button>
      <div v-if="añadir" class="añadir">
        <input type="text" v-model="nombre" placeholder="Nombre de la sala...">
        <div class="botones">
          <button @click="guardarDoc()">Aceptar</button>
          <button @click="cancelar()">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .container {
    width: 30%;
    margin: auto;
    text-align: center;
    border: 1px solid black;
    box-shadow: 3px 3px 3px #777;
  }

  .sala {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    margin-top: 20px;
  }

  .añadir {
    margin-top: 10px;
  }

  .botones {
    margin-top: 10px;
  }

  .botones button {
    padding: 10px 20px;
    margin: 0 5px;
    border: none;
    border-radius: 5px;
    background-color: black;
    color: white;
    cursor: pointer;
  }

  button:hover {
    background-color: #777;
  }

  input[type="text"] {
    padding: 8px;
    text-align: center;
    border-radius: 5px;
    border: 1px solid black;
  }

  .boton {
    width: 60%;
    padding: 5px;
    background-color: #007bff;
    color: white;
    border-radius: 3px;
    text-align: center;
    cursor: pointer;
  }

  .boton:hover {
    background-color: #0056b3;
  }
</style>
