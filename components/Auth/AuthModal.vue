<template>
  <q-dialog v-model="open" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6">Войти или создать профиль</div>
      </q-card-section>

      <q-card-section>
        <q-btn flat label="Закрыть" @click="handleClose" color="negative" />
      </q-card-section>

      <q-card-section>
        <div v-if="step === 1">
          <EmailForm @submit="handleEmailSubmit" />
        </div>
        <div v-if="step === 2">
          <CodeVerificationForm :email="email" @close="handleClose" />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue';
import EmailForm from '../Auth/EmailForm.vue';
import CodeVerificationForm from '../Auth/CodeVerificationForm.vue';

const open = ref(true);
const step = ref(1);
const email = ref('');

// Передаем email в компонент CodeVerificationForm
const handleEmailSubmit = (emailInput) => {
  email.value = emailInput;
  step.value = 2; // Переключаемся на шаг для ввода кода
};

const handleClose = () => {
  step.value = 1;  // Сброс шага обратно
  email.value = ''; // Очистка email
  open.value = false; // Закрыть модальное окно
};
</script>
