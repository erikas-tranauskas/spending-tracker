<template>
  <div class="home">
    <h1>HomeView loaded</h1>
    <HelloWorld/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue';

@Options({
  components: {
    HelloWorld,
  },
})
export default class HomeView extends Vue {}
</script>
