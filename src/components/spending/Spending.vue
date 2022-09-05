<template>
  <p>Organize your spending!</p>
  <table class="table table-hover table-dark table-striped">
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
        <td><button type="button" @click="setCurrentModalItem(item)" class="btn btn-outline-info btn-lg px-4 fw-bold btn-sm" data-bs-toggle="modal" data-bs-target="#spendingItemModal">Edit</button></td>
      </tr>
    </tbody>
  </table>
  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
    <button type="button" class="btn btn-outline-info btn-lg px-4 fw-bold btn-sm" data-bs-toggle="modal" data-bs-target="#spendingItemModal">Add new!</button>
  </div>
  <ItemModal
    :current-modal-item="currentModalItem"
  />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ItemModal from '@/components/spending/ItemModal.vue';

interface ListItem {
  title: string,
  amount: number,
  monthlyIncrease: number,
}

@Options({
  components: {
    ItemModal,
  }
})
export default class Spending extends Vue {
  listItems: ListItem[] = [
    {
      title: 'Test 1',
      amount: 20.00,
      monthlyIncrease: 1.00,
    },
    {
      title: 'Test 2',
      amount: 20.00,
      monthlyIncrease: 1.00,
    },
    {
      title: 'Test 3',
      amount: 20.00,
      monthlyIncrease: 1.00,
    },
  ];

  currentModalItem: ListItem | null = null;

  setCurrentModalItem(item: ListItem) {
    this.currentModalItem = item;
  }
}
</script>

<style scoped lang="scss">

</style>
