export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CATS_BASE_URL: string;
      CATS_API_KEY: string;
    }
  }
}
