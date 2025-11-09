<script setup lang="ts">
import { auth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '@/composables/useAuth';
const { user } = useAuth();

const login = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password);
};

const register = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const token = await user.getIdToken();

    console.log('User registered:', user.uid);
    console.log('User token:', token);
  } catch (err) {
    console.error('Registration failed:', err.message);
  }
};
</script>

<template>
  <div class="px-4 py-5 text-center">
    <div class="py-5">
      <h1 class="display-5 fw-bold">Welcome to Spending Tracker!</h1>
      <p v-if="user">Logged in as: {{ user.email }}</p>
      <p v-else>Not logged in</p>
      <div class="col-lg-6 mx-auto">
        <p class="fs-5 mb-4">Coming soon!</p>
        <div class="d-grid d-sm-flex justify-content-sm-center gap-2">
          <button
            @click="login('e50erikas@gmail.com', '123456')"
            type="button"
            class="btn btn-primary btn-lg gap-3 px-4"
          >
            Login
          </button>
          <button
            @click="register('e50erikas@gmail.com', '123456')"
            type="button"
            class="btn btn-outline-secondary btn-lg px-4"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
