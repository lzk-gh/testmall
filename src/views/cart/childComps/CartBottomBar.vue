<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        :is-checked="isSelectAll"
        class="check-button"
        @click.native="checkClick"
      />
      <span>全选</span>
    </div>
    <div class="total-price">
      合计: {{ totalPrice }}
    </div>
    <div class="calculate" @click="calcClick">
      去计算: {{ checkLength }}
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    totalPrice() {
      // 链式编程
      // filter()可以用来过滤元素的迭代函数，可将条件为true的元素返回
      // reduce()可以对序列进行累积操作,回调
      // toFixed(2) 保留两个小数
      return '￥' + this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.Price * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      if (this.$store.state.cartList.length === 0) return false
      return !this.$store.state.cartList.find(item => !item.checked)
    }
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) { // 全部选中
        this.$store.state.cartList.forEach(item => item.checked = false)
      } else {                // 部分或者全部不选中
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.show('购物车空空哦~', 2000)
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    display: flex;
    height: 40px;
    position: relative;
  }

  .check-content {
    display: flex;
    height: 100%;
    align-items: center;
    margin-left: 14px;
  }

  .check-content span {
    font-size: 13px;
    margin-left: 8px;
  }

  .total-price {
    font-size: 14px;
    line-height: 40px;
    margin-left: 36px;
  }

  .calculate {
    position: absolute;
    right: 0;
    line-height: 40px;
    padding-right: 18px;
    padding-left: 14px;
    border-bottom-left-radius: 18px;
    color: #fff;
    background: linear-gradient(to right, #ff6034, #ee0a24);
  }
</style>
