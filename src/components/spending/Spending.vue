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

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

interface ListItem {
  title: string;
  amount: number;
  monthlyIncrease: number;
}

@Options({})
export default class Spending extends Vue {
  listItems: ListItem[] = [
    {
      title: 'Test 1',
      amount: 20.0,
      monthlyIncrease: 1.0,
    },
  ];

  redirectToNewItemView() {
    this.$router.push('/spending/new');
  }

  redirectToItemView(id: number) {
    this.$router.push('/spending/edit/' + id);
  }
}
</script>
