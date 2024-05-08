import type { BaseClient } from '@/types'

export function clientPlugin(_client: BaseClient) {
  const client = {
    getConnectedClients() {
      return []
    },
    getPendingClients() {
      return []
    },
  }

  return { client }
}
