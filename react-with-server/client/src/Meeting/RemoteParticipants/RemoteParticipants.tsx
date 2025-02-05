import { Grid } from '@pexip/components'
import { type StreamInfo } from '../../types/StreamInfo'
import { type TransceiverConfig } from '@pexip/peer-connection'
import { Participant } from './Participant'

import './RemoteParticipants.css'

interface RemoteParticipantsProps {
  remoteParticipantsIds: string[]
  streamsInfo: StreamInfo[]
  remoteTransceiversConfig: TransceiverConfig[]
  sinkId: string
}

export const RemoteParticipants = (
  props: RemoteParticipantsProps
): JSX.Element => {
  const { remoteParticipantsIds, streamsInfo, remoteTransceiversConfig } = props

  const getMediaStreams = (
    participantId: string
  ): {
    audioStream: MediaStream | null
    videoStream: MediaStream | null
  } => {
    const audioMid = streamsInfo.find((streamInfo) => {
      return (
        streamInfo.participantId === participantId &&
        streamInfo.type === 'audio'
      )
    })?.mid
    const videoMid = streamsInfo.find((streamInfo) => {
      return (
        streamInfo.participantId === participantId &&
        streamInfo.type === 'video' &&
        streamInfo.semantic === 'main'
      )
    })?.mid

    const audioTransceiverConfig =
      audioMid != null
        ? remoteTransceiversConfig.find(
            (transceiverConfig) =>
              transceiverConfig.transceiver?.mid === audioMid
          )
        : null
    const videoTransceiverConfig =
      videoMid != null
        ? remoteTransceiversConfig.find(
            (transceiverConfig) =>
              transceiverConfig.transceiver?.mid === videoMid
          )
        : null

    const audioStream =
      audioTransceiverConfig?.remoteStreams != null
        ? audioTransceiverConfig.remoteStreams[0]
        : null
    const videoStream =
      videoTransceiverConfig?.remoteStreams != null
        ? videoTransceiverConfig.remoteStreams[0]
        : null

    return {
      audioStream,
      videoStream
    }
  }

  const presentationsInfo = streamsInfo.filter((streamInfo) => {
    return streamInfo.semantic === 'presentation' && streamInfo.mid != null
  })

  const totalStreams = remoteParticipantsIds.length + presentationsInfo.length
  const columns = Math.ceil(Math.sqrt(totalStreams))
  const md = Math.max(Math.round(12 / columns), 1) as any

  const participants = remoteParticipantsIds.map((participantId) => {
    const { audioStream, videoStream } = getMediaStreams(participantId)
    return (
      <Participant
        participantId={participantId}
        md={md}
        audioStream={audioStream}
        videoStream={videoStream}
        key={participantId}
        sinkId={props.sinkId}
        semantic="main"
      />
    )
  })

  const presentations = presentationsInfo.map((streamInfo) => {
    const { participantId, mid } = streamInfo

    const presentationTransceiverConfig =
      mid != null
        ? remoteTransceiversConfig.find((transceiverConfig) => {
            return transceiverConfig.transceiver?.mid === mid
          })
        : null

    const presentationStream =
      presentationTransceiverConfig?.remoteStreams != null
        ? presentationTransceiverConfig.remoteStreams[0]
        : null

    return (
      <Participant
        participantId={participantId}
        md={md}
        audioStream={null}
        videoStream={presentationStream}
        key={`${participantId}-presentation`}
        sinkId={props.sinkId}
        semantic="presentation"
      />
    )
  })

  return (
    <Grid
      className="RemoteParticipants"
      style={{
        display: totalStreams === 1 ? 'block' : 'flex',
        flexGrow: totalStreams < 3 ? '1' : 'initial'
      }}
    >
      {participants}
      {presentations}
    </Grid>
  )
}
