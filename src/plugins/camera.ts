import type { BaseClient } from '@/types'
import type { Camera, OnvifDevice } from '@/types/camera'

export interface AddCameraParams {
  name: string
  description: string
  streamUrl: string
  xAddr?: string
  protocol?: 'rtsp' | 'http' | string
  enabled?: boolean
  manufacturer?: string
  cameraModel?: string
  IsOnvif?: boolean
  extra?: string
}

export interface OpenStreamParams {
  id: string
  fps?: number
  width?: number
  height?: number
}

export interface GetOnvifDeviceInfoParams {
  xAddr: string
  user: string
  password: string
}

export class CameraService {
  private client: BaseClient

  constructor(client: BaseClient) {
    this.client = client
  }

  async getCameras() {
    const res = await this.client.http.get<{ cameras: Camera[] }>('/auth/cameras')
    return res
  }

  async addCamera(params: AddCameraParams) {
    const res = await this.client.http.post<{ camera: Camera }>('/auth/camera', { ...params })
    return res
  }

  async deleteCamera(id: string) {
    await this.client.http.delete('/auth/camera', { id })
  }

  async updateCamera(params: Camera) {
    await this.client.http.put('/auth/camera', { params })
  }

  async getCurrentFrame(streamUrl: string) {
    const res = await this.client.http.get<{ image: string }>('/auth/camera/capture', { streamUrl })
    return res
  }

  async openStream(params: OpenStreamParams) {
    const paramsQueryObj = Object.fromEntries(
      Object.entries(params).map(([key, value]) => [key, value.toString()]),
    )
    return {
      url: `${this.client.http.baseUrl}/auth/camera/stream?${new URLSearchParams(paramsQueryObj).toString()}`,
    }
  }

  async scanOnvifDevices() {
    const res = await this.client.http.get<{ devices: OnvifDevice[] }>('/auth/camera/onvif/scan')
    return res
  }

  async getOnvifDeviceInfo(params: GetOnvifDeviceInfoParams) {
    const res = await this.client.http.get<{
      info: {
        Manufacturer: string
        Model: string
      }
      streamUrl: string
    }>('/auth/camera/onvif/info', params)
    return res
  }
}

// 导出相机服务实例
export function cameraPlugin(client: BaseClient) {
  return { camera: new CameraService(client) }
}
