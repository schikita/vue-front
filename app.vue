<template>
  <q-layout>
    <Header /> <!-- Ваш компонент Header -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import Header from './components/Header.vue';
</script>

<style scoped>
.q-page-container {
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>