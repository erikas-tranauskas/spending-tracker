<template>
  <div class="bg-dark text-secondary px-4 py-5 text-center">
    <div class="py-5">
      <h1 class="display-5 fw-bold text-white">Welcome to Spending Tracker!</h1>
      <div class="col-lg-6 mx-auto">
        <p class="fs-5 mb-4">Coming soon!</p>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <button disabled type="button" class="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold">Primary</button>
          <button disabled type="button" class="btn btn-outline-light btn-lg px-4">Secondary</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class HomeView extends Vue {}
</script>
