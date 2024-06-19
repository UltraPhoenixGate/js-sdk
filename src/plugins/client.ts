import type { BaseClient, Client } from '@/types'

export interface AddActiveSensorParams {
  name: string
  description: string
  collectionInfo: {
    dataType: 'json' | 'metrics' | string
    collectionPeriod: number
    ipAddress: string
    collectionEndpoint: string
    authToken?: string
    customLabels?: string
  }
}

export function clientPlugin(_client: BaseClient) {
  const client = {
    getConnectedClients() {
      return _client.http.get<Client[]>('/auth/client/connected')
    },
    getPendingClients() {
      return _client.http.get<Client[]>('/auth/client/pending')
    },
    addActiveSensor(params: AddActiveSensorParams) {
      return _client.http.post<Client>('/auth/client/add_active_sensor', params)
    },
  }

  return { client }
}
