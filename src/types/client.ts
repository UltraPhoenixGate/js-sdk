import type { BaseModel } from './shared'

export interface Client extends BaseModel {
  id: string
  name: string
  description: string
  status: ClientStatus
  type: ClientType
}

export type ClientStatus = 'pending' | 'active' | 'expired' | 'disabled'
export type ClientType = 'plugin' | 'sensor'

export interface Permission extends BaseModel {
  clientId: number
  topic: string
  type: PermissionType
}

export enum PermissionType {
  Read = 1,
  Write,
}
