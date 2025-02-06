import { useState } from 'react'
import { Cell, Icon, IconTypes, Video, Audio } from '@pexip/components'
import { type Cells } from '@pexip/components/dist/types/src/components/foundation/Grid/Grid.types'

interface ParticipantProps {
  participantId: string
  md: Cells | undefined
  audioStream: MediaStream | null
  videoStream: MediaStream | null
  sinkId: string
  semantic: 'main' | 'presentation' | 'misc'
}

export const Participant = (props: ParticipantProps): JSX.Element => {
  const [videoMuted, setVideoMuted] = useState(false)

  const videoTracks = props.videoStream?.getVideoTracks()
  if (videoTracks != null && videoTracks.length > 0) {
    videoTracks[0].onmute = () => {
      setVideoMuted(true)
    }

    videoTracks[0].onunmute = () => {
      setVideoMuted(false)
    }
  }

  return (
    <Cell className="Cell" xs={12} md={props.md}>
      {props.videoStream != null && !videoMuted && (
        <Video
          className="RemoteVideo"
          title={props.participantId}
          srcObject={props.videoStream}
          style={{ objectFit: props.semantic === 'main' ? 'cover' : 'contain' }}
        />
      )}
      {(props.videoStream == null || videoMuted) && (
        <div className="NoStreamContainer">
          <Icon
            className="ParticipantIcon"
            source={IconTypes.IconParticipant}
          />
        </div>
      )}
      {props.audioStream != null && (
        <Audio
          srcObject={props.audioStream}
          autoPlay={true}
          sinkId={props.sinkId}
        />
      )}
    </Cell>
  )
}
