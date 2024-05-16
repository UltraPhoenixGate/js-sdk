import type { BaseClient, Client } from '@/types'

export function clientPlugin(_client: BaseClient) {
  const client = {
    getConnectedClients() {
      return _client.http.get<Client[]>('/auth/client/connected')
    },
    getPendingClients() {
      return _client.http.get<Client[]>('/auth/client/pending')
    },
  }

  return { client }
}
