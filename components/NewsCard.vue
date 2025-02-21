<template>
    <q-card class="news-card">
      <q-img
        v-if="hasImage"
        :src="item.main_image"
        class="news-image"
        fit="cover"
      />
      <div v-else class="news-placeholder">
        <q-img src="/logo.png" class="news-logo" />
      </div>
  
      <q-card-section class="news-content">
        <q-badge v-if="item.category?.name" class="news-category">
          {{ item.category.name }}
        </q-badge>
  
        <q-item-label class="news-title">{{ item.title || "Без названия" }}</q-item-label>
  
        <q-item-label class="news-summary" v-if="item.summary">
          {{ item.summary }}
        </q-item-label>
  
        <q-item-label class="news-footer">
          {{ timeAgo(item.publication_at) }}
        </q-item-label>
      </q-card-section>
    </q-card>
  </template>
  
  <script setup>
  import { computed } from "vue";
  
  // Пропсы, которые принимает компонент
  defineProps({
    item: {
      type: Object,
      required: true,
    },
  });
  
  // Проверяем, есть ли изображение
  const hasImage = computed(() => Boolean(item?.main_image));
  
  // Функция для форматирования даты (времени)
  const timeAgo = (date) => {
    if (!date) return "Неизвестно";
    const diff = Math.floor((new Date() - new Date(date)) / 1000);
    if (diff < 60) return `${diff} сек. назад`;
    if (diff < 3600) return `${Math.floor(diff / 60)} мин. назад`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} ч. назад`;
    return `${Math.floor(diff / 86400)} дн. назад`;
  };
  </script>
  
  <style scoped>
  .news-card {
    height: 360px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    background: var(--q-color-page);
    border: 1px solid var(--q-color-border);
    transition: box-shadow 0.3s ease-in-out;
  }
  .news-card:hover {
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
  }
  
  .news-image {
    height: 180px;
    border-radius: 10px 10px 0 0;
  }
  
  .news-placeholder {
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.05);
  }
  
  .news-logo {
    width: 100px;
    opacity: 0.5;
  }
  
  .news-content {
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
  }
  
  .news-category {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    font-size: 12px;
    font-weight: bold;
    padding: 4px 8px;
    border-radius: 3px;
  }
  
  .news-title {
    font-size: 16px;
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: 8px;
  }
  
  .news-summary {
    font-size: 14px;
    color: gray;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  
  .news-footer {
    font-size: 12px;
    color: #6e6e6e;
    margin-top: 10px;
    text-align: right;
  }
  </style>
  