import type { BaseClient, SystemInfo } from '@/types'

export function systemPlugin(client: BaseClient) {
  const system = {
    async getSystemInfo() {
      return client.http.get<SystemInfo>('/auth/system/info')
    },
  }

  return { system }
}
