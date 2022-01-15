export interface canbankConfig {
  serverUrl: string,
  apiPath: string,
  language: string,
  isDemo: boolean,
  tOut: number,
}

// setup localhost and server settings
var localConfig: canbankConfig = {
  serverUrl: "http://can-bank",
  apiPath: "/api-can-bank",
  language: "en",
  isDemo: false,
  tOut: 741,
}

var serverConfig: canbankConfig = {
  serverUrl: "https://www.can-bank.com",
  apiPath: "/api-can-bank",
  language: "en",
  isDemo: false,
  tOut: 741,
}

export var config: canbankConfig = localConfig;
