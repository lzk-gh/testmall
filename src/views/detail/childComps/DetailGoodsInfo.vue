<template>
  <div id="goods_info" v-if="Object.keys(detailInfo).length !== 0">
    <div class="info_desc">
      <div class="start"></div>
      <div class="desc">{{ detailInfo.desc }}</div>
      <div class="end"></div>
    </div>
    <!-- 穿着效果 -->
    <div class="info_key">{{ detailInfo.detailImage[0].key }}</div>
    <div
      class="info_image"
      v-for="(item, index) in detailInfo.detailImage[0].list"
      :key="index"
    >
      <!-- 遍历图片 -->
      <img :src="item" alt="" @imageLoad="imageLoad" />
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {}
      }
    },
  },
  data() {
    return {
      count: 0,
      imageLength: 0,
    };
  },
  methods: {
    imageLoad() {
      // 判断多张图片都加载完之后，回调一次即可
      // ++this.count  --> 判断是否相等
      if (++this.count === this.imageLength) this.$emit("imageLoad");
    },
  },
  watch: {
    detailInfo() {
      // 获取图片的个数
      this.imageLength = this.detailInfo.detailImage[0].list.length;
    },
  },
};
</script>
<style scoped>
#goods_info {
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}
.info_desc {
  padding: 0 15px;
}
.info_desc .start,
.info_desc .end {
  position: relative;
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
}
.info_desc .end {
  float: right;
}
.info_desc .start::before,
.info_desc .end::after {
  position: absolute;
  content: "";
  width: 5px;
  height: 5px;
  background-color: #333;
}
.info_desc .end::after {
  top: -5px;
  right: 0;
}
.info_desc .desc {
  padding: 15px 0;
  font-size: 14px;
  color: #666;
}
.info_key {
  padding: 10px 15px;
}
.info_image {
  margin-bottom: 5px;
}
.info_image img {
  width: 100%;
}
</style>
