# react-with-server

## Setting up auth

* Copy your `privateKey.pem` to `server/config/privateKey.pem`.
* Edit the `clientId` in `server/config/default.json`.

## Running the sample

To run this sample, you'll need to have [nodejs](https://nodejs.org) installed. You must be running a version of Node
at major version _22 or below_ (e.g. v22.13.1); major version 23 is _not_ supported.


Both the `server` and `client` need to be spun up separately, but the process is the same for both projects.

_terminal 1:_
```bash
cd server
npm install
npm start
```

_terminal 2:_
```bash
cd client
npm install
npm start
```

Starting the client should open the web browser automatically. If not, it is running on http://127.0.0.1:4000

* Click `Create Meeting`
* Within 5-10 seconds, the browser should request your camera/microphone, and you'll see your self view at the top right.
* Copy-paste the URL to a new tab, and you should get a two-way video call.

## Troubleshooting
