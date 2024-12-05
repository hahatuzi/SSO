<script setup lang="ts">
import axios from 'axios';
import { ref, reactive, onMounted } from 'vue';

const isLogin = ref<boolean>(false)
const userInfo = reactive({
  username:'',
  password:''
})
onMounted(() => {
  
  console.log(localStorage.getItem('satoken'))
  test()
  const accessToken = localStorage.getItem('access_token')
  if (accessToken) {
    isLogin.value = true
  }
})
const customerInfo = ref({})

async function submit () {
  if (userInfo.username.length < 5) {
    alert('用户名长度不小于5位')
    return
  }
  const {data} = await axios.post(
    'http://localhost:5050/auth/login',
    {username:userInfo.username, password: userInfo.password}
  )
  if (data.code == 0){
    isLogin.value = true
    const {accessToken, refreshToken} = data.data
    localStorage.setItem('access_token', accessToken)
    localStorage.setItem('refresh_token', refreshToken)
  }
}
async function loadCustomerInfo ()  {
  //  axios({
  //   url:'http://localhost:8100/api/test',
  //   method:'get',
  // }).then(res => {
  //   console.log(res)
  // })
  
  const {data} = await axios({
    url:'http://localhost:8100/api/customer',
    method:'post',
    headers:{
      authorization:'Bearer ' + localStorage.getItem('access_token')
    },
    data:{userId:1}
  })

  if (data.code == 0) {
    customerInfo.value = data.data
    return
  }
  if (data.code == 2) {
    refreshToken((data) => {
      if (data.code == 2) {
        isLogin.value = false
        return
      }
      const {accessToken, refreshToken} = data.data
      localStorage.setItem('access_token', accessToken)
      localStorage.setItem('refresh_token', refreshToken)
      loadCustomerInfo()
    })
  }
}
async function refreshToken (callback) {
  const {data} = await axios({
    url:'http://localhost:5050/auth/refresh',
    method:'post',
    headers:{
      authorization:'Bearer ' + localStorage.getItem('refresh_token')
    }
  })
  callback(data)
}
async function test () {
  const {data} = await axios({
    url:'http://localhost:5050/auth/test',
    method:'get',
  })
  console.log(data)
}
</script>

<template>
  <div>
    <div v-if="!isLogin">
      <p>
        用户名：<input v-model="userInfo.username">
      </p>
      <p>
        密码：<input v-model="userInfo.password">
      </p>
      <p><button @click="submit">提交</button></p>
    </div>
    <div  v-else>
      <button @click="loadCustomerInfo">加载用户信息</button>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
