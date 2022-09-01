<template>
  <!-- 用户评价头部 -->
  <div class="rate_info">
    <div class="top">
      <span>用户评价</span>
      <a href="#" class="more">更多 ></a>
    </div>
    <div v-if="Object.keys(rateInfo).length !== 0">
      <!-- 用户头像姓名 -->
      <div class="user">
        <img :src="rateInfo.user.avatar" alt="" />
        <span>{{ rateInfo.user.uname }}</span>
      </div>
      <!-- 用户评价内容 -->
      <div class="rate_content">{{ rateInfo.content }}</div>
      <!-- 用户评价时间与衣物类型 -->
      <div class="rate_attribute">
        <span class="rate_date">{{ dateFilter }}</span>
        <span>{{ rateInfo.style }}</span>
      </div>
      <!-- 用户评价拍摄的照片 -->
      <div class="rate_images" v-if="rateInfo.images">
        <div v-for="(item, index) in rateInfo.images" :key="index">
          <img :src="item" alt="" />
        </div>
      </div>
      <!-- 没有评价时设置样式 -->
      <div v-else class="empty"></div>
    </div>
    <!-- 底部样式 -->
    <div class="bottom">
      <div>~ 看了又看 ~</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailRateInfo",
  props: {
    rateInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    // 将时间戳换成年月日
    dateFilter() {
      const date = new Date(this.rateInfo.created * 1000)
      const Y = date.getFullYear() + "-";
      const M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
      const D = date.getDay() + " ";
      return Y + M + D
    }
  }
}
</script>

<style scoped>
  .rate_info {
    padding: 20px 25px;
  }

  .top {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-top: 2px solid #fa7654;
    border-bottom: 2px solid #fa7654;
    color: #fa7654;
    border-radius: 4px;
  }

  .top a {
    color: #fa7654;
  }

  .user {
    display: flex;
    align-items: center;
    margin: 20px 0;
  }

  .user img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 4%;
  }

  .user span {
    font-size: 13px;
    color: #0c0505;
  }

  .rate_content {
    font-size: 13px;
    letter-spacing: 2px;
    color: #0c0505;
  }

  .rate_attribute {
    font-size: 12px;
    margin: 8px 0;
  }

  .rate_date {
    margin-right: 8px;
  }

  .rate_images img{
    width: 115px;
    height: 115px;
    margin-right: 5px;
  }

  /* 没有评价时设置样式 */
  .empty {
    height: 50px;
  }

  .bottom {
    text-align: center;
    color: #fa7654;
    margin-top: 20px;
    font-size: 15px;
    padding-top: 20px;
    border-top: 1px solid #ea3c0e;
  }
</style>
