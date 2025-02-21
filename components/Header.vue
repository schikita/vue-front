<template>
  <q-header :class="headerClass" elevated>
    <q-toolbar class="q-pl-md q-pr-md q-mt-xs">
      <!-- Логотип, Переключатель темы, Вход в личный кабинет -->
      <q-btn flat to="/" class="logo q-pa-none">
        <img :src="logo" width="70" alt="Logo" />
      </q-btn>

      <q-space />

      <q-btn
        flat
        icon="light_mode"
        v-if="!darkMode"
        @click="toggleTheme"
      />
      <q-btn
        flat
        icon="dark_mode"
        v-if="darkMode"
        @click="toggleTheme"
      />

      <!-- Кнопка пользователя -->
      <q-btn
        flat
        icon="account_circle"
        size="lg"
        round
        color="primary"
        @click="openAuthModal"
      />
    </q-toolbar>

    <!-- Второй ряд: Город и Погода слева, Курсы валют справа -->
    <q-toolbar class="q-pl-md q-pr-md q-mt-xs">
      <!-- Блок для города -->
      <div class="pog">
        <q-btn flat :label="weather.city" />
      </div>

      <!-- Блок для температуры -->
      <div class="pog">
        <q-btn flat :label="weather.temperature" />
      </div>

      <q-space />

      <!-- Блок для валют -->
      <div class="q-mr-md" v-for="(rate, index) in currencyRates" :key="index">
        <q-btn flat :label="`${rate.currency}: ${rate.value}`" class="val-1 q-pa-none" />
      </div>
    </q-toolbar>
  </q-header>

  <!-- Модальное окно авторизации -->
  <AuthModal v-model="authModalOpen" />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getWeather, getCurrencyRates } from '../utils/api';  // Импортируем функции для получения данных о погоде и курсах валют
import logo from '@/assets/logo.png';
import { useQuasar } from 'quasar';
import AuthModal from '../components/Auth/AuthModal.vue';

const weather = ref({ city: '', temperature: '' });
const currencyRates = ref([]);

const $q = useQuasar();

// Проверка текущего состояния темы
const darkMode = ref($q.dark.isActive);

// Переключение темы
const toggleTheme = () => {
  $q.dark.toggle();
  darkMode.value = $q.dark.isActive;
};

// Динамическое обновление класса для header
const headerClass = computed(() => {
  return darkMode.value ? 'bg-dark text-white' : 'bg-light text-black';
});

// Переход на страницу профиля
const goToProfile = () => {
  window.location.href = '/profile';
};

// Получение данных о погоде и курсах валют
const fetchWeatherAndRates = async () => {
  try {
    const weatherData = await getWeather();
    weather.value = {
      city: weatherData.city,
      temperature: `${weatherData.temperature}°C`,
    };

    const ratesData = await getCurrencyRates();
    currencyRates.value = ratesData.map(rate => ({
      currency: rate.currency,
      value: rate.value,
    }));
  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
  }
};

onMounted(() => {
  fetchWeatherAndRates();
});

// Модальное окно авторизации
const authModalOpen = ref(false);

const openAuthModal = () => {
  authModalOpen.value = true;
};
</script>

<style scoped>
.logo {
  margin-left: 10px;
  margin-top: 10px;
  padding: 5px;
  border-radius: 10px;
}

/* Фон для темной и светлой темы */
.bg-dark {
  background-color: #212121;
}

.text-white {
  color: white;
}

.bg-light {
  background-color: #f5f5f5;
}

.text-black {
  color: black;
}

.q-header {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 0 12vw;
}

.q-btn.flat {
  font-size: 14px;
  padding:  10px;
}

.q-toolbar {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}

.q-space {
  flex-grow: 1;
}

.q-toolbar.q-mt-xs {
  margin-top: 5px;
}

.q-btn.flat.q-pa-none {
  padding: 0;
  margin-right: 6px;
}

.q-page-container {
  padding: 20px 50px;
  max-width: 1200px;
  margin: 0 auto;
}

.val-1 {
  margin-left: 10px;
  padding: 5px 10px;
}

.pog {
  padding: 5px 10px;
}

/* Медиа-запросы для мобильных устройств */
@media (max-width: 768px) {
  .q-btn.flat {
    font-size: 12px;
  }

  .q-toolbar.q-mt-xs {
    margin-top: 10px;
  }

  .q-btn.flat.q-pa-none {
    margin-right: 5px;
  }

  .q-header {
    padding: 0 15px;
  }
}

@media (max-width: 480px) {
  .q-btn.flat {
    font-size: 10px;
  }

  .q-header {
    padding: 0 10px;
  }
}
</style>
