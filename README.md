# VPaaS Hackathon Samples

This repo contains some stripped down examples for quickly interacting with the VPaaS backend. It is not intended to be
used as production ready code.

## Onboarding

To be onboarded onto VPaaS, you must first generate a public/private key pair

```
openssl genpkey -algorithm rsa -pkeyopt rsa_keygen_bits:4096 -out privateKey.pem
openssl pkey -in privateKey.pem -pubout > publicKey.pem
```

Upload _only_ the `publicKey.pem` to Discord and ask a Pexip member to onboard you.
They will give you back a `clientId` which you can use with your `privateKey.pem`.

## Samples

There are three examples in this repo with increasing amount of complexity

### Client-only

#### `basic-js`
**Single file, pure HTML+JS example.**

This is the most basic example we could come up with. It should hopefully be the easiest to understand how to use the
VPaaS SDK.

### Client and Server

These are closer to the way you would typically write an app that uses VPaaS; the client-server approach makes it easier
to implement your own custom app logic and communicate between different clients.

#### `basic-js-with-server`
**Python based server with standard HTML+JS client.**

Expands on the `basic-js` example by introducing a server that you run.

#### `react-with-server`
**NodeJS based server with npm managed client**

This example is recommended for those most familiar with modern frontend tooling.
