<template>
  <div class="home-page">
    <q-layout>
      <q-page-container>
        <div class="slider">
          <CategorySlider :categories="categories" @selectCategory="changeTab" />
        </div>
        
        
        <!-- Контент по выбранной категории -->
        <div class="content">
          <div class="main-content">
            <div v-if="activeTab === 'Культура'">Контент по категории "Культура"</div>
            <div v-if="activeTab === 'Наука и техника'">Контент по категории "Наука и техника"</div>
            <!-- Добавьте другие категории здесь -->
          </div>

          <div class="sidebar">
            <!-- Рекламный блок -->
            <div>Рекламный блок</div>
          </div>
        </div>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import CategorySlider from '../components/Homepage/CategorySlider';  // Импортируем компонент слайдера

// Состояние для категорий и активного таба
const categories = ref([]);
const activeTab = ref('Культура');

// Функция для получения данных категорий с API
const fetchCategories = async () => {
  try {
    const response = await axios.get('https://zn.by/api/v1/categories/');
    categories.value = response.data;
    activeTab.value = response.data[0]?.code_name;  // Устанавливаем активную категорию по умолчанию
  } catch (error) {
    console.error('Ошибка при загрузке категорий:', error);
  }
};

// Функция для смены активного таба
const changeTab = (tab) => {
  activeTab.value = tab;
};

// Загружаем категории при монтировании компонента
onMounted(() => {
  fetchCategories();
});
</script>

<style scoped>

.slider {
  padding: 30px 0;
}

.q-layout,
.q-page-container {
  margin-top: 0 !important;
  padding-top: 0 !important;
}

.content {
  display: flex;
  gap: 20px;
}

.main-content {
  flex: 3;
  border: 1px solid #8b8b8b7c;
  border-radius: 10px;
  padding: 15px;
  min-height: 300px;
}

.sidebar {
  border: 1px solid #8b8b8b7c;
  border-radius: 10px;
  padding: 15px;
  width: 300px;
}
</style>
