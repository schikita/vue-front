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
  import { z } from 'zod'; // Подключение библиотеки для валидации
  
  // Схема валидации для email
  const emailSchema = z.string().email({ message: "Введите корректный email" });
  
  const email = ref('');
  const loading = ref(false);
  const error = ref('');
  
  // Функция для отправки кода на email
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
  
  // Обработчик отправки формы
  const handleSubmit = async () => {
    loading.value = true;
    error.value = '';
  
    // Валидация email перед отправкой
    const validation = emailSchema.safeParse(email.value);
    if (!validation.success) {
      error.value = validation.error.errors[0].message;
      loading.value = false;
      return;
    }
  
    try {
      const response = await sendCodeToEmail(email.value);
      if (response.status === 200) {
        // Успешно отправили код
        // Для того, чтобы отреагировать на успешную отправку кода, можно использовать событие или состояние
        alert("Код отправлен на ваш email.");
      }
    } catch (err) {
      error.value = 'Ошибка при отправке кода';
    } finally {
      loading.value = false;
    }
  };
  </script>
  