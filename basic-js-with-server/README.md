# basic-js-with-server

## Setting up auth

The `clientID` and `privateKey` are read from environment variables in the `constants.py` file. Either set them like this:

```bash
export CLIENT_ID="abcdefghijklmnopqrstuvwxyz"
export CLIENT_KEY="$(cat privateKey.pem)"
```

or edit the `constants.py` file directly.

## Running the sample

To run this sample, you'll need to have [python](https://www.python.org/) and [poetry](https://python-poetry.org/) installed.

```bash
poetry install
poetry run fastapi dev
```

The web server should be running on http://127.0.0.1:8000.
* Open the URL in the browser
* Within 5-10 seconds, the browser should request your camera/microphone, and you'll see yourself.
* Copy-paste the URL to a new tab, and you should get a two-way video call.

## Troubleshooting

If it looks like nothing is happening, look at the server terminal for any errors.
