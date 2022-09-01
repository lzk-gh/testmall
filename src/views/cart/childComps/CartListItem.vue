<template>
  <div id="shop-item">
    <div class="item-selector">
      <CheckButton :is-checked="itemInfo.checked" @click.native="checkClick"/>
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{ itemInfo.title }}</div>
      <div class="item-desc">{{ itemInfo.desc }}</div>
      <div class="info-bottom">
        <div class="item-price left">￥{{ itemInfo.Price }}</div>
        <div class="item-count right">&times;{{ itemInfo.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";

export default {
  name: "CartListItem",
  components: {
    CheckButton
  },
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    // 商品单选取反
    checkClick() {
      this.itemInfo.checked = !this.itemInfo.checked
    }
  }
}
</script>

<style scoped>
  #shop-item {
    width: 100%;
    display: flex;
    background-color: #fff;
    padding: 13px 0;
    border-radius: 8px;
    border-bottom: 1px solid #d9d3d3;

  }

  .item-img img {
    width: 82px;
    height: 102px;
    border-radius: 8px;
    /* 对图片进行剪切，保留原始比例 */
    object-fit: cover;
  }

  .item-info {
    margin: 0 10px;
    width: 67%;
  }

  .item-title,
  .item-desc {
    overflow: hidden;
    /* 规定段落中的文本不进行换行 */
    white-space: nowrap;
    /* 对溢出部分裁剪... */
    text-overflow: ellipsis;
  }

  .item-title {
    font-size: 17px;
    color: #333;
  }

  .item-desc {
    font-size: 13px;
    margin-top: 18px;
    margin-bottom: 32px;
  }

  .info-bottom {
    display: flex;
    justify-content: space-between;
    width: 94%;
  }

  .item-price {
    font-size: 18px;
    color: #ff4500;
  }

  .item-selector {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto 10px;
    width: 8px;
    height: 6px;
  }
</style>
s
