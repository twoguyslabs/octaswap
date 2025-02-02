// ENV types
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BLOB_READ_WRITE_TOKEN: string;
      NEXT_PUBLIC_PROJECT_ID: string;
      NEXT_PUBLIC_ETHEREUM_TOKENLIST_URL: string;
      NEXT_PUBLIC_BSC_TOKENLIST_URL: string;
      NEXT_PUBLIC_OCTA_SPACE_TOKENLIST_URL: string;
      NEXT_PUBLIC_SEPOLIA_TOKENLIST_URL: string;
    }
  }
}

export {};
