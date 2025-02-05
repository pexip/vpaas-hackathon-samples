# Pexip Tutorial: Web VPaaS Server

This is an example server for VPaaS. You can run it in development mode through
the following command:

```bash
$ npm start
```

## Define the configuration file

Create configuration file in the path `server/config/default.json`:

```json
{
  "vpaas": {
    "address": "https://crud.pexip.rocks",
    "credentials": {
      "clientId": "",
      "privateKeyPath": "./config/credentials/privateKey.pem"
    }
  },
  "server": {
    "port": 3000
  }
}
```

## Testing the server

We can test the server using cURL:

- Get the API address:

  ```bash
  $ curl https://localhost:3000/api-address --insecure
  ```

- Create a meeting:

  ```bash
  $ curl -X POST https://localhost:3000/meetings --insecure
  ```

- Create a participant for the previous meeting:

  ```bash
  $ curl -X POST https://localhost:3000/meetings/<meetingId>/participants --insecure
  ```
