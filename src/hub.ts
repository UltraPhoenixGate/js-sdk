import WebSocket from 'isomorphic-ws'

import type { HubClient, MessageCallback, Plugin } from './types'

interface HubClientOptions {
  wsUrl: string
}

export function createHubClient(opt: HubClientOptions): HubClient {
  const topics = new Map<string, MessageCallback[]>()
  let ws: WebSocket = new WebSocket(opt.wsUrl)
  let connectHandler: () => void = () => {}
  let disconnectHandler: () => void = () => {}
  let onConnectError: (error: WebSocket.ErrorEvent) => void = () => {}

  function reconnect() {
    ws = new WebSocket(opt.wsUrl)
  }

  ws.onopen = () => {
    console.log('WebSocket connection established')
    connectHandler()
  }

  ws.onclose = () => {
    console.log('WebSocket connection closed')
    disconnectHandler()
    setTimeout(() => {
      console.log('Reconnecting...')
      reconnect()
    }, 1000)
  }

  ws.onerror = (error) => {
    console.error('WebSocket error:', error)
    onConnectError(error)
  }

  ws.onmessage = (message) => {
    // 这里处理接收到的消息
    console.log('Received:', message.data)
    const { topic, payload } = JSON.parse(message.data.toString())
    const callbacks = topics.get(topic) || []
    callbacks.forEach(callback => callback(payload))
  }

  const hubClient: HubClient = {
    get isReady() {
      return ws.readyState === ws.OPEN
    },
    get status() {
      switch (ws.readyState) {
        case ws.CONNECTING:
          return 'connecting'
        case ws.OPEN:
          return 'connected'
        case ws.CLOSED:
          return 'closed'
        default:
          return 'error'
      }
    },
    onDisconnect(callback) {
      disconnectHandler = callback
    },
    onConnect(callback) {
      connectHandler = callback
    },
    onError(callback) {
      onConnectError = callback
    },
    ws,
    on<T>(topic: string, callback: MessageCallback<T>) {
      const callbacks = topics.get(topic) || []
      callbacks.push(callback)
      topics.set(topic, callbacks)
    },
    send<T>(topic: string, payload: T) {
      if (ws.readyState !== ws.OPEN)
        throw new Error('WebSocket connection is not established')

      // TODO: 实现发送逻辑
      console.log('send', topic, payload)
      ws.send(JSON.stringify({ topic, payload }))
    },

    use<T>(plugin: Plugin<T>) {
      return Object.assign(this, plugin(this))
    },
  }

  return hubClient
}
