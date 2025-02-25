<template>
  <form @submit.prevent="handleSubmit">
    <q-input
      v-model="code"
      label="Проверочный код"
      type="text"
      :rules="[val => val && val.length === 6 || 'Код должен состоять из 6 цифр']"
      filled
    />
    <q-btn label="Проверить код" type="submit" color="primary" :loading="loading" />
    <div v-if="error" class="text-negative">{{ error }}</div>
  </form>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { AuthUserVerifyEmail } from '@/utils/api'; // Путь к вашему API
import { useRouter } from 'vue-router'; // Для роутинга
import { z } from 'zod'; // Для валидации

// Валидация кода
const codeSchema = z.string().regex(/^\d{6}$/, { message: "Код должен состоять из 6 цифр" });

const code = ref('');
const loading = ref(false);
const error = ref('');
const props = defineProps({
  email: {
    type: String,
    required: true,  // Email должен быть передан в компонент
  },
});

const router = useRouter();

const handleSubmit = async (e) => {
  e.preventDefault();
  loading.value = true;
  error.value = "";

  // Убедитесь, что email не пустой и является строкой
  if (!props.email || typeof props.email !== 'string' || !props.email.trim()) {
    error.value = "Email не может быть пустым";
    loading.value = false;
    return;
  }

  const validation = codeSchema.safeParse(code.value);
  if (!validation.success) {
    error.value = validation.error.errors[0].message;
    loading.value = false;
    return;
  }

  try {
    // Запрос на подтверждение email
    const response = await AuthUserVerifyEmail({ email: props.email, code: code.value });
    
    if (response.status === 200 || response.status === 201) {
      router.push("/profile"); // Переход на страницу профиля
    } else {
      error.value = "Неверный код или срок действия истек. Попробуйте еще раз.";
    }
  } catch (err) {
    console.error('Ошибка при отправке запроса: ', err);
    error.value = "Ошибка при отправке запроса. Попробуйте еще раз.";
  } finally {
    loading.value = false;
  }
};
</script>
