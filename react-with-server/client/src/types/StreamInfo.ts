import { type Layer } from '@pexip/vpaas-api'
import { type RTPStreamId } from './RTPStreamId'

export interface StreamInfo {
  streamId: string
  type: 'audio' | 'video'
  participantId: string
  layers: Layer[]
  semantic: 'main' | 'presentation' | 'misc'
  mid?: string
  rid?: RTPStreamId
}
