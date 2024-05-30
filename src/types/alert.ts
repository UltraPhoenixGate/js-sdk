import type { Client } from './client'
import type { BaseModel } from './shared'

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
  client: Client
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
