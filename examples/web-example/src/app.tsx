import { useEffect, useState } from 'preact/hooks'
import type { AddActiveSensorParams, Camera, Client, NetworkInfoItem, ScannedSensorMeta, SystemScreenItem } from 'ultraphx-js-sdk'

import './app.css'
import { ctx } from './ctx'

export function App() {
  return (
    <>
      <ConnectedClients />
      <Cameras />
      <Data />
      <LocalClient />
      <Monitor />
      <Network />
      <ScanSensors />
    </>
  )
}

function ConnectedClients() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    ctx.client.getConnectedClients().then((res) => {
      setClients(res)
      setLoading(false)
    })
  }, [])

  return (
    <div>
      <h2>已连接客户端</h2>
      <button onClick={() => setIsAdding(!isAdding)}>添加活动传感器</button>
      {isAdding && <AddActiveSensor />}
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

function AddActiveSensor() {
  const params: AddActiveSensorParams = {
    name: '',
    description: '',
    collectionInfo: {
      dataType: 'json',
      collectionPeriod: 1,
      ipAddress: '',
      collectionEndpoint: '',
    },
  }

  const [loading, setLoading] = useState(false)

  const onSubmit = async () => {
    setLoading(true)
    await ctx.client.addActiveSensor(params)
    setLoading(false)
  }

  return (
    <div>
      <h2>添加活动传感器</h2>
      <form>
        <label>
          名称
          <input type="text" value={params.name} onInput={e => params.name = e.currentTarget.value} />
        </label>
        <label>
          描述
          <input type="text" value={params.description} onInput={e => params.description = e.currentTarget.value} />
        </label>
        <label>
          数据类型
          <select value={params.collectionInfo.dataType} onChange={e => params.collectionInfo.dataType = e.currentTarget.value}>
            <option value="json">JSON</option>
            <option value="metrics">Metrics</option>
          </select>
        </label>
        <label>
          采集周期
          <input type="number" value={params.collectionInfo.collectionPeriod} onInput={e => params.collectionInfo.collectionPeriod = Number.parseInt(e.currentTarget.value)} />
        </label>
        <label>
          IP 地址
          <input type="text" value={params.collectionInfo.ipAddress} onInput={e => params.collectionInfo.ipAddress = e.currentTarget.value} />
        </label>
        <label>
          采集端点
          <input type="text" value={params.collectionInfo.collectionEndpoint} onInput={e => params.collectionInfo.collectionEndpoint = e.currentTarget.value} />
        </label>
        <button type="button" onClick={onSubmit} disabled={loading}>提交</button>
      </form>
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

function Data() {
  const [data, setData] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ctx.data.query('{__name__=\'temperature\'}').then((res) => {
      setData(JSON.stringify(res, null, 2))
      setLoading(false)
    })
  }, [])

  return (
    <div>
      <h2>数据</h2>
      {loading
        ? (
          <p>加载中...</p>
          )
        : (
          <pre>{data}</pre>
          )}
    </div>
  )
}

function LocalClient() {
  const [loading, setLoading] = useState(true)
  const [exist, setExist] = useState(false)

  useEffect(() => {
    ctx.client.isLocalClientExist().then((res) => {
      setExist(res.exist)
      setLoading(false)
    })
  }, [])

  return (
    <div>
      <h2>本地客户端</h2>
      {loading
        ? (
          <p>加载中...</p>
          )
        : (
          <p>{exist ? '已存在' : '不存在'}</p>
          )}
    </div>
  )
}

function Monitor() {
  const [resolutions, setResolutions] = useState<SystemScreenItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ctx.system.getMonitorResolutions().then((res) => {
      setResolutions(res)
      setLoading(false)
    })
  }, [])

  return (
    <div>
      <h2>显示器配置</h2>
      {loading
        ? (
          <p>加载中...</p>
          )
        : (
          <ul>
            {resolutions.map(resolution => (
              <li key={resolution.no}>
                {resolution.current_resolution.width}
                x
                {resolution.current_resolution.height}
              </li>
            ))}
          </ul>
          )}
    </div>
  )
}

function Network() {
  const [networks, setNetworks] = useState<NetworkInfoItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ctx.system.getNetworkInfos().then((res) => {
      setNetworks(res)
      setLoading(false)
    })
  }, [])

  return (
    <div>
      <h2>网络</h2>
      {loading
        ? (
          <p>加载中...</p>
          )
        : (
          <ul>
            {networks.map(network => (
              <li key={network.ip}>{network.ip}</li>
            ))}
          </ul>
          )}
    </div>
  )
}

function ScanSensors() {
  const [sensorMeta, setSensorMeta] = useState<ScannedSensorMeta[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ctx.client.scanActiveSensors().then((res) => {
      setSensorMeta(res)
      setLoading(false)
    })
  }, [])

  return (
    <div>
      <h2>扫描传感器</h2>
      {loading
        ? (
          <p>加载中...</p>
          )
        : (
          <ul>
            {sensorMeta.map(sensor => (
              <li key={sensor.ip}>{sensor.name}</li>
            ))}
          </ul>
          )}
    </div>
  )
}
