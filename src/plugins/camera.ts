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

// 导出相机服务实例
export function cameraPlugin(client: BaseClient) {
  const camera = {
    async getCameras() {
      const res = await client.http.get<{ cameras: Camera[] }>('/auth/cameras')
      return res
    },

    async addCamera(params: AddCameraParams) {
      const res = await client.http.post<{ camera: Camera }>('/auth/camera', { ...params })
      return res
    },

    async deleteCamera(id: string) {
      await client.http.delete('/auth/camera', { id })
    },
    async updateCamera(params: Camera) {
      await client.http.put('/auth/camera', { params })
    },

    async getCurrentFrame(streamUrl: string) {
      const res = await client.http.get<{ image: string }>('/auth/camera/capture', { streamUrl })
      return res
    },

    async openStream(params: OpenStreamParams) {
      const paramsQueryObj = Object.fromEntries(
        Object.entries(params).map(([key, value]) => [key, value.toString()]),
      )
      return {
        url: `${client.http.baseUrl}/auth/camera/stream?${new URLSearchParams(paramsQueryObj).toString()}`,
      }
    },

    /**
     * 搜索 onvif 设备
     */
    async scanOnvifDevices() {
      const res = await client.http.get<{ devices: OnvifDevice[] }>('/auth/camera/onvif/scan')
      return res
    },

    /**
     * 获取 onvif 设备信息
     * @param params
     */
    async getOnvifDeviceInfo(params: GetOnvifDeviceInfoParams) {
      const res = await client.http.get<{
        info: {
          Manufacturer: string
          Model: string
        }
        streamUrl: string
      }>('/auth/camera/onvif/info', params)
      return res
    },
  }
  return { camera }
}
