import { ref } from 'vue';
import { auth } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';

const user = ref<User | null>(null);

onAuthStateChanged(auth, (firebaseUser) => {
  user.value = firebaseUser;
});

export function useAuth() {
  return { user };
}
