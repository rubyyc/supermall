<template>
  <div class="goods">
    <good-list-item v-for="(item, index) in goods" :key="index" :goods-item="item"></good-list-item>
  </div>
</template>

<script>
import GoodListItem from './GoodListItem'
export default {
  name: 'GoodsList',
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    GoodListItem
  }
}
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 3px;
}
</style>
