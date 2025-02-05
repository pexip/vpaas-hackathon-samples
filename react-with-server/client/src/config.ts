interface Config {
  server: string
}

const response = await fetch('/config.json')
export const config: Config = await response.json()
