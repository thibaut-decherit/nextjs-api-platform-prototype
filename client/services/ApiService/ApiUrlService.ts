export function getApiUrl() {
  let baseUrl;
  if ((process.env.NEXT_PUBLIC_API_PROXY_BASE_URL as string)) {
    baseUrl = process.env.NEXT_PUBLIC_API_PROXY_BASE_URL as string;
  } else {
    baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL as string;
  }

  return baseUrl + (process.env.NEXT_PUBLIC_API_PATH as string);
}
