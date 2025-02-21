<template>
    <q-dialog v-model="isModalOpen">
      <q-card>
        <q-card-section>
          <div class="text-h6">Войти или создать профиль</div>
        </q-card-section>
  
        <q-card-section>
          <!-- Поле для ввода Email -->
          <q-input
            v-model="email"
            label="Email"
            type="email"
            :rules="[val => val && val.length > 0 || 'Email обязателен']"
            filled
          />
        </q-card-section>
  
        <q-card-actions>
          <q-btn label="Отправить код" color="primary" @click="handleEmailSubmit" :loading="loading" />
          <q-btn label="Закрыть" flat @click="closeModal" />
        </q-card-actions>
  
        <q-card-section v-if="error" class="text-negative">
          {{ error }}
        </q-card-section>
      </q-card>
    </q-dialog>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const isModalOpen = ref(true); // Для управления состоянием модального окна
  const email = ref('');
  const loading = ref(false);
  const error = ref('');
  
  const closeModal = () => {
    isModalOpen.value = false; // Закрытие модального окна
  };
  
  const handleEmailSubmit = async () => {
    loading.value = true;
    error.value = '';
  
    // Валидация email перед отправкой
    if (!email.value) {
      error.value = 'Email обязателен';
      loading.value = false;
      return;
    }
  
    try {
      const response = await sendCodeToEmail(email.value);
      if (response.status === 200) {
        // Успешно отправили код
        closeModal(); // Закрытие окна после успешной отправки
      }
    } catch (err) {
      error.value = 'Ошибка при отправке кода';
    } finally {
      loading.value = false;
    }
  };
  
  const sendCodeToEmail = async (email) => {
    try {
      const response = await fetch('/api/send-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      if (!response.ok) {
        throw new Error('Ошибка отправки кода');
      }
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Ошибка отправки кода');
    }
  };
  </script>
  