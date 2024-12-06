<template>
  <div>
    <div>
      <p>
        用户名：<input v-model="userInfo.username">
      </p>
      <p>
        密码：<input v-model="userInfo.password">
      </p>
      <p><button @click="submit">提交</button></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { login } from '../api/index'
import { reactive } from 'vue';
import { setToken, setRefreshToken } from '@/utils/auth'

const router = useRouter();

const userInfo = reactive({
  username:'admin',
  password:'admin'
})

async function submit () {
  if (userInfo.username.length < 5) {
    alert('用户名长度不小于5位')
    return
  }
  const {data, code} = await login({ username:userInfo.username, password: userInfo.password })
  
  console.log(data, code);
  
  if (code == 0){
            
    let {accessToken, refreshToken} = data
    accessToken &&  setToken(accessToken)
    refreshToken &&  setRefreshToken(refreshToken)
    router.push({ path:"/home" });
  }
}
</script>

<style lang="scss" scoped>
</style>
