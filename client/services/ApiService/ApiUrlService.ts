import {NEXT_PUBLIC_API_BASE_URL, NEXT_PUBLIC_API_PATH, NEXT_PUBLIC_API_PROXY_BASE_URL} from "@/config";

export function getApiUrl() {
  let baseUrl;
  if (NEXT_PUBLIC_API_PROXY_BASE_URL) {
    baseUrl = NEXT_PUBLIC_API_PROXY_BASE_URL;
  } else {
    baseUrl = NEXT_PUBLIC_API_BASE_URL;
  }

  if (baseUrl === undefined) {
    throw new Error(
      'baseUrl should be defined. Define the NEXT_PUBLIC_API_PROXY_BASE_URL env variable if you are in'
      + ' dev env and NEXT_PUBLIC_API_BASE_URL env variable otherwise.'
    );
  }

  return baseUrl + NEXT_PUBLIC_API_PATH;
}
