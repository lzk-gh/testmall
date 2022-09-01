<template>
  <div id="detail">
    <detail-nav-bar class="detail_nav" @titleClick="titleClick" />
    <!-- 将要滚动区域交托给scroll -->
    <!-- 使用时必须给高度 -->
    <scroll ref="scroll"
            class="content"
            :probeType="3"
            @scroll="contentScroll"
    >
      <detail-swiper v-if="topImages !==''" :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad" />
      <detail-param-info ref="params" :params-info="paramsInfo" />
      <detail-rate-info ref="rate" :rate-info="rateInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart" />
    <back-top v-show="isShowBackTop" @click.native="backClick" />
    <toast message="哈哈哈"/>
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailRateInfo from "@/views/detail/childComps/DetailRateInfo";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";

import Scroll from "@/components/common/scroll/Scroll";
import GoodsList from "@/components/content/goods/GoodsList";
import BackTop from "@/components/content/backTop/BackTop";

import Toast from "@/components/common/toast/Toast";


import {getDetail, Goods, Shop, GoodsParams, getRecommend} from "@/network/detail";

import {goodsItemMixin} from "@/common/mixin"

import { mapActions } from 'vuex'

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailRateInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    BackTop,
    Toast
  },
  mixins: [goodsItemMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramsInfo: {},
      rateInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      isShowBackTop: false
    }
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // 1.获取数据
      const data = res.result;
      console.log(res);

      // 2.取出轮播图的数据
      this.topImages = data.itemInfo.topImages;

      // 3.获取商品基本信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services)

      // 4.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)

      // 5.保存商品的详情数据
      this.detailInfo = data.detailInfo

      // 6.获取商品参数尺码信息
      this.paramsInfo = new GoodsParams(data.itemParams);

      // 7.取出评论信息
      if (data.rate.cRate !== 0) {
        this.rateInfo = data.rate.list[0]
      }

      this.$nextTick(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.rate.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        console.log(this.themeTopYs);
      })
    })


    // 3.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })

    // 4.给getThemeTopY赋值(对给this.themeTopYs赋值的操作进行防抖)
    // this.getThemeTopY = debounce(() => {
    //   this.themeTopYs = []
    //   this.themeTopYs.push(0);
    //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
    //   this.themeTopYs.push(this.$refs.rate.$el.offsetTop)
    //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    //   console.log(this.themeTopYs);
    // }, 100)
  },
  destroyed() {
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  methods: {
    ...mapActions(['addCart']),
    detailImageLoad() {
      // 防抖
      this.newRefresh()
      this.getThemeTopY()
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
    },
    // imageLoad() {
    //   this.$refs.scroll.refresh()
    //
    //   this.themeTopYs = []
    //
    //   this.themeTopYs.push(0);
    //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    //   this.themeTopYs.push(this.$refs.rate.$el.offsetTop);
    //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    //   this.themeTopYs.push(Number.MAX_VALUE);
    //
    //
    // },
    // 是否显示回到顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    contentScroll(position) {
      /* 1.判断BackTop是否显示 */
      this.isShowBackTop = (-position.y) > 1000
    },
    addToCart() {
      // 1.获取购物车需要展示的信息
      console.log('接受到了addCart');

      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.Price = this.goods.realPrice
      product.iid = this.iid

      // 2.将商品添加到购物车里
      /**
       * this.store.dispatch() 与 this.store.commit()方法的区别
       * 总的来说他们只是存取方式的不同,
       * 两个方法都是传值给vuex的mutation改变state
       **/
      // dispatch 会返回一个promise
      // 这里的res是actions.js传回来的resolve
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res);
      // })

      this.addCart(product).then(res => {
        // console.log(this.$toast);
        this.$toast.show(res, 1500)
      })
    }
  }
}
</script>

<style scoped>
/* 隐藏首页的脱离标准流 */
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.detail_nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100vh - 44px - 49px);
}
</style>
