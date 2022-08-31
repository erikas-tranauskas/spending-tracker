<template>
  <Header/>
  <div class="b-divider"></div>
  <router-view/>
  <div class="b-divider"></div>
  <Footer/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

@Options({
  components: {
    Header,
    Footer,
  },
})
export default class App extends Vue {
  created() {
    console.log('App created!');
  }
}
</script>

<style scoped>
  .b-divider {
    height: 3rem;
    background-color: rgba(15, 20, 41, 0.600);
    border: solid rgba(0, 0, 0, 0.100);
    border-width: 1px 0;
    box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
  }
</style>
