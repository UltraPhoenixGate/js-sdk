import WebSocket from 'isomorphic-ws'
import type { BaseClientOptions } from './sdk'
import type { MessageCallback } from './types'

export class WebSocketService {
  private ws: WebSocket
  private connectHandler: () => void = () => {}
  private disconnectHandler: () => void = () => {}
  private onConnectError: (error: WebSocket.ErrorEvent) => void = () => {}

  constructor(private opt: BaseClientOptions) {
    this.ws = new WebSocket(opt.baseUrl, {
      headers: {
        Authorization: `Bearer ${opt.token || ''}`,
      },
    })

    this.ws.onopen = () => {
      console.log('WebSocket connection established')
      this.connectHandler()
    }

    this.ws.onclose = () => {
      console.log('WebSocket connection closed')
      this.disconnectHandler()
      setTimeout(() => {
        console.log('Reconnecting...')
        this.reconnect()
      }, 1000)
    }

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error)
      this.onConnectError(error)
    }

    this.ws.onmessage = (message) => {
      // 这里处理接收到的消息
      console.log('Received:', message.data)
      const { topic, payload } = JSON.parse(message.data.toString())
      const callbacks = this.topics.get(topic) || []
      callbacks.forEach(callback => callback(payload))
    }
  }

  private topics = new Map<string, MessageCallback[]>()

  private reconnect() {
    this.ws = new WebSocket(this.opt.baseUrl, {
      headers: {
        Authorization: `Bearer ${this.opt.token || ''}`,
      },
    })
  }

  on<T>(topic: string, callback: MessageCallback<T>) {
    const callbacks = this.topics.get(topic) || []
    callbacks.push(callback)
    this.topics.set(topic, callbacks)
  }

  send<T>(topic: string, payload: T) {
    if (this.ws.readyState !== this.ws.OPEN)
      throw new Error('WebSocket connection is not established')

    console.log('send', topic, payload)
    this.ws.send(JSON.stringify({ topic, payload }))
  }

  setToken(t: string) {
    this.opt.token = t
    this.ws = new WebSocket(this.opt.baseUrl, {
      headers: {
        Authorization: `Bearer ${this.opt.token || ''}`,
      },
    })
  }

  get isReady() {
    return this.ws.readyState === this.ws.OPEN
  }

  get status() {
    switch (this.ws.readyState) {
      case this.ws.CONNECTING:
        return 'connecting'
      case this.ws.OPEN:
        return 'connected'
      case this.ws.CLOSED:
        return 'closed'
      default:
        return 'error'
    }
  }

  onDisconnect(callback: any) {
    this.disconnectHandler = callback
  }

  onConnect(callback: any) {
    this.connectHandler = callback
  }

  onError(callback: any) {
    this.onConnectError = callback
  }
}
