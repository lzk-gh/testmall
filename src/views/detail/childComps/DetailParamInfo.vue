<template>
  <div class="param_info" v-if="Object.keys(paramsInfo).length !== 0">
    <!-- 商品尺寸展示 -->
    <table class="size">
      <tr>
        <th :colspan="paramsInfo.rule[0].length">
          {{ paramsInfo.rule.key }}
        </th>
      </tr>
      <tr v-for="(item, index) in paramsInfo.rule[0]" :key="index">
        <td v-for="(value, key) in item" :key="key">
          {{ value }}
        </td>
      </tr>
      <tr v-if="paramsInfo.disclaimer">
        <td :colspan="paramsInfo.rule[0].length" class="disc">
          {{ paramsInfo.disclaimer }}
        </td>
      </tr>
    </table>
    <!-- 商品产址 -->
    <table class="params">
      <tr>
        <th colspan="2">
          {{ paramsInfo.info.key }}
        </th>
      </tr>
      <tr v-for="(item, index) in paramsInfo.info" :key="index">
        <td class="params_key">{{ item.key }}</td>
        <td class="params_value">{{ item.value }}</td>
      </tr>
    </table>

    <img
      :src="paramsInfo.info.images[0]"
      class="about"
      v-if="paramsInfo.info.images"
     alt=""/>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  props: {
    paramsInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .param_info {
    font-size: 14px;
  }

  .size,
  .params {
    width: 100%;
    padding: 0 15px 15px;
    border-spacing: 0;
    border-bottom: 5px solid #f2f5f8;
  }

  th,
  td{
    padding: 10px 10px 10px;
  }

  .size td,
  .params td {
    border-top: 2px solid #e8ebee;
    text-align: center;
  }

  .size .disc {
    font-size: 8px;
    padding-top: 16px;
    text-align: center;
  }


  .params_value {
    color: #eb4868;
    padding-left: 18%;
  }
</style>
