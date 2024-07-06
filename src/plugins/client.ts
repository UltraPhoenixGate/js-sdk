import type { BaseClient, Client, ClientStatus } from '@/types'

export interface AddActiveSensorParams {
  name: string
  description: string
  collectionInfo: {
    dataType: 'json' | 'metrics' | (string & NonNullable<unknown>)
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
    /**
     * 初始化本地客户端
     */
    setupLocalClient(params: {
      systemPassword: string
    }) {
      return _client.http.post<Client>('/client/local_client/setup', params)
    },
    /**
     * 登录本地客户端
     */
    loginLocalClient(params: {
      systemPassword: string
    }) {
      return _client.http.post<{
        token: string
      }>('/client/local_client/login', params)
    },
    /**
     * 是否存在本地客户端（是否初始化）
     */
    isLocalClientExist() {
      return _client.http.get<{ exist: boolean }>('/client/local_client/exist')
    },
  }

  return { client }
}
