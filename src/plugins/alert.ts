import type { BaseClient, BaseModel, MessageCallback } from '@/types'

export type AlertLevel = 'info' | 'warning' | 'error'

export interface AlertPayload {
  level: AlertLevel
  text: string
}

export type AlertCallback = MessageCallback<AlertPayload>

export function alertPlugin(client: BaseClient) {
  const alert = {
    onAlert(level: AlertLevel, callback: AlertCallback) {
      client.on<AlertPayload>(`alert::${level}`, callback)
    },
    sendAlert(level: AlertLevel, text: string) {
      client.send<AlertPayload>(`alert::${level}`, { level, text })
    },
    getAlertRules() {
      return client.http.get<AlertRule[]>('/auth/alert/rules')
    },
    getAlertRecords(params: {
      clientID?: string
      startAt?: Date | string
      endAt?: Date | string
    }) {
      return client.http.get<AlertRecord[]>('/auth/alert/records', params)
    },
    createAlertRule(rule: AlertRule) {
      return client.http.post<AlertRule>('/auth/alert/rules', rule)
    },
    updateAlertRule(rule: AlertRule) {
      return client.http.put<AlertRule>(`/auth/alert/rules/${rule.name}`, rule)
    },
    deleteAlertRule(name: string) {
      return client.http.delete(`/auth/alert/rules/${name}`)
    },
  }

  return {
    alert,
  }
}

export type AlertType = 'warning' | 'error'

export type AlertRuleType = 'realtime' | 'static'

export type AlertRuleConditionType = 'operator' | 'event'

export type AlertRuleConditionOperator = 'eq' | 'ne' | 'gt' | 'lt'

export type AlertActionType = 'email' | 'sms' | 'webhook'

// AlertRecord interface
export interface AlertRecord extends BaseModel {
  clientID: string
  ruleName: string
  level: AlertType
}

// AlertRule interface
export interface AlertRule {
  type: AlertRuleType
  name: string
  summary?: string // Optional field
  description?: string // Optional field
  level: AlertType
  conditions: AlertRuleCondition[]
  actions?: AlertAction[] // Optional field
}

// AlertRuleCondition interface
export interface AlertRuleCondition {
  sensorID: string
  metric: string
  type: AlertRuleConditionType
  payload: AlertRuleConditionPayloadOperator | AlertRuleConditionPayloadEvent
}

// AlertRuleConditionPayloadOperator type
export interface AlertRuleConditionPayloadOperator {
  operator: AlertRuleConditionOperator
  value: number
}

// AlertRuleConditionPayloadEvent type
export interface AlertRuleConditionPayloadEvent {
  eventName: string
}

// AlertAction type
export interface AlertAction {
  type: AlertActionType
  payload?: any // Optional field, assuming any payload is possible
}
