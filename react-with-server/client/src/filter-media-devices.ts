import { LocalStorageKey } from './types/LocalStorageKey'

interface DevicesInfo {
  videoInput: MediaDeviceInfo | undefined
  audioInput: MediaDeviceInfo | undefined
  audioOutput: MediaDeviceInfo | undefined
}

export const filterMediaDevices = async (
  devices: MediaDeviceInfo[]
): Promise<DevicesInfo> => {
  const videoInputId = localStorage.getItem(LocalStorageKey.VideoInputKey)
  const audioInputId = localStorage.getItem(LocalStorageKey.AudioInputKey)
  const audioOutputId = localStorage.getItem(LocalStorageKey.AudioOutputKey)

  let videoInput = devices.find((device) => device.deviceId === videoInputId)
  let audioInput = devices.find((device) => device.deviceId === audioInputId)
  let audioOutput = devices.find((device) => device.deviceId === audioOutputId)

  if (videoInput == null) {
    videoInput = devices.find((device) => device.kind === 'videoinput')
  }

  if (audioInput == null) {
    audioInput = devices.find((device) => device.kind === 'audioinput')
  }

  if (audioOutput == null) {
    audioOutput = devices.find((device) => device.kind === 'audiooutput')
  }

  return {
    videoInput,
    audioInput,
    audioOutput
  }
}
