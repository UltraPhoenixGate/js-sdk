import { createSdkClient } from '@ultraphx/js-sdk'

const ctx = createSdkClient({
  baseUrl: '',
  token: '',
})

ctx.auth.register({
  name: 'sensor',
  description: 'Mocked sensor',
})

ctx.data.onData('sensor', (msg) => {
  console.log('Received data from sensor:', msg)
})
