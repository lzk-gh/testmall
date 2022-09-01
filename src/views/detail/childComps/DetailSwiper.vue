<template>
    <swiper class="detail-swiper">
      <swiper-item class="swiper-item" v-for="item in topImages">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper, SwiperItem} from '@/components/common/swiper'

export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  // props -> 负责接受外面传过来的数据
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  }

}
</script>

<style scoped>
  .detail-swiper {
    width: 100vw;
    height: 340px;
    overflow: hidden;
    /* 按比例自适应高度宽度 */
    /*object-fit: cover;*/
  }
</style>
