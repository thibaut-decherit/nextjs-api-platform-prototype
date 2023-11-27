declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_BASE_URL?: string;
      NEXT_PUBLIC_API_PATH?: string;
      NEXT_PUBLIC_API_PROXY_BASE_URL?: string;
      NEXT_PUBLIC_ENV?: string;
    }
  }
}
