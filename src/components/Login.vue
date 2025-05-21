<template>
  <div v-if="!loggedIn">
    <h2>Login</h2>
    <input v-model="username" placeholder="Username" @keyup.enter="login"/>
    <input v-model="password" type="password" placeholder="Password" @keyup.enter="login"/>
    <button @click="login">Login</button>
    <p v-if="error" style="color:red">{{ error }}</p>
</div>
<div v-else>
    <MenuVue />
    <RouterView />
    <button style="position: absolute; right: 12px; top: 12px;" @click="logout">Logout</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import MenuVue from "./Menu/Menu.vue"; 
import { RouterView } from "vue-router"; 

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
      localStorage.setItem('username', username.value); 
      localStorage.setItem('password', password.value); 
    } else {
      error.value = data.message || 'Invalid credentials';
      loggedIn.value = false;
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('username'); 
      localStorage.removeItem('password'); 
    }
  } catch (e) {
    console.error('Login error:', e);
    error.value = 'Failed to connect to the server. Please try again later.';
    loggedIn.value = false;
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username'); 
    localStorage.removeItem('password'); 
  }
}

function logout() {
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('username'); 
  localStorage.removeItem('password'); 
  loggedIn.value = false;
  username.value = ''; 
  password.value = '';
}

onMounted(async () => { // Делаем функцию асинхронной
  const wasLoggedIn = localStorage.getItem('loggedIn') === 'true';

  if (wasLoggedIn) {
    const storedUser = localStorage.getItem('username');
    const storedPass = localStorage.getItem('password');

    if (storedUser && storedPass) {
      username.value = storedUser; 
      password.value = storedPass;
      await login();
    } else {
      localStorage.removeItem('loggedIn');
    }
  }
});
</script>

<style scoped>
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