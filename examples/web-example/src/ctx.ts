import { createSdkClient } from 'ultraphx-js-sdk'

export const ctx = createSdkClient({
  baseUrl: 'http://127.0.0.1:8080/api',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiIsImlkIjoiMzI3MWZiMDQtYjA4YS00ODZmLTk4ZGMtOWY4MTQwYmI1OTIzIiwidHlwZSI6ImxvY2FsIn0.ELwDfH5lyrPSnSlbnsmNc5tewo80IxbhZkYEtd2bzgs',
  debug: true,
})
