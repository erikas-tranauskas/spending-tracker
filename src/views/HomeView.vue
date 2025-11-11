<script setup lang="ts">
import { auth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '@/composables/useAuth';
import { Button } from '@/components/ui/button';
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
  <div class="mb-6">
    <h2 class="mb-2 text-3xl font-bold text-foreground">Welcome to WealthWise!</h2>
    <p v-if="user" class="text-muted-foreground">Logged in as: {{ user.email }}</p>
    <p v-else class="text-muted-foreground">Not logged in</p>
    <Button class="mr-2" @click="login('e50erikas@gmail.com', '123456')"> Login </Button>
    <Button @click="register('e50erikas@gmail.com', '123456')"> Register </Button>
  </div>
</template>
