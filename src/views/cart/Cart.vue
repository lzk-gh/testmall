<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>
    <!-- 商品的列表 -->
    <scroll ref="scroll" class="wrapper">
      <cart-list />
    </scroll>
    <!-- 底部汇总 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll.vue";
import NavBar from "@/components/common/navbar/NavBar";

import CartList from "@/views/cart/childComps/CartList";
import CartBottomBar from "@/views/cart/childComps/CartBottomBar";

// mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：
import {mapGetters} from "vuex"

export default {
  name: "Cart",
  components: {
    Scroll,
    NavBar,
    CartList,
    CartBottomBar
  },
  // 计算
  // 首先computed计算后,会把计算得到的值保存到一个变量(watcher.value)中。
  // 读取computed并使用缓存时,就直接返回这个变量。
  computed: {
    // cartLength() {
    //   return this.$store.state.cartList.length;
    // }

    // mapGetters辅助函数混入getter
    // 两种语法
    // 1.使用对象展开运算符将 getter 混入 computed 对象中
    // ...mapGetters(['cartLength', 'cartList'])
    // 2.将一个 getter 属性另取一个名字, 使用对象形式:
    ...mapGetters({
      length: 'cartLength',
      list: 'cartList'
    })
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}

.wrapper {
  background-color: #f1f1f1;
  height: calc(100vh - 132px);
  background-color: rgba(100, 100, 100, 0.1);
  overflow: hidden;
}
</style>
