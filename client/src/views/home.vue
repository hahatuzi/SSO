<template>
  <div>
    首页
    <div v-if="!loading">
    用户名 ---<span>{{ customerInfo.name }}</span>
    年龄 ---<span>{{ customerInfo.age }}</span>
    <div style="margin-top: 20px;"><button @click="loadCustomerInfo">刷新用户信息</button></div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { getInfo } from '../api/index'
import { ref } from 'vue';

let loading = ref(false)
const customerInfo = ref({
  name:'',
  age: 0
})
onMounted(() => {
  loadCustomerInfo()
})
async function loadCustomerInfo ()  {
  loading.value = true
  const {data, code} = await getInfo({userId:1})

  loading.value = false
  if (code == 0) {
    customerInfo.value = data
    localStorage.setItem('userName', customerInfo.value.name)
  }
}
</script>

<style lang="scss" scoped>
</style>
