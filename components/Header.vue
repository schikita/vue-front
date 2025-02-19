<template>
    <q-header elevated class="bg-grey-1 text-black q-pa-none">
      <q-toolbar class="q-pl-md q-pr-md q-mt-xs">
        <!-- Логотип, Переключатель темы, Вход в личный кабинет -->
        <q-btn flat to="/" class="q-pa-none">          
            <img src="../public/logo.png" width="100" alt="Logo" />          
        </q-btn>
  
        <q-space />
  
        <q-toggle
          v-model="darkMode"
          :label="darkMode ? 'Dark' : 'Light'"
          color="primary"
          @input="toggleTheme"
          class="q-mr-sm"
        />
  
        <q-btn
          flat
          icon="account_circle"
          size="lg"
          round
          color="primary"
          @click="goToProfile"
        />
      </q-toolbar>
  
      <!-- Второй ряд: Город и Погода слева, Курсы валют справа -->
      <q-toolbar class="q-pl-md q-pr-md q-mt-xs">
    <!-- Блок для города -->
    <div class="pog">
      <q-btn flat label="Минск"  />
    </div>

    <!-- Блок для температуры -->
    <div class="pog">
      <q-btn flat label="-4°C"  />
    </div>

    <q-space />

    <!-- Блок для валют -->
    <div class="q-mr-md">
        <q-btn flat label="USD: $3.26" class="val-1 q-pa-none" />
    </div>
    <div class="q-mr-md">
        <q-btn flat label="EUR: €3.41" class="val-1 q-pa-none" />
    </div>
    <div class="q-mr-md">
        <q-btn flat label="RUB: ₽3.54" class="val-1 q-pa-none" />
    </div>
  </q-toolbar>
    </q-header>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useQuasar } from "quasar";
  
  // Состояние для переключателя темы
  const darkMode = ref(false);
  
  // Функция для переключения темы
  const toggleTheme = () => {
    if (darkMode.value) {
      useQuasar().dark.set();
    } else {
      useQuasar().dark.reset();
    }
  };
  
  // Переход на страницу профиля
  const goToProfile = () => {
    window.location.href = "/profile"; // Навигация на страницу профиля
  };
  
  // Данные погоды и валют (пример API)
  const fetchWeatherAndRates = async () => {
    try {
      // Загрузка погоды (замените на ваш API ключ)
      const weatherResponse = await fetch("https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=Minsk");
      const weatherData = await weatherResponse.json();
      const temperature = `${weatherData.current.temp_c}°C`;
  
      // Загрузка курсов валют (замените на ваш API)
      const ratesResponse = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
      const ratesData = await ratesResponse.json();
      const usdRate = ` $${ratesData.rates.USD}`;
      const eurRate = ` €${ratesData.rates.EUR}`;
      const rubRate = ` ₽${ratesData.rates.RUB}`;
  
      // Присваиваем данные
      // Для обновления лейблов с API данными
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  onMounted(() => {
    fetchWeatherAndRates();
  });
  </script>
  
  <style scoped>
  .q-header {
    position: sticky;
    top: 0;
    z-index: 10;
    padding: 0 12vw; 
  }
  
  .q-btn.flat {
    font-size: 14px;
    padding: 0 6px;
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
      padding: 0 15px; /* Уменьшаем отступы на мобильных */
    }
  }
  
  @media (max-width: 480px) {
    .q-btn.flat {
      font-size: 10px; /* Уменьшаем шрифт для маленьких экранов */
    }
  
    .q-header {
      padding: 0 10px; /* Еще меньше отступы на самых маленьких экранах */
    }
  }
  </style>
  