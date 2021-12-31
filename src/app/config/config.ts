export interface canbankConfig {
  serverUrl: string,
  apiPath: string,
  language: string,
  isDemo: boolean,
}

// setup localhost and server settings
var localConfig: canbankConfig = {
  serverUrl: "http://can-bank",
  apiPath: "/api-can-bank",
  language: "en",
  isDemo: false
}

var serverConfig: canbankConfig = {
  serverUrl: "https://www.can-bank.com",
  apiPath: "/api-can-bank",
  language: "en",
  isDemo: false
}

export var config: canbankConfig = localConfig;
