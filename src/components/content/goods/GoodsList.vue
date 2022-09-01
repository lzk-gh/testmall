<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :key="item.acm" :goods-item="item"/>
  </div>
</template>

<script>
import GoodsListItem from "@/components/content/goods/GoodsListItem";

export default {
  name: "GoodsList",
  components: {GoodsListItem},
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;  /* 当父盒子有宽度，规定灵活的项目在必要的时候拆行或拆列。 */
    justify-content: space-evenly;
    background-color: var(--color-background);
  }
</style>
