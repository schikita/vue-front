<template>
    <div>
      <h1>Личный кабинет</h1>
      <q-btn label="Обновить данные" @click="updateProfile" />
      <div>
        <p>Email: {{ user.email }}</p>
        <p>Имя: {{ user.first_name }} {{ user.last_name }}</p>
        <p>Дата рождения: {{ user.date_of_birth }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router'; // Для маршрутизации
  import { useUser } from 'src/context/UserContext'; // Пользовательский контекст для получения данных
  import { updateUser } from 'src/utils/api'; // Функция для обновления данных пользователя
  
  const router = useRouter();
  const { user, setUser } = useUser(); // Получаем данные пользователя и функцию для их обновления
  const loading = ref(false);
  const error = ref('');
  
  // Функция для обновления данных пользователя
  const updateProfile = async () => {
    loading.value = true;
    error.value = '';
  
    try {
      const response = await updateUser(user); // Обновляем данные пользователя через API
      setUser(response); // Обновляем данные в контексте
      router.push('/profile'); // Перенаправляем на страницу профиля после обновления
    } catch (err) {
      error.value = 'Ошибка при обновлении данных.';
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(() => {
    if (!user) {
      router.push('/login'); // Если нет данных о пользователе, перенаправляем на страницу входа
    }
  });
  </script>
  