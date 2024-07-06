import type { BaseClient, NetworkInfoItem, SystemInfo, SystemScreenItem } from '@/types'

export function systemPlugin(client: BaseClient) {
  const system = {
    async getSystemInfo() {
      return client.http.get<SystemInfo>('/auth/system/info')
    },
    async getMonitorResolutions() {
      return client.http.get<SystemScreenItem[]>('/auth/system/get_resolutions')
    },
    async checkNetwork() {
      return client.http.get<{
        status: boolean
      }>('/auth/system/check_network')
    },
    async getNetworkInfos() {
      return client.http.get<NetworkInfoItem[]>('/auth/system/get_networks')
    },
    async openNetworkSettings() {
      return client.http.post('/auth/system/open_network_settings', {})
    },
    async setResolution(params: {
      monitorId: string
      width: number
      height: number
      freq: number
    }) {
      return client.http.post('/auth/system/set_resolution', params)
    },
  }

  return { system }
}
