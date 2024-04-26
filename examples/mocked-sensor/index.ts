import { createSdkClient } from '@ultraphx/js-sdk'

const ctx = createSdkClient({
  wsUrl: '',
})

ctx.onData('#', (data) => {
  console.log(data)
})

ctx.sendAlert('error', 'error message')
