# js-sdk
Js SDK for UltraPhoenix Gateway

## 快速入门

> 目前处于非常早期阶段，API可能会有较大变动。
### 安装

```bash
npm i ultraphx-js-sdk
```

### 基础使用

```ts
import { createSdkClient } from 'ultraphx-js-sdk'

// 创建 SDK 客户端
const ctx = createSdkClient({
  baseUrl: '', // 网关地址
  token: '', // 访问令牌 可暂时为空
})

// 若无token，则需要先进行注册
const token = await ctx.auth.register({
  name: '云平台',
  description: '云平台',
  type: 'plugin'
})

// 设置访问令牌
ctx.setToken(token)

// 设置token后，才可以访问相关api
ctx.ws.onConnect(async () => {
  while (true) {
    // 模拟发送数据
    await ctx.data.sendData({
      temperature: 25,
      humidity: 50,
    })
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
})

// 获取已连接的客户端
const clients = await ctx.client.getConnectedClients()
console.log(clients)

// 获取警报记录
const alerts = await ctx.alert.getAlertRecords({})
console.log(alerts)
```
