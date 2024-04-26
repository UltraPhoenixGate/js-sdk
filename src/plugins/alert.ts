import type { HubClient, MessageCallback } from '../types'

export type AlertLevel = 'info' | 'warning' | 'error'

export interface AlertPayload {
  level: AlertLevel
  text: string
}

export type AlertCallback = MessageCallback<AlertPayload>

export function alertPlugin(client: HubClient) {
  return {
    onAlert(level: AlertLevel, callback: AlertCallback) {
      client.on<AlertPayload>(`alert::${level}`, callback)
    },
    sendAlert(level: AlertLevel, text: string) {
      client.send<AlertPayload>(`alert::${level}`, { level, text })
    },
  }
}
