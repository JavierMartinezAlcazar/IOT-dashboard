<script setup>
import { ref } from 'vue'
import { getDataChanged_collection, updateData, deleteField, deleteData } from '@/crudFirebase'
import añadirDispositivo from './añadirDispositivo.vue'

const collection = 'IOT'
const datos = ref([])
// Obtener datos
getDataChanged_collection('IOT', (el) => {
    datos.value = el.docs.map(doc => ({ 
      id: doc.id, 
      data: doc.data(), 
      editando: false
    }))
})
// Añadir campo dispositivo (emit) -> añadirDispositivo.vue
const añadir = async (obj, id) => {
    try {
        await updateData(id, collection, obj)
    } catch (error) {
        console.error('Error al actualizar el documento:', error)
    }
}
// Eliminar doc
const eliminarDoc = async (id) => {
    try {
        await deleteData(id, collection);
    } catch (error) {
        console.error('Error al borrar el documento:', error)
    }
}
// Eliminar dispositivo
const eliminarDatos = async (id, campo) => {
    try {
        await deleteField(collection, id, campo);
    } catch (error) {
        console.error('Error al borrar el campo:', error)
    }
}
// Cambiar nombre doc
const cambiarNombre = async (nuevoNombre, id) => {
    try {
        await updateData(id, collection, { nombre: nuevoNombre })
    } catch (error) {
        console.error('Error al modificar el nombre:', error)
    }
}

const editar = (el) => {
    el.editando = true
}

const cancelarEdicion = (el) => {
    el.editando = false
    el.nuevoNombre = ''
}
// Actualizar valor
const actualizarValor = async(id, nuevoValor, dispositivo) => {
  try {
    await updateData(id, collection, { [dispositivo]: { tipo: 'ejecutor',valor: nuevoValor } });
  } catch (error) {
    console.error('Error al actualizar el valor:', error)
  }
}
</script>


<template>
  <div class="container2">
    <div v-for="dato in datos" :key="dato.id" class="sala2">
      <div v-if="!dato.editando" class="nombreSala">
        <h2 class="titulo">{{ dato.data.nombre }}</h2>
        <i @click="editar(dato)" class="fas fa-pencil-alt"></i>
      </div>
      <div v-else class="editado">
        <input type="text" v-model="nuevoNombre" placeholder="Nuevo nombre">
        <button @click="cambiarNombre(nuevoNombre, dato.id)">Aceptar</button>
        <button @click="cancelarEdicion(dato)">Cancelar</button>
      </div>
      <div v-for="(value, key) in dato.data" :key="key">
        <div v-if="key !== 'nombre'" class="dispositivo">
          <i @click="eliminarDatos(dato.id, key)" class="fas fa-trash-alt"></i>
          <h3>{{ value.tipo }}</h3>
          <div v-if="value.tipo === 'sensor'" class="datos">
            <input type="text" :value="key" disabled>
            <input type="number" v-model="value.valor" disabled>
          </div>
          <div v-else class="datos">
            <input type="text" :value="key" disabled>
            <input type="checkbox" v-model="value.valor" @change="actualizarValor(dato.id, value.valor, key)">
          </div>
        </div>
      </div>
      <br><br>
      <i @click="eliminarDoc(dato.id)" class="fas fa-trash-alt papelera"></i>
      <div class="agregar">
        <añadirDispositivo @nuevoDispositivo="(obj) => añadir(obj, dato.id)"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .container2 {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 20px;
  }

  .sala2 {
    background-color: white;
    border: 2px solid black;
    border-radius: 10px;
    padding: 20px;
    margin: 10px;
    width: 40%;
    min-height: 150px;
    transition: .5s;
    position: relative;
  }

  .sala2:hover {
    transform: translateY(-5px);
    box-shadow: 2px 10px 20px;
  }

  .nombreSala {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .titulo {
    font-style: italic;
    font-size: 20px;
    text-align: center;
    margin-bottom: 10px;
    margin-right: 10px;
  }

  .fa-pencil-alt {
    font-size: 15px;
    margin-top: 5px;
  }

  .dispositivo {
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-between;
    background-color: yellow;
    height: 20px;
    text-align: center;
    border-radius: 8px;
    padding: 10px;
    margin-bottom: 10px;
  }

  .dispositivo h3 {
    margin-top: 0px;
    margin-bottom: 5px;
    margin-right: 15px;
    color: black;
  }

  .datos {
    display: flex;
    flex-flow: row;
    justify-content: space-around;
    padding-top: 5px;
    border: 1px solid black;
    width: 350px;
  }

  .datos p {
    margin-bottom: 5px;
  }

  .datos input {
    padding: 8px;
    margin-left: 10px;
    margin-right: 10px;
    width: 30%;
    text-align: center;
    border: 1px solid black;
    border-radius: 5px;
    margin-bottom: 5px;
  }

  .agregar {
    position: absolute;
    padding: 5px;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%);
}
  .papelera {
    position: absolute;
    font-style: italic;
    bottom: 10px;
    right: 15px;
    font-size: 24px;
  }

  .editado {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-end;
    text-align: center;
    margin-top: 20px;
  }

  .editado input {
    padding: 6px;
    margin-bottom: 10px;
    border: 1px solid black;
    border-radius: 5px;
    width: 200px;
    text-align: center;
    box-shadow: 2px 2px 10px yellow;
  }

  .editado button {
    padding: 6px 5px;
    margin-bottom: 10px;
    margin-left: 8px;
    background-color: #007bff;
    color: white;
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
  }

  .editado button:hover {
    background-color: #0056b3;
}
</style>
