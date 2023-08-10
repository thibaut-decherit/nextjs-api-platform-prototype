export function getApiUrl() {
  let baseUrl;
  if (process?.env?.NEXT_PUBLIC_API_PROXY_BASE_URL) {
    baseUrl = process.env.NEXT_PUBLIC_API_PROXY_BASE_URL;
  } else {
    baseUrl = process?.env?.NEXT_PUBLIC_API_BASE_URL;
  }

  if (baseUrl === undefined) {
    throw new Error(
      'baseUrl should be defined. Define the NEXT_PUBLIC_API_PROXY_BASE_URL env variable if you are in'
      + ' dev env and NEXT_PUBLIC_API_BASE_URL env variable otherwise.'
    );
  }

  return baseUrl + process.env.NEXT_PUBLIC_API_PATH ;
}
