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
  name: 'sensor',
  description: 'Mocked sensor',
})

// 设置访问令牌
ctx.setToken(token)

// 设置token后，才可以访问相关api

// 获取已连接的设备
const clients = await ctx.client.getConnectedClients()

// 获取警报记录
const alerts = await ctx.alert.getAlertRecords({})

// 监听警报事件
ctx.alert.onAlert('warning', (msg) => {
  console.log('Received alert:', msg)
})

// 监听传感器数据事件
ctx.data.onData('sensor1', (msg) => {
  console.log('Received data from sensor1:', msg)
})
```
