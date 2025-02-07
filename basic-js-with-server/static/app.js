// This is a demo of how you can use the vpaas-sdk and vpaas-api in the browser
// This is not a production ready code and should not be used as is
// This is just a proof of concept

// This is a sdk for the basic vpaas functionality
import * as sdk from "https://cdn.skypack.dev/@pexip/vpaas-sdk@18.0.4";

// CONSTANTS

// This is the number of audio and video streams you want to receive
const RECV_AUDIO_COUNT = 9;
const RECV_VIDEO_COUNT = 9;

// This is a set to keep track of the streams you requested
const REQUESTED_STREAMS = new Set();
const encodeId = (producerId, streamId) => `${producerId}-${streamId}`;
const decodeId = (id) => id.split("-");

// you can specify the id you want to join here or via query params ?id=123, if empty we create a new meeting
const MEETING_ID = "";
let meetingId =
  new URLSearchParams(window.location.search).get("id") ?? MEETING_ID;

if (!meetingId) {
    const data = await ((await fetch('/api/v1/create', {method: 'POST'})).json());
    meetingId = data.id;
    history.pushState(
        null,
        null,
        window.location.pathname + `?id=${meetingId}`,
    );
}

// Things you would normally run on the frontend. Create instances of the sdk
const vpaasSignals = sdk.createVpaasSignals();
const vpaas = sdk.createVpaas({ vpaasSignals, config: {} });

const participant = await ((await fetch(`/api/v1/meetings/${meetingId}/participants`, {method: 'POST'})).json());

// Join the meeting (no audio video yet)
await vpaas.joinMeeting({
  apiAddress: participant.api_address,
  participantId: participant.id,
  participantSecret: participant.participant_secret,
  meetingId,
});

// Request your camera stream
const stream = await navigator.mediaDevices.getUserMedia({
  audio: true,
  video: true,
});

// Connect audio and video streams
await vpaas.connect({
  get mediaInits() {
    const [audioTrack] = stream?.getAudioTracks() ?? [];
    const [videoTrack] = stream?.getVideoTracks() ?? [];

    return [
      {
        content: "main",
        direction: "sendonly",
        kindOrTrack: audioTrack ?? "audio",
        streams: stream && audioTrack ? [stream] : [],
      },
      {
        content: "main",
        direction: "sendonly",
        kindOrTrack: videoTrack ?? "video",
        streams: stream && videoTrack ? [stream] : [],
      },
      ...sdk.createRecvTransceivers("audio", RECV_AUDIO_COUNT),
      ...sdk.createRecvTransceivers("video", RECV_VIDEO_COUNT),
    ];
  },
});

// Subscribe to the remote streams
vpaasSignals.onRemoteStreams.add((transceiverConfig) => {
  const elemID = `remote-${transceiverConfig.kind}-mid-${transceiverConfig.transceiver.mid}`;
  let el = document.getElementById(elemID);
  if (!el) {
    el = document.createElement(transceiverConfig.kind);
    el.id = elemID;
    document.getElementById("grid").appendChild(el);
  }

  el.srcObject = transceiverConfig.remoteStreams[0];
  el.style = "width: 100%;";
  el.play();
});

// Subscribe to the roster updates
vpaasSignals.onRosterUpdate.add((pids) => {
  for (const id of REQUESTED_STREAMS.keys()) {
    const [producerId, streamId] = decodeId(id);
    if (producerId && streamId && !pids[producerId]?.streams[streamId]) {
      REQUESTED_STREAMS.delete(id);
      vpaas.disconnectStream({
        producer_id: producerId,
        stream_id: streamId,
      });
    }
  }

  for (const [producerId, producer] of Object.entries(pids)) {
    for (const [streamId, stream] of Object.entries(producer.streams)) {
      const id = encodeId(producerId, streamId);
      if (!REQUESTED_STREAMS.has(id)) {
        REQUESTED_STREAMS.add(id);
        vpaas.requestStream({
          producer_id: producerId,
          stream_id: streamId,
        });
      }
    }
  }
});
