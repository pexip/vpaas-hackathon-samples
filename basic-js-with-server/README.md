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

If it looks like nothing is happening, look at both the server terminal and the Javascript console for any errors.

#### Command not found: fastapi

* Ensure all poetry dependencies are installed (`poetry install`)
* Ensure command is being run from within poetry. Either using `poetry shell` or `poetry run <command>`

#### RuntimeError: Either CRUD_ADDRESS, CLIENT_ID or CLIENT_KEY is unset

Check environment variables are set correctly.

#### ValueError: Could not deserialize key data.

Something is wrong with the `CLIENT_KEY` variable.

#### Failed to request access token. Body={'reason': 'invalid_client', 'status': 400}

* Something is wrong with the `CLIENT_ID`
* The `CLIENT_KEY` being used isn't matched with the `CLIENT_ID`
* The `CLIENT_KEY`/`CLIENT_ID` have been paired to a different `CRUD_ADDRESS`

#### Failure. Body={'status': 404, 'reason': 'Invalid meeting ID'}.

The meeting you requested to join does not exist. Remove the `?id=` parameter from the URL to create a new meeting.

#### Uncaught GoneError: Meeting is in the wrong state to be joined

The meeting you requested to join has ended. Remove the `?id=` parameter from the URL to create a new meeting.
