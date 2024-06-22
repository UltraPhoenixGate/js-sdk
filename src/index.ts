import { type BaseClientOptions, ClientWithPlugins, createBaseSdkClient } from './sdk'
import { alertPlugin, authPlugin, cameraPlugin, clientPlugin, dataPlugin } from './plugins'
import { systemPlugin } from './plugins/system'

export * from './sdk'
export * from './types'
export * from './plugins'

export function createSdkClient(opt: BaseClientOptions) {
  const client = new ClientWithPlugins(createBaseSdkClient(opt))
    .use(alertPlugin)
    .use(dataPlugin)
    .use(clientPlugin)
    .use(authPlugin)
    .use(cameraPlugin)
    .use(systemPlugin)
    .build()

  return client
}

export type SdkContext = ReturnType<typeof createBaseSdkClient>
