import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "@/store";

import FastClick from 'fastclick';
import VueLazyLoad from "vue-lazyload";

import toast from "@/components/common/toast";

Vue.config.productionTip = false

/* new实例可作为事件总线 */
Vue.prototype.$bus = new Vue()

// 安装toast插件
Vue.use(toast)

// 解决移动端300ms延迟
FastClick.attach(document.body)

// 使用懒加载插件
/**
 * 使用： 安装 -> 导入 -> Vue.use -> 修改img :src-> v-lazy
 **/
Vue.use(VueLazyLoad)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
