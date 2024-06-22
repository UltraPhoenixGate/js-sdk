import type { BaseClient, Client, ClientStatus } from '@/types'

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
    /**
     * 设置客户端状态
     * @param clientID
     * @param status
     */
    setClientStatus(clientID: string, status: ClientStatus) {
      return _client.http.post('/auth/client/set_client_status', { clientID, status })
    },
    /**
     * 删除客户端
     * @param clientID
     */
    removeClient(clientID: string) {
      return _client.http.post('/auth/client/remove_client', { clientID })
    },
  }

  return { client }
}
