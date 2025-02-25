<template>
    <div class="category-slider" v-if="isClient">
      <!-- Кнопка для прокрутки влево -->
      <q-btn
        icon="arrow_back_ios"
        flat
        @click="scrollLeft"
        class="scroll-btn left"
      />
      
      <!-- Список категорий с прокруткой -->
      <div class="category-list" ref="sliderContainer">
        <q-btn
          v-if="loading"
          v-for="index in 5"
          :key="index"
          flat
          class="category-btn skeleton"
        >
          <q-skeleton type="rect" :height="50" />
        </q-btn>
  
        <!-- Кнопки с категориями -->
        <q-btn
          v-for="category in categories"
          :key="category.id"
          :class="['category-btn', { active: activeTab === category.code_name }]"
          @click="handleCategoryClick(category)"
          flat
        >
          {{ category.name }}
        </q-btn>
      </div>
  
      <!-- Кнопка для прокрутки вправо -->
      <q-btn
        icon="arrow_forward_ios"
        flat
        @click="scrollRight"
        class="scroll-btn right"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  // Проверяем, что мы на клиенте
  const isClient = process.client;
  const categories = ref([]);
  const activeTab = ref(null);
  const loading = ref(true);
  
  // Инициализация категорий
  const fetchCategories = async () => {
    const response = await fetch('https://zn.by/api/v1/categories/');
    categories.value = await response.json();
    activeTab.value = categories.value[0]?.code_name;
    loading.value = false;
  };
  
  onMounted(() => {
    if (isClient) {
      fetchCategories();
    }
  });
  
  // Обработчик клика по категории
  const handleCategoryClick = (category) => {
    activeTab.value = category.code_name;
  };
    
  // Прокрутка влево
  const scrollLeft = () => {
    const slider = document.querySelector('.category-list');
    if (slider) {
      slider.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };
  
  // Прокрутка вправо
  const scrollRight = () => {
    const slider = document.querySelector('.category-list');
    if (slider) {
      slider.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };
  </script>
  
  <style scoped>
  .category-slider {
    position: relative;
    display: flex;
    align-items: center;
    margin-top: 16px;
  }
  
  .scroll-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.3);
    color: #fff;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    padding: 8px;
  }
  
  .scroll-btn.left {
    left: 0;
  }
  
  .scroll-btn.right {
    right: 0;
  }
  
  .category-list {
  display: flex;
  overflow-x: hidden; /* Скрывает горизонтальную прокрутку */
  gap: 12px;
  padding: 0 16px;
  position: relative;
  white-space: nowrap;
  scrollbar-width: none; /* Для Firefox */
}

.category-list::-webkit-scrollbar {
  display: none; /* Для Chrome, Safari, Edge */
}
  
  .category-btn {
    border-radius: 25px;
    padding: 12px 24px;
    background-color: transparent;
    font-weight: 600;
    text-transform: none;
    white-space: nowrap;
    flex-shrink: 0;
    min-width: 120px;
    text-align: center;
    border: 2px solid #ccc;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    font-size: 14px;
    color: #333;
  }
  
  .category-btn.active {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
  }
  
  .category-btn:hover {
    background-color: #f0f0f0;
  }
  
  .skeleton {
    max-width: 150px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
  }
  
  @media (max-width: 768px) {
    .category-list {
      padding: 0 8px;
    }
  
    .category-btn {
      min-width: 90px;
      padding: 8px 16px;
    }
  }
  </style>
  