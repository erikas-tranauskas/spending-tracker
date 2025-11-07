<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { ListItem } from '@/components/spending/types';
import { useMainStore } from '@/store';

const router = useRouter();
const store = useMainStore();

const listItems = computed<ListItem[]>(() => {
  const items = store.getSpendingItems ?? [];

  return Array.isArray(items) ? items : [];
});

const redirectToNewItemView = () => {
  router.push('/spending/new');
};

const redirectToItemView = (id: number) => {
  router.push(`/spending/edit/${id}`);
};

const handleDelete = (id: number) => {
  store.deleteSpendingItem(id);
};

const handleIncrease = (item: ListItem) => {
  item.amount += item.increase;

  store.editSpendingItem(item);
};
</script>

<template>
  <p class="text-center">Organize your spending!</p>
  <table v-if="listItems.length > 0" class="table table-hover table-striped text-center">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Title</th>
        <th scope="col">Amount</th>
        <th scope="col">Monthly increase</th>
        <th scope="col" style="width: 140px">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, key) in listItems" :key="key + 1">
        <th scope="row">{{ key + 1 }}</th>
        <td>{{ item.title }}</td>
        <td>{{ item.amount.toFixed(2) }}</td>
        <td>{{ item.increase.toFixed(2) }}</td>
        <td>
          <div class="btn-group d-flex d-md-none" role="group" aria-label="Actions">
            <button @click="handleIncrease(item)" type="button" class="btn btn-success btn-sm">
              <i class="bi bi-plus-lg" aria-hidden="true"></i>
              <span class="visually-hidden">Increase</span>
            </button>
            <button @click="redirectToItemView(item.id)" type="button" class="btn btn-primary btn-sm">
              <i class="bi bi-pencil" aria-hidden="true"></i>
              <span class="visually-hidden">Edit</span>
            </button>
            <button @click="handleDelete(item.id)" type="button" class="btn btn-secondary btn-sm">
              <i class="bi bi-trash" aria-hidden="true"></i>
              <span class="visually-hidden">Delete</span>
            </button>
          </div>
          <div class="d-none d-md-flex gap-2 justify-content-end" role="group" aria-label="Actions">
            <button @click="handleIncrease(item)" type="button" class="btn btn-success btn-sm">
              <i class="bi bi-plus-lg" aria-hidden="true"></i>
              <span class="visually-hidden">Increase</span>
            </button>
            <button @click="redirectToItemView(item.id)" type="button" class="btn btn-primary btn-sm">
              <i class="bi bi-pencil" aria-hidden="true"></i>
              <span class="visually-hidden">Edit</span>
            </button>
            <button @click="handleDelete(item.id)" type="button" class="btn btn-secondary btn-sm">
              <i class="bi bi-trash" aria-hidden="true"></i>
              <span class="visually-hidden">Delete</span>
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
    <button type="button" @click="redirectToNewItemView" class="btn btn-primary btn-lg px-4 btn-sm">Add</button>
  </div>
</template>
