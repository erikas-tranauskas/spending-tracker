<script setup lang="ts">
import { useMainStore } from '@/store';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '@/firebase';
import { db } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const router = useRouter();
const store = useMainStore();

const title = ref('');
const amount = ref();
const increase = ref();

const itemId = computed(() => {
  const routeId = router.currentRoute.value.params.id;

  return routeId == null ? null : Number(routeId);
});

if (itemId.value) {
  const existing = (store.getSpendingItems ?? []).find((i) => i.id === itemId.value);

  if (existing) {
    title.value = existing.title ?? '';
    amount.value = existing.amount ?? 0;
    increase.value = existing.increase ?? 0;
  }
}

const saveItem = async () => {
  const newItem = {
    id: itemId.value ?? Date.now(),
    title: title.value,
    amount: amount.value,
    increase: increase.value,
  };

  const currentItems = Array.isArray(store.getSpendingItems) ? store.getSpendingItems : [];

  if (itemId.value) {
    store.editSpendingItem(newItem);
  } else {
    store.setSpendingItems([...currentItems, newItem]);
  }

  // @todo fix this
  const user = auth.currentUser;

  if (!user) {
    // @todo show alert
    throw new Error('No logged-in user');
  }

  const recordsRef = collection(db, 'users', user.uid, 'spendingItems');

  await addDoc(recordsRef, {
    ...newItem,
    createdAt: serverTimestamp(),
  });

  router.push('/spending');
};

const redirectToSpendingView = () => {
  router.push('/spending');
};
</script>

<template>
  <div class="container">
    <p class="text-center">Fill the required data</p>
    <form class="col-sm-12 col-lg-6 offset-lg-3">
      <div class="row justify-content-center">
        <div class="mb-3">
          <label for="item-title" class="col-form-label">Title:</label>
          <input v-model="title" name="item-title" type="text" class="form-control" id="item-title" />
        </div>
        <div class="mb-3">
          <label for="item-amount" class="col-form-label">Amount:</label>
          <input v-model.number="amount" name="item-amount" type="number" class="form-control" id="item-amount" />
        </div>
        <div class="mb-3">
          <label for="item-increase" class="col-form-label">Monthly increase:</label>
          <input v-model.number="increase" name="item-increase" type="number" class="form-control" id="item-increase" />
        </div>
        <div class="mb-3 d-flex justify-content-end gap-2">
          <button type="button" @click="saveItem" class="btn btn-primary">Save</button>
          <button type="button" @click="redirectToSpendingView" class="btn btn-secondary">Back</button>
        </div>
      </div>
    </form>
  </div>
</template>
