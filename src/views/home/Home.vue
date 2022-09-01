<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <tab-control class="tab-control"
                 :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 v-show="isTabFixed"
    />

    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <home-recommend-view :recommends="recommends" />
      <home-feature-view />
      <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"
      />
      <goods-list :goods="showGoods" />
    </scroll>
    <!-- .native 监听组件原生事件 -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
/* 组件 */
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommendView from "@/views/home/childComps/HomeRecommendView";
import HomeFeatureView from "@/views/home/childComps/HomeFeatureView";

// 公共
import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backTop/BackTop";

import {getHomeMultidata, getHomeGoods} from "@/network/home";
import {debounce} from "@/common/utils";

export default {
  name: "Home",
  /* 导入完注册一下components */
  components: {
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop

  },
  /* 用data来存储请求过来的数据 */
  data() {
    return {
      // 变量
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      // 默认当前类型是pop
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      // ['流行', '新款', '精选']默认不吸顶
      isTabFixed: false
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },

  /* 实现一个生命周期函数 */
  created() {
    // 1.请求多个数据
    this.getHomeMultidata()

    // 2.请求商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  mounted() {
    // 1.图片加载完成的事件监听
    // 这个地方img标签确实被挂载，但是其中的图片还没有占据高度
    // this.$refs.scroll.refresh对这个函数进行防抖操作
    const refresh = debounce(this.$refs.scroll.refresh, 100)
    this.$bus.$on('itemImageLoad', () => {
      /* 闭包 -> 当调用外部的局部变量时，局部变量不会被销毁 */
      refresh()
    })
  },
  methods: {
    /**
     * 事件监听方法
     **/

    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      // 解决两个tabControl点击不一的效果
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScroll(position) {
      /* 1.判断BackTop是否显示 */
      this.isShowBackTop = (-position.y) > 1000

      /* 2.决定tabControl是否吸顶（position: fixed） */
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore () {
      // 滚到底部再发送一次网络请求，获取新的数据
      this.getHomeGoods(this.currentType)
    },
    // 获取tabControl的offsetTop
    // 所有组件都有一个属性$el -> 用于获取组件中的元素
    swiperImageLoad() {
      // 计算tabControl距离顶部的距离
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    /**
     * 网络请求相关的方法
     **/
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // 函数调用 -> 压入函数栈(保存函数调用过程中的所有变量)
        // 函数结束 -> 弹出函数栈(释放函数所有的变量)则:
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<!-- scoped -> 作用域 -->
<style scoped>
#home {
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint); /* 用变量来设置背景颜色 */
  color: #fff;
  width: 100%;
  position: relative;
  z-index: 9;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  background-color: #fdfcfc;
  position: relative;
  z-index: 9;
}
</style>
