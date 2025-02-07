# basic-js

## Setting up auth

As this is a single page app, authentication with VPaaS is done on the client. Not for production use, but this is a
hackathon!

In `index.html`:
* Set `CLIENT_ID` to your clientID
* Set `CLIENT_SECRET` to the contents of your `privateKey.pem` file


<details>
<summary>Example of how this should look</summary>

![basic-js.png](../.images/auth-basic-js.png)

</details>

## Running the sample

To run this sample, you can just open the file in a web browser (e.g. `file:///home/user/vpaas-hackathon-samples/basic-js/index.html`)
* Within 5-10 seconds, the browser should request your camera/microphone, and you'll see yourself.
* Copy-paste the URL to a new tab, and you should get a two-way video call.

## Troubleshooting

If it looks like nothing is happening, there is likely an error in the JavaScript console. Use `F12` to see what is wrong

#### Uncaught TypeError: "pkcs8" must be PKCS#8 formatted string

Something is wrong with the `CLIENT_SECRET` variable.

#### Uncaught BadRequestError: invalid_client

* Something is wrong with the `CLIENT_ID`
* The `CLIENT_SECRET` being used isn't matched with the `CLIENT_ID`
* The `CLIENT_SECRET`/`CLIENT_ID` are being used with the wrong `CRUD_ADDRESS`

#### Uncaught DOMException: The request is not allowed by the user agent or the platform in the current context

Check browser has camera/microphone permissions

#### Uncaught NotFoundError: Meeting not found

The meeting you requested to join does not exist. Remove the `?id=` parameter from the URL to create a new meeting.

#### Uncaught GoneError: Meeting is in the wrong state to be joined

The meeting you requested to join has ended. Remove the `?id=` parameter from the URL to create a new meeting.
