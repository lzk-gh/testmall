<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  /* 定义属性 */
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  /* 用来保存变量 */
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    // ref 比 document 更精准
    /* 1.0创建BScroll对象 */
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      observeDOM: true,
      observeImage: true,
      probeType: this.probeType,

      /* 利用scroll监听上拉到底部 */
      pullUpLoad: this.pullUpLoad
    })

    /* 2.监听滚动的位置 */
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', (position) => {
        // console.log(position);
        /* 子组件传出去 */
        this.$emit('scroll', position)
      })
    }

    /* 3.监听上拉事件 */
    if (this.probeType) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    scrollTo(x, y, time = 300) {
      /* 逻辑语->前面的为false后面的语句是不执行的 */
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    /* 封装 */
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
      console.log('===');
      this.scroll && this.scroll.refresh && this.scroll.refresh()
    }
  }
}
</script>

<style scoped>

</style>
