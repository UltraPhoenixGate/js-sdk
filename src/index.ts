import { ClientWithPlugins, type HubClientOptions, createHubClient } from './hub'
import { alertPlugin, dataPlugin } from './plugins'

export * from './hub'
export * from './types'
export * from './plugins'

export function createSdkClient(opt: HubClientOptions) {
  const client = new ClientWithPlugins(createHubClient(opt))
    .use(alertPlugin)
    .use(dataPlugin)
    .build()

  return client
}

export type SdkContext = ReturnType<typeof createSdkClient>
