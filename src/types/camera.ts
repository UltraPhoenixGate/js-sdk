import type { BaseModel } from './shared'

export interface Camera extends BaseModel {
  name: string
  description: string
  streamUrl: string
  xAddr: string
  protocol: 'rtsp' | 'http' | string
  enabled: boolean
  manufacturer: string
  cameraModel: string
  IsOnvif: boolean
  extra: string
}

export interface OnvifDevice {
  name: string
  xAddr: string
  manufacturer: string
  model: string
}
