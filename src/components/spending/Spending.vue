<template>
  <p class="text-center">Organize your spending!</p>
  <table class="table table-hover table-dark table-striped text-center">
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
        <td><button type="button" @click="setCurrentModalItem(item)" class="btn btn-outline-info btn-lg px-4 fw-bold btn-sm" data-bs-toggle="modal" :data-bs-target="'#' + listItemModalId">Edit</button></td>
      </tr>
    </tbody>
  </table>
  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
    <button type="button" @click="setCurrentModalItem(null)" class="btn btn-outline-info btn-lg px-4 fw-bold btn-sm" data-bs-toggle="modal" :data-bs-target="'#' + listItemModalId">Add new!</button>
  </div>
  <ItemModal
    :list-item-modal-id="listItemModalId"
    :current-modal-item="currentModalItem || undefined"
    @updateListItems="updateListItems"
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
  ];

  currentModalItem: ListItem | null = null;
  listItemModalId = 'spendingItemModal';

  setCurrentModalItem(item: ListItem | null) {
    this.currentModalItem = item;
  }

  updateListItems() {
    this.listItems.push({ title: 'hello', amount: 20, monthlyIncrease: 1 });
  }
}
</script>

<style scoped lang="scss">

</style>
