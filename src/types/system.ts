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
