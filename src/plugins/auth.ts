import type { BaseClient, ClientType } from '@/types'

export function authPlugin(client: BaseClient) {
  const auth = {
    setToken(token: string) {
      client.http.setToken(token)
    },
    async registerSync(params: {
      name: string
      description: string
      type: ClientType
    }) {
      const res = await client.http.post<{
        token: string
      }>('/plugin/register', { ...params })

      this.setToken(res.token)
      return res.token
    },
    async waitUntilActive() {
      // check until the auth is ready
      while (true) {
        const res = await client.http.get<{
          active: boolean
          status: 'pending' | 'active' | 'expired' | 'disabled' | string
        }>('/plugin/check_active')
        if (res.active)
          break

        if (res.status === 'expired')
          throw new Error('Token expired')

        if (res.status === 'disabled')
          throw new Error('Token disabled')

        // wait for 1 second
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    },
    async register(params: {
      name: string
      description: string
      type: ClientType
    }) {
      const token = await this.registerSync(params)
      await this.waitUntilActive()
      return token
    },
  }

  return { auth }
}
