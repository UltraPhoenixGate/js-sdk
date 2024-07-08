import type { AlertRecord, AlertRule, BaseClient, MessageCallback } from '@/types'

export type AlertLevel = 'info' | 'warning' | 'error' | (string & NonNullable<unknown>)

export interface AlertPayload {
  level: AlertLevel
  text: string
}

export type AlertCallback = MessageCallback<AlertPayload>

export function alertPlugin(client: BaseClient) {
  const alert = {
    onAlert(level: AlertLevel, callback: AlertCallback) {
      client.ws.on<AlertPayload>(`alert::${level}`, callback)
    },
    sendAlert(level: AlertLevel, text: string) {
      return client.ws.send<AlertPayload>(`alert::${level}`, { level, text })
    },
    getAlertRules() {
      return client.http.get<{ rules: AlertRule[] }>('/auth/alert/rules')
    },
    getAlertRecords(params: {
      clientID?: string
      startAt?: Date | string
      endAt?: Date | string
    }) {
      return client.http.get<AlertRecord[]>('/auth/alert/records', params)
    },
    createAlertRule(rule: AlertRule) {
      return client.http.post<{ rule: AlertRule }>('/auth/alert/rule', rule)
    },
    updateAlertRule(rule: AlertRule) {
      return client.http.put<{ rule: AlertRule }>(`/auth/alert/rule`, rule)
    },
    deleteAlertRule(name: string) {
      return client.http.delete(`/auth/alert/rule`, { name })
    },
  }

  return {
    alert,
  }
}
