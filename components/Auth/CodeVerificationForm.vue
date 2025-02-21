<template>
    <form @submit.prevent="handleSubmit">
      <q-input
        v-model="code"
        label="Код из письма"
        type="text"
        :rules="[val => val && val.length === 6 || 'Код должен быть из 6 цифр']"
        filled
      />
      <q-btn label="Подтвердить код" type="submit" color="primary" :loading="loading" />
      <div v-if="error" class="text-negative">{{ error }}</div>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const code = ref('');
  const loading = ref(false);
  const error = ref('');
  const router = useRouter();
  const email = ref('');
  
  const handleSubmit = async () => {
    loading.value = true;
    error.value = '';
  
    try {
      const response = await verifyCode(email.value, code.value);
      if (response.status === 200) {
        $emit('verification-success');
        router.push('/profile'); // Переход в личный кабинет
      }
    } catch (err) {
      error.value = 'Неверный код';
    } finally {
      loading.value = false;
    }
  };
  
  const verifyCode = async (email, code) => {
    try {
      const response = await fetch('/api/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }),
      });
  
      if (!response.ok) {
        throw new Error('Неверный код');
      }
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Неверный код');
    }
  };
  </script>
  