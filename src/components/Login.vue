<template>
  <div v-if="!loggedIn">
    <h2>Login</h2>
    <input v-model="username" placeholder="Username" @keyup.enter="login"/>
    <input v-model="password" type="password" placeholder="Password" @keyup.enter="login"/>
    <button @click="login">Login</button>
    <p v-if="error" style="color:red">{{ error }}</p>
  </div>
  <div v-else>
    <!-- Отображаем исходное содержимое App.vue здесь -->
    <MenuVue />
    <RouterView />
    <button @click="logout">Logout</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import MenuVue from "./Menu/Menu.vue"; // Импортируем MenuVue
import { RouterView } from "vue-router"; // Импортируем RouterView

const username = ref('');
const password = ref('');
const error = ref('');
const loggedIn = ref(false);

async function login() {
  error.value = '';
  try {
    const res = await fetch('/.netlify/functions/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username.value, password: password.value }),
    });

    const data = await res.json();
    if (res.ok && data.success) {
      loggedIn.value = true;
      localStorage.setItem('loggedIn', 'true');
      // Опционально: сохранить имя пользователя, если это необходимо
      // localStorage.setItem('username', username.value);
    } else {
      error.value = data.message || 'Invalid credentials';
      loggedIn.value = false;
      localStorage.removeItem('loggedIn');
    }
  } catch (e) {
    console.error('Login error:', e);
    error.value = 'Failed to connect to the server. Please try again later.';
    loggedIn.value = false;
    localStorage.removeItem('loggedIn');
  }
}

function logout() {
  localStorage.removeItem('loggedIn');
  // localStorage.removeItem('username'); // Если сохраняли имя пользователя
  loggedIn.value = false;
  username.value = ''; // Очищаем поля
  password.value = '';
}

onMounted(() => {
  if (localStorage.getItem('loggedIn') === 'true') {
    // Если пользователь уже вошел (например, обновил страницу),
    // можно попытаться подтвердить сессию с сервером или просто установить loggedIn = true.
    // Для простоты, просто устанавливаем loggedIn = true.
    // В более сложном приложении здесь может быть проверка токена.
    loggedIn.value = true;
  }
});
</script>

<style scoped>
/* Стили для компонента Login.vue */
/* Можно скопировать или адаптировать существующие стили, если нужно */
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 50px;
}
input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style> 