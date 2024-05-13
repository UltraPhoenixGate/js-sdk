import { createSdkClient } from 'ultraphx-js-sdk'

const ctx = createSdkClient({
  baseUrl: 'http://localhost:8080/api',
  token: 'eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkExMjhHQ00ifQ.gQF0faBvUX9t3FjMngE5dOWetO3NcxiFRUFMAfhhd-4uS4jQwgpu9aCy9d7SmOtSdJqv2dNyxf90PI8hzNsNta2D20K8bDgD5hPjQzn2wrOhiA460mb9oZBZB3hJwNkZaZ2DE1lpKlQJa7rv53Bgz4Ilscva7n8mJ3zzvBE2JQM5gclDlZd9mqDaa1cIPv1t5LzrQBpN7aH_eCBLO1G1osuTQWrAhu-z7MHWB27LcWuFD1jGVP9DlPQYlwoRHPNtTo4Av325tpo4Iojh8gFxzsCcbkhz7KSMiGO-IcRPdKKSlDiOx0mLvcU8VhJWGsfZwa27vmKYFZ0_zABoxMAjfA.bsD2TGMTrEZoyA9g.4UQEfFnGXtnT0Gy4B4r91Tq-3_BGFzRYwuLcAYmZRycrqzdMhEu5rqRNh43LPV3UTKz-NaRdfGds8qwgqyoLkbBuEkErbaes3OWlcgwZOFtwEW8Q75iUaJdCPddAU-_hy78A0tWI7GFdvV0D2Zff-a6B0DUnc9yTsyjEICCxGABmBGUI8Hm1VFmFijmjDOJbjqqoPWDslcjQ9DQ.nw6bnKDx_2uGiEMyXEFBqw',
  debug: true,
})

async function main() {
  ctx.ws.onConnect(async () => {
    while (true) {
      await ctx.data.sendData({
        temperature: 25,
        humidity: 50,
      })
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  })
}

main()
