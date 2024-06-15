import { useEffect, useState } from 'preact/hooks'
import type { Camera, Client } from 'ultraphx-js-sdk'

import './app.css'
import { ctx } from './ctx'

export function App() {
  return (
    <>
      <ConnectedClients />
      <Cameras />
    </>
  )
}

function ConnectedClients() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ctx.client.getConnectedClients().then((res) => {
      setClients(res)
      setLoading(false)
    })
  }, [])

  return (
    <div>
      <h2>已连接客户端</h2>
      {loading
        ? (
          <p>加载中...</p>
          )
        : (
          <ul>
            {clients.map(client => (
              <li key={client.id}>{client.name}</li>
            ))}
          </ul>
          )}
    </div>
  )
}

function Cameras() {
  const [cameras, setCameras] = useState<Camera[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ctx.camera.getCameras().then((res) => {
      setCameras(res.cameras)
      setLoading(false)
    })
  }, [])

  return (
    <div>
      <h2>摄像头</h2>
      {loading
        ? (
          <p>加载中...</p>
          )
        : (
          <ul>
            {cameras.map(camera => (
              <li key={camera.id}>{camera.name}</li>
            ))}
          </ul>
          )}
    </div>
  )
}
