<script setup lang="ts">
import { auth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '@/composables/useAuth';
const { user } = useAuth();

// @todo move these to proper login window
async function login(email: string, password: string) {
  await signInWithEmailAndPassword(auth, email, password);
}

async function register(email: string, password: string) {
  email = 'e50erikas@gmail.com';
  password = '123456';
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log('User registered:', user.uid);

    const token = await user.getIdToken();
    console.log('User token:', token);
  } catch (err) {
    console.error('Registration failed:', err.message);
  }
}
</script>

<template>
  <div class="px-4 py-5 text-center">
    <div class="py-5">
      <h1 class="display-5 fw-bold">Welcome to Spending Tracker!</h1>
      <p v-if="user">Logged in as: {{ user.email }}</p>
      <p v-else>Not logged in</p>
      <div class="col-lg-6 mx-auto">
        <p class="fs-5 mb-4">Coming soon!</p>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <button @click="register" type="button" class="btn btn-primary btn-lg px-4 gap-3">Primary</button>
          <button type="button" class="btn btn-outline-secondary btn-lg px-4">Secondary</button>
        </div>
      </div>
    </div>
  </div>
</template>
