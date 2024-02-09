<script setup>
import { ref } from 'vue'

const divDispositivos = ref(false)
const nombre = ref('')
const valor = ref()
const dispositivo = ref('sensor')

const emit = defineEmits(['nuevoDispositivo'])

const mostrar = () => {
    divDispositivos.value = true
}

const añadir = () => {
    emit('nuevoDispositivo', {
        [nombre.value]:{
            tipo: dispositivo.value, 
            valor: valor.value
        }
    })
    cancelar()
}

const cancelar = () => {
    divDispositivos.value = false
    nombre.value = ''
}
</script>

<template>
    <button class="button" @click="mostrar">Añadir un dispositivo</button>
    <div v-if="divDispositivos" class="formulario">
        <div @click="cancelar"></div>
        <div class="modal">
            <select v-model="dispositivo">
                <option value="sensor">Sensor</option>
                <option value="ejecutor">Ejecutor</option>
            </select>
            <input type="text" v-model="nombre" placeholder="Nombre del dispositivo">
            <input v-if="dispositivo === 'sensor'" type="number" v-model="valor" placeholder="Valor inicial">
            <div v-else>
                <p>Valor inicial:</p>
                <input type="checkbox" v-model="valor">
            </div>
            <button @click="añadir">Aceptar</button>
            <button @click="cancelar">Cancelar</button>
        </div>
    </div>
</template>

<style scoped>
.button {
    width: 100%;
    padding: 5px;
    background-color: #007bff;
    color: white;
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
}

.button:hover {
    background-color: #0056b3;
}

.formulario {
    display: flex;
    flex-flow: row;
    position: fixed;
    top: -45;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
}
</style>
