<template>
  <form @submit.prevent="handleSubmit">
    <q-input
      v-model="email"
      label="Email"
      type="email"
      :rules="[val => val && val.length > 0 || 'Email обязателен']"
      filled
    />
    <q-btn label="Отправить код" type="submit" color="primary" :loading="loading" />
    <div v-if="error" class="text-negative">{{ error }}</div>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const email = ref('');
const loading = ref(false);
const error = ref('');

const handleSubmit = async () => {
  loading.value = true;
  error.value = '';

  try {
    const response = await axios.post('https://zn.by/api/auth/', { email: email.value });

    if (response.status === 200 || response.status === 201) {
      // Успешно отправили код
      emit('submit', email.value);
    }
  } catch (err) {
    error.value = 'Ошибка при отправке кода. Попробуйте еще раз.';
  } finally {
    loading.value = false;
  }
};
</script>
