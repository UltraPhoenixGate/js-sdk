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

      if (res.error)
        throw new Error(res.error)

      if (!res.data?.token)
        throw new Error('Invalid token')

      this.setToken(res.data.token)
      return res.data.token
    },
    async waitUntilActive() {
      // check until the auth is ready
      while (true) {
        const status = await client.http.get<{
          active: boolean
          status: 'pending' | 'active' | 'expired' | 'disabled'
        }>('/plugin/check_active')
        if (status.data?.active)
          break

        if (status.data?.status === 'expired')
          throw new Error('Token expired')

        if (status.data?.status === 'disabled')
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
