<template>
  <div v-if="goods != undefined && Object.keys(goods).length != 0"
       class="base-info">
    <!-- 标题 -->
    <div class="info-title">
      <span class="discount" v-if="goods.discount">
        {{ '[' + goods.discount + ']' }}
      </span>
      {{ goods.title }}
    </div>
    <!-- 价格 -->
    <div class="info-price">
      <span class="n-price">{{ goods.newPrice }}</span>
      <span class="o-price">{{ goods.oldPrice }}</span>
    </div>
    <!-- 快递信息 -->
    <div class="info-other">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>
    <!-- 发货时间 -->
    <div class="info_services">
      <template v-for="(item, index) in goods.services">
        <!--
          1.请求到的services数据中icon不存在，则此条数据不显示
          2.最后一条数据不显示
        -->
        <div
          v-if="item.icon && index !== goods.services.length - 1"
          class="services_item"
          :key="index"
        >
          <img :src="item.icon" alt="" />
          <span>{{ item.name }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .base-info {
    padding: 6px 16px 2px;
  }

  .info-title {
    color: #0c0505;
    font-size: 16px;
    font-weight: 600;
    padding: 12px 0;
    letter-spacing: 1px;
    border-radius: 4px;
  }

  .info-price {
    padding-bottom: 5px;
    color: #211f1f;
  }

  .n-price {
    font-size: 26px;
    font-weight: 600;
    color: #ef0621;
  }

  .o-price {
    text-decoration: line-through; /* 原价格的横线 */
    margin: 0 6px 0;
  }

  .info-other {
    display: flex;
    margin-top: 2px;
    padding-bottom: 10px;
    border-bottom: 5px solid #f2f5f8;
    justify-content: space-between;
    font-size: 13px;
  }

  .info_services {
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
  }
  .services_item img,
  .a {
    margin-right: 3px;
    vertical-align:middle;
    width: 14px;
    height: 14px;
  }
  .services_item span,
  .b {
    color: #333;
    font-size: 13px;
  }
</style>
