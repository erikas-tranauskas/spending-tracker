<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

interface ListItem {
  title: string;
  amount: number;
  monthlyIncrease: number;
}

const router = useRouter();

const listItems = ref<ListItem[]>([
  {
    title: 'Test 1',
    amount: 20.0,
    monthlyIncrease: 1.0,
  },
]);

function redirectToNewItemView() {
  router.push('/spending/new');
}

function redirectToItemView(id: number) {
  router.push(`/spending/edit/${id}`);
}
</script>

<template>
  <p class="text-center">Organize your spending!</p>
  <table class="table table-hover table-striped text-center">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Title</th>
        <th scope="col">Amount</th>
        <th scope="col">Monthly +</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, key) in listItems" :key="key + 1">
        <th scope="row">{{ key + 1 }}</th>
        <td>{{ item.title }}</td>
        <td>{{ item.amount.toFixed(2) }}</td>
        <td>{{ item.monthlyIncrease.toFixed(2) }}</td>
        <td>
          <button @click="redirectToItemView(key + 1)" type="button" class="btn btn-primary btn-lg px-4 btn-sm">
            Edit
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
    <button type="button" @click="redirectToNewItemView" class="btn btn-primary btn-lg px-4 btn-sm">Add new!</button>
  </div>
</template>
