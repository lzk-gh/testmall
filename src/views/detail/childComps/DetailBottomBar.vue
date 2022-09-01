<template>
  <div class="bottom-bar">
    <!-- 底部左边 -->
    <div class="bar-item bar-left">
      <div>
      <i class="icon service"></i>
      <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <!-- 底部右边 -->
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addToCart() {
      this.$emit('addCart')
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    height: 49px;
    background: #fff;

    position: relative;
    box-shadow:0 3px 5px #999999;

    display: flex;
    text-align: center;
  }

  .bar-item {
    flex: 1;
    display: flex;
  }

  .bar-item > div{
    flex: 1;
  }

  .bar-left .text {
    font-size: 13px;
  }

  .bar-left .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 8px auto -2px;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
  }

  .bar-left .service {
    background-position: 0 -54px;
  }

  .bar-left .shop {
    background-position: 0 -98px;
  }

  .bar-right {
    font-size: 13px;
    color: #181616;
    font-weight: 600;
    line-height: 36px;
    margin: 6px auto 6px;
    border-radius: 22px;
    box-shadow:0 1px 2px #999999;
    background-color: #f36e91;
  }

  .bar-right .cart {
    background-color: #fcdd24;
    border-radius: 22px;
  }

  .bar-right .buy {
    color: #fff;
  }
</style>
