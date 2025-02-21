<template>
  <q-page class="container">
    <!-- Заголовок новости -->
    <h2>{{ story.title }}</h2>
    
    <!-- Изображение новости -->
    <q-img :src="story.main_image" alt="Main Image" :ratio="16/9" class="q-mb-md"/>

    <!-- Описание новости -->
    <p>{{ story.description }}</p>
    
    <!-- Текст новости -->
    <div v-html="story.text"></div>

    <!-- Ссылки на источник и категорию -->
    <div>
      <a :href="story.url" target="_blank">Читать статью</a>
      <p>Категория: {{ story.category.name }}</p>
    </div>

    <!-- Слайдер с изображениями из источников -->
    <q-slider 
      v-if="story.main_images.length > 0"
      v-model="sliderValue"
      :min="0"
      :max="story.main_images.length - 1"
      :step="1"
      :label="true"
      :labels="story.main_images.map((_, index) => index + 1)"
      class="q-mt-md"
      color="primary"
    />
    <q-img 
      :src="story.main_images[sliderValue]"
      alt="Source Image"
      :ratio="16/9"
      class="q-mb-md"
    />

    <!-- Кнопка для перехода к первоисточнику -->
    <q-btn 
      :to="story.source.url" 
      label="Читать первоисточник" 
      color="primary" 
      class="full-width q-mt-md" 
      target="_blank"
    />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const story = ref({
  title: '',
  main_image: '',
  description: '',
  text: '',
  url: '',
  category: {
    name: ''
  },
  main_images: [],
  source: {
    url: ''
  }
});

const sliderValue = ref(0);  // Значение слайдера для фотографий

const fetchStory = async () => {
  try {
    const response = await axios.get('https://zn.by/api/v1/stories/70957/');
    const data = response.data;
    
    story.value = {
      title: data.news_articles[0].title,
      main_image: data.main_images[0],
      description: data.news_articles[0].description,
      text: data.news_articles[0].text,
      url: data.news_articles[0].url,
      category: data.news_articles[0].category,
      main_images: data.main_images,  // Список фотографий
      source: data.news_articles[0].source, // Источник новости
    };
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }
};

onMounted(fetchStory);
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 20px auto;
}
</style>
