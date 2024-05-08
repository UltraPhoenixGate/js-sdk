import { createSdkClient } from '@ultraphx/js-sdk'

const ctx = createSdkClient({
  baseUrl: '',
})

ctx.data.onData('sensor', (msg) => {
  console.log('Received data from sensor:', msg)
})

ctx.alert.sendAlert('info', 'Hello from mocked sensor')
