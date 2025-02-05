import express, { type RequestHandler } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import fs from 'fs'
import https from 'https'
import config from 'config'
import { v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken'
import { createApi, withToken } from '@pexip/vpaas-api'

const port: string = config.get('server.port')

const app = express()
app.use(helmet())

const createJwt = (): string => {
  const apiAddress: string = config.get('vpaas.apiAddress')
  const authEndpoint = `${apiAddress}/oauth/token`
  const clientId = config.get('vpaas.credentials.clientId')
  const privateKey = fs.readFileSync(
    config.get('vpaas.credentials.privateKeyPath')
  )

  const scope = [
    'meeting:create',
    'meeting:read',
    'meeting:write',
    'participant:create',
    'participant:read',
    'participant:write'
  ]
  const requestId = uuidv4()

  const token = jwt.sign(
    {
      iss: clientId, // Application Client UUID
      sub: clientId, // Application Client UUID
      aud: authEndpoint,
      scope: scope.join(' ')
    },
    privateKey,
    {
      algorithm: 'RS384',
      expiresIn: '60s',
      jwtid: requestId
    }
  )

  return token
}

const api = withToken(createJwt, config.get('vpaas.apiAddress'))(createApi())

app.use(
  cors({
    origin: 'https://localhost:4000'
  })
)

app.get('/api-address', (async (req, res) => {
  res.send(config.get('vpaas.apiAddress'))
}) as RequestHandler)

app.post('/meetings', (async (req, res) => {
  try {
    const response = await api.create()
    if (response.status === 200) {
      return res.json(response.data)
    } else {
      return res.status(500).send('Cannot create the meeting')
    }
  } catch (error) {
    return res.status(500).send('Cannot create the meeting')
  }
}) as RequestHandler)

app.post('/meetings/:meetingId/participants', (async (req, res) => {
  try {
    const response = await api.participants({ meetingId: req.params.meetingId })
    if (response.status === 200) {
      return res.json(response.data)
    } else {
      return res.status(500).send(`Cannot get participants from the meeting`)
    }
  } catch (error) {
    return res.status(500).send(`Cannot get participants from the meeting`)
  }
}) as RequestHandler)

const options = {
  key: fs.readFileSync('dev-certs/key.pem'),
  cert: fs.readFileSync('dev-certs/cert.pem')
}
const server = https.createServer(options, app)

server.listen(port, () => {
  console.log(
    `VPaaS server listening on port ${port}: https://localhost:${port}`
  )
})
