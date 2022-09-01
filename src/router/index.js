import Vue from "vue";
import VueRouter from "vue-router";

/* 对文件进行懒加载 */
const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')

// 1.安装插件
Vue.use(VueRouter)

// 2.创建router

/* 传入一些属性 , 配置一些映射关系 */
const routes = [
  {
    /* 重定向 */
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    // 指定的组件
    component:Home
  },
  {
    path: '/category',
    component:Category
  },
  {
    path: '/cart',
    component:Cart
  },
  {
    path: '/profile',
    component:Profile
  },
  {
    path: '/detail/:iid',
    component:Detail
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

// 导出, 然后去main.js中挂载
export default router
