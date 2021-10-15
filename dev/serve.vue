<template>
  <div id="app">
    <VirtualList :size="50" :remain="20" :variable="true" v-on:tobottom="bottomReached" :itemcount="list.length">
      <div v-for="item of list" :key="item" :style="{ height: 15 + 'px' }">
        {{ item }}
      </div>
    </VirtualList>
  </div>
</template>


<script lang="ts">
import {defineComponent} from 'vue';
import VirtualList from '@/virtual-list.vue';

export default defineComponent({
  name: 'ServeDev',
  components: {
    VirtualList
  },
  data() {
    return {
      list: [] as number[],
      bottomReached: () => {
        console.log('bottomReached');
      }
    }
  },
  mounted() {
    for (let i = 0; i < 10; i++) {
      this.list.push(i);
    }
  }
});
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>

