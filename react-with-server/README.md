# Pexip Tutorial: Web VPaaS

In this tutorial we will learn how to build a videoconferencing app for VPaaS
that will work in any device with a browser. This tutorial only have the code
examples. The tutorial explaining all the steps and each small detail, can be
found in our
[Developer Portal](https://developer.pexip.com/docs/category/vpaas).

## Requirements

Before starting any of these tutorials, you will need to comply with the
following requirements:

- **NodeJS and npm:** You need to install these tools on your system. There are
  packages for any OS and normally you would install both together. The
  recommended versions are the following:

  | NodeJS   | NPM     |
  | -------- | ------- |
  | v20.12.2 | v10.5.0 |

- **Text editor:** You can use whatever you want, although our recommendation is
  to use Visual Studio Code.
- **Browser:** You will need a browser with WebRTC support. The recommendation
  is to use the latest version of Google Chrome.
- **TypeScript and React knowledge:** You will need solid TypeScript knowledge
  if you want to take advantage of these tutorials. Having some knowledge of
  React is recommended, but not essential.
- **Access to VPaaS:** This is the server that the app will use to connect. You
  will need to generate a `privateKey` and `publicKey`. After provisioning your
  app in VPaaS, you will get the `clientId`. If you have any doubt about this,
  contact your Pexip representative.

## Steps

In this project we define several steps. Each step is divided in two sub-steps
`Exercise` for the starting point and `Solution` with the completed code. Each
sub-step is located in a separated `branch`. This division allows the student to
continue the tutorial from any point without having to develop the whole
application and check the solution.

Here is a list of the available `branches` (only for `Exercise`):

- `Step.01-Exercise-Server`: Build the HTTP endpoints that our client
  application will use.
- `Step.02-Exercise-Create-a-meeting`: Create a component in the client
  application that will create a new meeting.
- `Step.03-Exercise-Join-a-meeting`: Create a component to join the meeting that
  was created in the previous lesson.
- `Step.04-Exercise-Mute-audio-and-video`: Create a toolbar at the bottom with
  buttons to disconnect, mute audio and video.
- `Step.05-Exercise-Change-devices`: Create a settings dialog to choose camera,
  microphone and speaker.
- `Step.06-Exercise-Simulcast`: Subscribe to different stream resolutions to
  optimize bandwidth.
- `Step.07-Exercise-Presentation`: Start screen sharing or receive the
  presentation from another user.

If you have any question about this tutorial, don't hesitate to contact us in
our [Community Portal](https://community.pexip.com).

## Available Scripts

In the project directory, you can run several scripts to download the
dependencies and build the project.

### Download the dependencies

The first step is to download all the available dependencies. First we will do
it from the server:

```bash
$ cd server
$ npm install
```

And now for the client:

```bash
$ cd client
$ npm install
```

### Run in development mode

To run the app in development mode, we will need to run first the server:

```bash
$ cd server
$ npm start
```

And now the client:

```bash
$ cd client
$ npm start
```

The server will run in the port `3000` and the client in `4000`.

Now open [https://localhost:4000](https://localhost:4000) to view it in your
browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### Build for production

If we will to build the application for production, we will need to follow the
next steps. First we generate the package for the server:

```bash
$ cd server
$ npm run build
```

This will generate the production package in the `server/build` folder.

And now the client:

```bash
$ cd client
$ npm run build
```

The result of the previous command will be the `client/dist` folder.

The commands correctly bundles the app in production mode and optimizes the
build for the best performance.

The build is minified and the filenames include the hashes.

Now your app is ready to be deployed!
