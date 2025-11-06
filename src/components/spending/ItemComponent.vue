<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const title = ref('');
const amount = ref<number | null>(null);
const monthlyIncrease = ref<number | null>(null);

const saveItem = () => {
  console.log('Saving in progress', {
    title: title.value,
    amount: amount.value,
    monthlyIncrease: monthlyIncrease.value,
  });
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
          <label for="item-monthly-increase" class="col-form-label">Monthly +:</label>
          <input
            v-model.number="monthlyIncrease"
            name="item-monthly-increase"
            type="number"
            class="form-control"
            id="item-monthly-increase"
          />
        </div>
        <div class="mb-3">
          <button type="button" @click="saveItem" class="btn btn-primary">Save</button>
          <button type="button" @click="redirectToSpendingView" class="btn btn-secondary float-end">Back</button>
        </div>
      </div>
    </form>
  </div>
</template>
