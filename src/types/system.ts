export interface SystemInfo {
  version: string
  uptime: number
  load: string
  memory: {
    total: number
    used: number
    available: number
  }
  disk: {
    total: number
    used: number
    available: number
  }
}

export interface SystemScreenItem {
  no: number
  current_resolution: {
    width: number
    height: number
  }
  min_resolution: {
    width: number
    height: number
  }
  max_resolution: {
    width: number
    height: number
  }
  monitors: Array<{
    id: string
    modes: Array<{
      resolution: {
        width: number
        height: number
      }
      refresh_rates: Array<{
        value: number
        current: boolean
        preferred: boolean
      }>
    }>
    primary: boolean
    size: {
      width: number
      height: number
    }
    connected: boolean
    resolution: {
      width: number
      height: number
    }
    position: {
      x: number
      y: number
    }
  }>
}

export interface NetworkInfoItem {
  ip: string
  connected: boolean
  device: string
  deviceType: 'ethernet' | 'wifi'
}
