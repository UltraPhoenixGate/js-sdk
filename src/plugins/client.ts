import type { BaseClient, Client } from '@/types'

export function clientPlugin(_client: BaseClient) {
  const client = {
    getConnectedClients() {
      return _client.http.get<Client[]>('/client/connected')
    },
    getPendingClients() {
      return _client.http.get<Client[]>('/client/pending')
    },
  }

  return { client }
}
