import type { BaseModel } from './shared'

export interface Client extends BaseModel {
  id: string
  name: string
  description: string
  status: ClientStatus
  type: ClientType
  connection?: CollectionInfo
}

export type ClientStatus = 'pending' | 'active' | 'expired' | 'disabled'
export type ClientType = 'plugin' | 'sensor' | 'sensor_active'

export interface Permission extends BaseModel {
  clientId: number
  topic: string
  type: PermissionType
}

export enum PermissionType {
  Read = 1,
  Write,
}

export interface CollectionInfo {
  clientId: string
  dataType: 'json' | 'metrics'
  collectionPeriod: number
  lastCollectionTime: string
  ipAddress: string
  collectionEndpoint: string
  authToken?: string
  customLabels?: string
}
