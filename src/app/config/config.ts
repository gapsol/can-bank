export interface canbankConfig {
  serverUrl: string,
  apiPath: string,
  country: string,
  language: string,
  isDemo: boolean,
  tOut: number,
  maxUploadSize: number,
}

// TODO: max_file_upload_size
// TODO: max_post_size

 var local: canbankConfig = {
  serverUrl: "http://can-bank",
  apiPath: "/api-can-bank",
  country: "SK",
  language: "en",
  isDemo: false,
  tOut: 741,
  maxUploadSize: 10
}

var server: canbankConfig = {
  serverUrl: "https://www.can-bank.com",
  apiPath: "/api-can-bank",
  country: "SK",
  language: "en",
  isDemo: false,
  tOut: 741,
  maxUploadSize: 10
}

export var config: canbankConfig = local;
